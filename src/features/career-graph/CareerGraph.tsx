import { useMemo, useRef, useState, type KeyboardEvent } from 'react'
import type { CareerEvent } from '@/types'
import { useLanguage } from '@/i18n/useLanguage'
import { CareerCommitCard } from './CareerCommitCard'
import { CareerGraphFilters } from './CareerGraphFilters'
import { CareerGraphHeader } from './CareerGraphHeader'
import { CareerGraphNode } from './CareerGraphNode'
import { CareerGraphPaths } from './CareerGraphPaths'
import { CareerGraphRow } from './CareerGraphRow'
import { BRANCH_META, BRANCH_ORDER, GRAPH_LAYOUT } from './careerGraph.config'
import type { BranchFilter } from './careerGraph.types'
import {
  buildBranchLanes,
  buildYearGutter,
  findHeadEvent,
  layoutCareerEvents,
  resolveRootEventId,
  withTimelineMarkers,
} from './careerGraph.utils'
import styles from './CareerGraph.module.css'

interface CareerGraphProps {
  events: CareerEvent[]
  /** Injetável só pra teste determinístico — produção usa o relógio real. */
  now?: Date
}

/** Career Graph — a trajetória como histórico Git: branches, commits, HEAD. */
export function CareerGraph({ events, now }: CareerGraphProps) {
  const { t } = useLanguage()
  const [filter, setFilter] = useState<BranchFilter>('all')

  const baseLayouted = useMemo(() => layoutCareerEvents(events), [events])
  // Marcadores de início/atual são só desse graph — Quick Mode (que também
  // usa `layoutCareerEvents`) continua vendo um commit por evento.
  const layouted = useMemo(() => withTimelineMarkers(baseLayouted, now), [baseLayouted, now])
  const lanes = useMemo(() => buildBranchLanes(layouted), [layouted])
  const yearGutter = useMemo(() => buildYearGutter(layouted), [layouted])
  const headEvent = useMemo(() => findHeadEvent(events), [events])

  const [selectedId, setSelectedId] = useState<string | undefined>(headEvent?.id ?? events[0]?.id)
  const selectedEvent = layouted.find((event) => event.id === selectedId)

  const rowRefs = useRef<Array<HTMLButtonElement | null>>([])

  /** ArrowUp/ArrowDown movem o foco entre commits, além do Tab padrão. */
  function handleRowKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') return
    event.preventDefault()
    const nextIndex = index + (event.key === 'ArrowDown' ? 1 : -1)
    rowRefs.current[nextIndex]?.focus()
  }

  const { rowHeight, laneWidth, gutterWidth } = GRAPH_LAYOUT
  const trackWidth = gutterWidth + laneWidth * BRANCH_ORDER.length
  const trackHeight = rowHeight * layouted.length

  return (
    <div className={styles.page}>
      <CareerGraphHeader t={t} headTitle={headEvent?.title} />
      <CareerGraphFilters t={t} filter={filter} onChange={setFilter} />

      <div className={styles.layout}>
        <div className={styles.graph}>
          <div className={styles.track} style={{ width: trackWidth, height: trackHeight }}>
            <CareerGraphPaths lanes={lanes} filter={filter} />

            {Array.from(yearGutter.entries()).map(([row, year]) => (
              <span
                key={year}
                className={styles.gutterYear}
                style={{ top: rowHeight * row + rowHeight / 2, width: gutterWidth }}
              >
                {year}
              </span>
            ))}

            {layouted.map((event) => (
              <CareerGraphNode
                key={event.id}
                event={event}
                laneIndex={BRANCH_ORDER.indexOf(event.branch)}
                colorVar={BRANCH_META[event.branch].colorVar}
                selected={event.id === selectedId}
                dimmed={filter !== 'all' && filter !== event.branch}
                isHead={!event.marker && resolveRootEventId(event) === headEvent?.id}
                onSelect={setSelectedId}
              />
            ))}
          </div>

          <ol className={styles.list} aria-label={t.careerGraph.heading}>
            {layouted.map((event, index) => (
              <CareerGraphRow
                key={event.id}
                ref={(node) => {
                  rowRefs.current[index] = node
                }}
                event={event}
                t={t}
                selected={event.id === selectedId}
                dimmed={filter !== 'all' && filter !== event.branch}
                isHead={!event.marker && resolveRootEventId(event) === headEvent?.id}
                onSelect={setSelectedId}
                onKeyDown={(keyEvent) => handleRowKeyDown(keyEvent, index)}
              />
            ))}
          </ol>
        </div>

        <CareerCommitCard
          event={selectedEvent}
          t={t}
          isHead={selectedEvent ? resolveRootEventId(selectedEvent) === headEvent?.id : false}
        />
      </div>
    </div>
  )
}
