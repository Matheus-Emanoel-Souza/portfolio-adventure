import { forwardRef, type CSSProperties, type KeyboardEvent } from 'react'
import type { Dictionary } from '@/i18n/types'
import { BRANCH_META } from './careerGraph.config'
import type { LayoutedCareerEvent } from './careerGraph.types'
import styles from './CareerGraph.module.css'

interface CareerGraphRowProps {
  event: LayoutedCareerEvent
  t: Dictionary
  selected: boolean
  dimmed: boolean
  isHead: boolean
  onSelect: (id: string) => void
  onKeyDown: (event: KeyboardEvent<HTMLButtonElement>) => void
}

/**
 * Linha de conteúdo do commit — é aqui, e não no SVG, que título/organização/
 * período existem como texto real de DOM (semântica + SEO) e como o
 * `<button>` acessível que seleciona o commit (Tab, Enter, Space).
 */
export const CareerGraphRow = forwardRef<HTMLButtonElement, CareerGraphRowProps>(
  function CareerGraphRow({ event, t, selected, dimmed, isHead, onSelect, onKeyDown }, ref) {
    const isMarker = Boolean(event.marker)
    const markerLabel = event.marker === 'current' ? t.careerGraph.currentBadge : t.careerGraph.markerStartLabel
    const ariaLabel = [
      isMarker ? markerLabel : null,
      `${t.careerGraph.selectedAria}: ${event.title}${event.organization ? `, ${event.organization}` : ''}`,
    ]
      .filter(Boolean)
      .join(' — ')

    return (
      <li className={styles.row}>
        <button
          ref={ref}
          type="button"
          aria-pressed={selected}
          aria-label={ariaLabel}
          className={[styles.rowButton, selected && styles.rowButtonSelected, dimmed && styles.rowDimmed]
            .filter(Boolean)
            .join(' ')}
          style={{ '--row-branch-color': BRANCH_META[event.branch].colorVar } as CSSProperties}
          onClick={() => onSelect(event.id)}
          onKeyDown={onKeyDown}
        >
          <span className={styles.rowSummary}>
            {isMarker ? (
              <span className={event.marker === 'current' ? styles.badgeCurrent : styles.badgeStart}>
                {markerLabel}
              </span>
            ) : (
              <code className={styles.rowCommitType}>
                {t.commitType[event.commitType]}({BRANCH_META[event.branch].branch}):
              </code>
            )}
            <span className={styles.rowTitle}>{event.title}</span>
            {isHead && <span className={styles.badgeHead}>{t.careerGraph.headBadge}</span>}
            {!isHead && !isMarker && event.current && (
              <span className={styles.badgeCurrent}>{t.careerGraph.currentBadge}</span>
            )}
          </span>
          <span className={styles.rowMeta}>
            {event.organization && <span>{event.organization}</span>}
            <span className={styles.rowPeriod}>{event.period}</span>
          </span>
        </button>
      </li>
    )
  },
)
