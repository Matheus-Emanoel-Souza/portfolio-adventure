import { useMemo, useRef, useState, type KeyboardEvent } from 'react'
import type { Dictionary } from '@/i18n/types'
import type { CareerEvent } from '@/types'
import { buildCareerTimeline } from './careerTimeline.utils'
import styles from './CareerTimeline.module.css'

interface CareerTimelineProps {
  events: CareerEvent[]
  t: Dictionary
  /** Injetável só pra teste determinístico — produção usa o relógio real. */
  now?: Date
}

const TRACK_MIN_WIDTH = 560
const SPACING_PER_POINT = 150
const EDGE_PADDING = 48

function compareEducationAsc(a: CareerEvent, b: CareerEvent): number {
  return a.sortDate.localeCompare(b.sortDate)
}

/**
 * Trajetória profissional horizontal — versão simplificada e rápida do
 * Career Graph pro Quick Mode: só a branch `career`, mais antigo pra mais
 * recente (esquerda pra direita), reaproveitando os mesmos dados e o mesmo
 * mecanismo de marcador "atual" (`buildCareerTimeline`/`withTimelineMarkers`)
 * — não é o Career Graph de novo, é a mesma fonte com outra leitura.
 */
export function CareerTimeline({ events, t, now }: CareerTimelineProps) {
  const points = useMemo(() => buildCareerTimeline(events, now), [events, now])
  const educationEvents = useMemo(
    () => events.filter((event) => event.branch === 'education').sort(compareEducationAsc),
    [events],
  )

  const defaultId = points.find((point) => point.isHead)?.id ?? points[points.length - 1]?.id
  const [selectedId, setSelectedId] = useState<string | undefined>(defaultId)
  const selectedPoint = points.find((point) => point.id === selectedId)

  const pointRefs = useRef<Array<HTMLButtonElement | null>>([])

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return
    event.preventDefault()
    const nextIndex = index + (event.key === 'ArrowRight' ? 1 : -1)
    pointRefs.current[nextIndex]?.focus()
  }

  if (points.length === 0) return null

  const trackWidth = Math.max(TRACK_MIN_WIDTH, points.length * SPACING_PER_POINT)
  const usableWidth = trackWidth - EDGE_PADDING * 2

  return (
    <div className={styles.wrap}>
      <div className={styles.scroller} role="group" aria-label={t.quickMode.careerAriaLabel}>
        <div className={styles.track} style={{ width: trackWidth }}>
          <div
            className={styles.line}
            aria-hidden="true"
            style={{ left: EDGE_PADDING, width: usableWidth }}
          />

          {points.map((point, index) => {
            const left = EDGE_PADDING + point.position * usableWidth
            const label = point.isHead
              ? t.careerGraph.headBadge
              : (point.event.organization ?? point.event.title)

            return (
              <button
                key={point.id}
                ref={(node) => {
                  pointRefs.current[index] = node
                }}
                type="button"
                style={{ left }}
                className={[
                  styles.point,
                  point.isHead && styles.pointHead,
                  point.id === selectedId && styles.pointSelected,
                ]
                  .filter(Boolean)
                  .join(' ')}
                aria-pressed={point.id === selectedId}
                aria-label={`${t.quickMode.careerSelectAria}: ${label}${
                  !point.isHead && point.event.organization ? `, ${point.event.organization}` : ''
                }`}
                onClick={() => setSelectedId(point.id)}
                onKeyDown={(event) => handleKeyDown(event, index)}
              >
                {/* Sempre renderizado (só fica invisível quando não é o primeiro do ano) —
                    stack de altura idêntica em todo ponto, senão o dot desalinha da linha. */}
                <span
                  className={[styles.pointYear, !point.showYear && styles.pointYearHidden]
                    .filter(Boolean)
                    .join(' ')}
                >
                  {point.event.sortDate.slice(0, 4)}
                </span>
                <span className={styles.pointDot} aria-hidden="true" />
                <span className={styles.pointLabel}>{label}</span>
              </button>
            )
          })}
        </div>
      </div>

      <p className={styles.dragHint} aria-hidden="true">
        {t.quickMode.dragHint}
      </p>

      {selectedPoint && (
        <div className={styles.detail} aria-live="polite">
          <p className={styles.detailCommit}>
            <code>
              {t.commitType[selectedPoint.event.commitType]}({selectedPoint.event.branch}):
            </code>{' '}
            {selectedPoint.event.title}
            {selectedPoint.isHead && <span className={styles.detailHead}>{t.careerGraph.headBadge}</span>}
          </p>
          {selectedPoint.event.organization && (
            <p className={styles.detailOrg}>{selectedPoint.event.organization}</p>
          )}
          <p className={styles.detailPeriod}>{selectedPoint.event.period}</p>
          <p>{selectedPoint.event.description}</p>
        </div>
      )}

      {educationEvents.length > 0 && (
        <div className={styles.education}>
          <span className={styles.educationHeading}>{t.quickMode.careerEducationHeading}</span>
          <ul className={styles.educationList}>
            {educationEvents.map((event) => (
              <li key={event.id}>
                <strong>{event.title}</strong>
                {event.organization && ` — ${event.organization}`}
                <span className={styles.educationPeriod}>{event.period}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
