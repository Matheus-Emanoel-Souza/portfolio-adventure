import type { Dictionary } from '@/i18n/types'
import type { BranchFilter } from './careerGraph.types'
import styles from './CareerGraph.module.css'

interface CareerGraphFiltersProps {
  t: Dictionary
  filter: BranchFilter
  onChange: (filter: BranchFilter) => void
}

/**
 * Alterna destaque entre branches (dimming), não remove do DOM — mantém o
 * eixo temporal compartilhado visível mesmo com um filtro ativo.
 */
export function CareerGraphFilters({ t, filter, onChange }: CareerGraphFiltersProps) {
  const options: { value: BranchFilter; label: string }[] = [
    { value: 'all', label: t.careerGraph.filterAll },
    { value: 'career', label: t.careerGraph.filterCareer },
    { value: 'education', label: t.careerGraph.filterEducation },
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
