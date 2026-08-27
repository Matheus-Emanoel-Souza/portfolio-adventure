import type { CareerBranch, CareerEvent } from '@/types'
import type { BranchLane, LayoutedCareerEvent } from './careerGraph.types'

const HASH_LENGTH = 7

/**
 * Hash curto determinístico (FNV-1a) a partir de um id estável — nunca
 * `Math.random()`. O mesmo evento sempre produz o mesmo hash, em qualquer
 * carregamento.
 */
export function shortHash(id: string): string {
  let hash = 0x811c9dc5
  for (let i = 0; i < id.length; i++) {
    hash ^= id.charCodeAt(i)
    hash = Math.imul(hash, 0x01000193)
  }
  return (hash >>> 0).toString(16).padStart(HASH_LENGTH, '0').slice(0, HASH_LENGTH)
}

function monthIndex(sortDate: string): number {
  const [year, month] = sortDate.split('-').map(Number)
  return year * 12 + (month - 1)
}

/** Mais recente primeiro; desempate estável por id pra ordem determinística. */
function compareEventsDesc(a: CareerEvent, b: CareerEvent): number {
  const diff = monthIndex(b.sortDate) - monthIndex(a.sortDate)
  return diff !== 0 ? diff : a.id.localeCompare(b.id)
}

/**
 * Posiciona todos os eventos (de todas as branches) num único ladder
 * vertical ordenado por data — é isso que faz `career` e `education`
 * compartilharem o mesmo eixo temporal: dois eventos próximos no tempo caem
 * em linhas próximas, não em timelines independentes.
 */
export function layoutCareerEvents(events: CareerEvent[]): LayoutedCareerEvent[] {
  return [...events]
    .sort(compareEventsDesc)
    .map((event, row) => ({ ...event, row, hash: shortHash(event.id) }))
}

/** Faixa vertical (linha do primeiro ao último commit) de cada branch presente nos dados. */
export function buildBranchLanes(layouted: LayoutedCareerEvent[]): BranchLane[] {
  const rowsByBranch = new Map<CareerBranch, number[]>()
  for (const event of layouted) {
    const rows = rowsByBranch.get(event.branch) ?? []
    rows.push(event.row)
    rowsByBranch.set(event.branch, rows)
  }
  return Array.from(rowsByBranch.entries()).map(([branch, rows]) => ({
    branch,
    topRow: Math.min(...rows),
    bottomRow: Math.max(...rows),
  }))
}

/**
 * Linha → ano, só na primeira linha em que cada ano aparece (topo pra
 * baixo) — evita repetir o mesmo ano em cada commit e polui menos que
 * mostrar meses.
 */
export function buildYearGutter(layouted: LayoutedCareerEvent[]): Map<number, number> {
  const gutter = new Map<number, number>()
  let lastYear: number | null = null
  for (const event of layouted) {
    const year = Number(event.sortDate.slice(0, 4))
    if (year !== lastYear) {
      gutter.set(event.row, year)
      lastYear = year
    }
  }
  return gutter
}

/** Evento "HEAD" — commit atual da branch career (o cargo em andamento). */
export function findHeadEvent(events: CareerEvent[]): CareerEvent | undefined {
  return events.find((event) => event.branch === 'career' && event.current)
}

function yearOf(sortDate: string): number {
  return Number(sortDate.slice(0, 4))
}

function pad2(n: number): string {
  return String(n).padStart(2, '0')
}

/** id real por trás de uma linha do ladder — pra marcador, o do `CareerEvent` original; pra commit real, o próprio. */
export function resolveRootEventId(event: LayoutedCareerEvent): string {
  return event.sourceEventId ?? event.id
}

/**
 * Acrescenta marcadores de extremidade ao ladder já layoutado — puramente
 * aditivo, nunca desloca ou remove um commit real. Cobre dois casos
 * genéricos (não específicos de nenhum evento):
 *
 * - `current: true` cujo ano de `sortDate` já ficou pra trás do ano vigente:
 *   ganha um marcador `'current'` no ano vigente, pra branch chegar
 *   visualmente até hoje mesmo o commit tendo sido registrado no início da
 *   experiência (ex.: Oncovit, commit em 2025, mas em andamento em 2026).
 * - `startSortDate` com ano diferente do de `sortDate`: ganha um marcador
 *   `'start'` nesse ano, pro início real ficar visível mesmo o commit
 *   estando ordenado por outro marco (ex.: curso técnico, commit no ano de
 *   conclusão, início real alguns anos antes).
 *
 * Reordena e renumera as `row` do conjunto combinado (reais + marcadores)
 * pra manter um único eixo temporal consistente — é esse resultado que
 * alimenta `buildBranchLanes`/`buildYearGutter` no Career Graph. Não afeta
 * `layoutCareerEvents`: quem consome esse (Quick Mode) continua vendo só
 * commits reais, um por evento.
 */
export function withTimelineMarkers(
  layouted: LayoutedCareerEvent[],
  now: Date = new Date(),
): LayoutedCareerEvent[] {
  const nowYear = now.getFullYear()
  const nowSortDate = `${nowYear}-${pad2(now.getMonth() + 1)}`

  interface Entry {
    id: string
    sortDate: string
    base: LayoutedCareerEvent
    marker?: 'start' | 'current'
    sourceEventId?: string
  }

  const entries: Entry[] = layouted.map((event) => ({ id: event.id, sortDate: event.sortDate, base: event }))

  for (const event of layouted) {
    if (event.current && yearOf(event.sortDate) < nowYear) {
      entries.push({
        id: `${event.id}::current`,
        sortDate: nowSortDate,
        base: event,
        marker: 'current',
        sourceEventId: event.id,
      })
    }
    if (event.startSortDate && yearOf(event.startSortDate) < yearOf(event.sortDate)) {
      entries.push({
        id: `${event.id}::start`,
        sortDate: event.startSortDate,
        base: event,
        marker: 'start',
        sourceEventId: event.id,
      })
    }
  }

  return entries
    .sort((a, b) => {
      const diff = monthIndex(b.sortDate) - monthIndex(a.sortDate)
      return diff !== 0 ? diff : a.id.localeCompare(b.id)
    })
    .map((entry, row) => ({
      ...entry.base,
      id: entry.id,
      sortDate: entry.sortDate,
      row,
      marker: entry.marker,
      sourceEventId: entry.sourceEventId,
    }))
}
