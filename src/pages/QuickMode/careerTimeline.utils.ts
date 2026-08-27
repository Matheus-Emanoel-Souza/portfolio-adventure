import type { LayoutedCareerEvent } from '@/features/career-graph/careerGraph.types'
import {
  findHeadEvent,
  layoutCareerEvents,
  withTimelineMarkers,
} from '@/features/career-graph/careerGraph.utils'
import type { CareerEvent } from '@/types'

/** Um ponto na timeline horizontal — evento real ou marcador "atual" (ver `withTimelineMarkers`). */
export interface TimelinePoint {
  id: string
  event: LayoutedCareerEvent
  /** É o topo da branch (commit real mais recente ou marcador "atual") — vira o rótulo HEAD. */
  isHead: boolean
  /** 0 (mais antigo) a 1 (mais recente) — posição proporcional ao tempo real decorrido. */
  position: number
  /** Só na primeira ocorrência de cada ano, esquerda pra direita — evita repetir o mesmo ano. */
  showYear: boolean
}

function monthIndex(sortDate: string): number {
  const [year, month] = sortDate.split('-').map(Number)
  return year * 12 + (month - 1)
}

/**
 * Trajetória profissional (`branch: 'career'`) do mais antigo pro mais
 * recente, esquerda pra direita — o inverso do ladder vertical do Career
 * Graph. Reusa a mesma fonte de dados e o mesmo mecanismo de marcador
 * "atual" (`withTimelineMarkers`): se o cargo em andamento tiver `sortDate`
 * no passado, a timeline ganha um ponto extra no ano vigente, rotulado HEAD
 * — sem inventar coordenadas, só reaproveitando o que o Career Graph já
 * calcula pra branch `career`.
 */
export function buildCareerTimeline(events: CareerEvent[], now: Date = new Date()): TimelinePoint[] {
  const withMarkers = withTimelineMarkers(layoutCareerEvents(events), now)
  const careerOnly = withMarkers
    .filter((event) => event.branch === 'career')
    .sort((a, b) => monthIndex(a.sortDate) - monthIndex(b.sortDate))

  if (careerOnly.length === 0) return []

  const headEvent = findHeadEvent(events)
  // Marcador "atual" sempre representa o HEAD quando existe; sem marcador
  // (nenhum cargo em andamento ainda ficou pra trás do ano vigente), o
  // último commit real da branch é que assume o rótulo.
  const headId =
    careerOnly.find((event) => event.marker === 'current')?.id ??
    careerOnly.find((event) => !event.marker && event.id === headEvent?.id)?.id ??
    careerOnly[careerOnly.length - 1]?.id

  const months = careerOnly.map((event) => monthIndex(event.sortDate))
  const min = Math.min(...months)
  const max = Math.max(...months)
  const span = max - min

  let lastYearShown: number | null = null

  return careerOnly.map((event, index) => {
    const year = Number(event.sortDate.slice(0, 4))
    const showYear = year !== lastYearShown
    lastYearShown = year

    return {
      id: event.id,
      event,
      isHead: event.id === headId,
      position:
        span === 0 ? (careerOnly.length === 1 ? 0.5 : index / (careerOnly.length - 1)) : (months[index] - min) / span,
      showYear,
    }
  })
}
