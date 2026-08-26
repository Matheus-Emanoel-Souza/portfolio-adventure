import type { Dictionary } from '@/i18n/types'
import { BRANCH_META, BRANCH_ORDER } from './careerGraph.config'
import type { BranchFilter } from './careerGraph.types'
import styles from './CareerGraph.module.css'

interface CareerGraphFiltersProps {
  t: Dictionary
  filter: BranchFilter
  onChange: (filter: BranchFilter) => void
}

/**
 * Alterna destaque entre branches (dimming), não remove do DOM — mantém o
 * eixo temporal compartilhado visível mesmo com um filtro ativo. Opções
 * geradas a partir de BRANCH_ORDER — uma branch nova ganha filtro sozinha.
 */
export function CareerGraphFilters({ t, filter, onChange }: CareerGraphFiltersProps) {
  const options: { value: BranchFilter; label: string }[] = [
    { value: 'all', label: t.careerGraph.filterAll },
    ...BRANCH_ORDER.map((branch) => ({
      value: branch,
      label: t.careerGraph[BRANCH_META[branch].filterLabelKey],
    })),
  ]

  return (
    <div className={styles.filters} role="group" aria-label={t.careerGraph.filterGroupAria}>
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          aria-pressed={filter === option.value}
          className={[styles.filterButton, filter === option.value && styles.filterButtonActive]
            .filter(Boolean)
            .join(' ')}
          onClick={() => onChange(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  )
}
