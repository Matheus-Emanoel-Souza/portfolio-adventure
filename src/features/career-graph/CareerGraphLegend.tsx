import type { Dictionary } from '@/i18n/types'
import { BRANCH_META, BRANCH_ORDER } from './careerGraph.config'
import styles from './CareerGraph.module.css'

/** Legenda das branches — a única "chave" que explica as cores do graph. */
export function CareerGraphLegend({ t }: { t: Dictionary }) {
  return (
    <ul className={styles.legend}>
      {BRANCH_ORDER.map((branch) => (
        <li key={branch} className={styles.legendItem}>
          <span
            className={styles.legendDot}
            style={{ background: BRANCH_META[branch].colorVar }}
            aria-hidden="true"
          />
          {/* TODO: uma branch nova precisa de um rótulo aqui — t.careerGraph só cobre career/education hoje. */}
          {branch === 'career' ? t.careerGraph.branchCareer : t.careerGraph.branchEducation}
        </li>
      ))}
    </ul>
  )
}
