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
