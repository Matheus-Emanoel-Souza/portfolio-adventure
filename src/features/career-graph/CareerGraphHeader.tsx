import type { Dictionary } from '@/i18n/types'
import { profile } from '@/data/profile'
import { CareerGraphLegend } from './CareerGraphLegend'
import { BRANCH_ORDER } from './careerGraph.config'
import styles from './CareerGraph.module.css'

interface CareerGraphHeaderProps {
  t: Dictionary
  headTitle?: string
}

/** Cabeçalho "repositório" da página — identidade de dev tool, não pixel art. */
export function CareerGraphHeader({ t, headTitle }: CareerGraphHeaderProps) {
  return (
    <header className={styles.header}>
      <p className={styles.repoPath}>{profile.name.split(' ')[0].toLowerCase()}/career</p>
      <h2 className={styles.heading}>{t.careerGraph.heading}</h2>
      <p className={styles.subtitle}>{t.careerGraph.subtitle}</p>

      <div className={styles.metaRow}>
        <span className={styles.branchCount}>
          {BRANCH_ORDER.length} {t.careerGraph.branchesLabel}
        </span>
        <CareerGraphLegend t={t} />
      </div>

      {headTitle && (
        <p className={styles.headLine}>
          <span className={styles.badgeHead}>{t.careerGraph.headBadge}</span>
          <code>→ career</code>
          <span className={styles.headTitle}>{headTitle}</span>
        </p>
      )}
    </header>
  )
}
