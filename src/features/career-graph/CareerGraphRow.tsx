import { forwardRef, type KeyboardEvent } from 'react'
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
    return (
      <li className={styles.row}>
        <button
          ref={ref}
          type="button"
          aria-pressed={selected}
          aria-label={`${t.careerGraph.selectedAria}: ${event.title}${event.organization ? `, ${event.organization}` : ''}`}
          className={[styles.rowButton, selected && styles.rowButtonSelected, dimmed && styles.rowDimmed]
            .filter(Boolean)
            .join(' ')}
          onClick={() => onSelect(event.id)}
          onKeyDown={onKeyDown}
        >
          <span className={styles.rowSummary}>
            <code className={styles.rowCommitType}>
              {t.commitType[event.commitType]}({BRANCH_META[event.branch].branch}):
            </code>
            <span className={styles.rowTitle}>{event.title}</span>
            {isHead && <span className={styles.badgeHead}>{t.careerGraph.headBadge}</span>}
            {!isHead && event.current && (
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
