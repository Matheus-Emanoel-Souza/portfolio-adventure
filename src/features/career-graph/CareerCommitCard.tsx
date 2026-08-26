import { motion, AnimatePresence } from 'framer-motion'
import type { Dictionary } from '@/i18n/types'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { BRANCH_META } from './careerGraph.config'
import type { LayoutedCareerEvent } from './careerGraph.types'
import styles from './CareerGraph.module.css'

interface CareerCommitCardProps {
  event: LayoutedCareerEvent | undefined
  t: Dictionary
  isHead: boolean
}

/** Painel de detalhes do commit selecionado — sticky no desktop, empilhado no mobile. */
export function CareerCommitCard({ event, t, isHead }: CareerCommitCardProps) {
  const reducedMotion = useReducedMotion()

  return (
    <aside className={styles.card} aria-live="polite">
      <AnimatePresence mode="wait">
        {event ? (
          <motion.div
            key={event.id}
            initial={reducedMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            <p className={styles.cardHash}>
              commit <span>{event.hash}</span>
              {isHead && <span className={styles.badgeHead}>{t.careerGraph.headBadge}</span>}
              {!isHead && event.current && (
                <span className={styles.badgeCurrent}>{t.careerGraph.currentBadge}</span>
              )}
            </p>

            <p className={styles.cardCommitLine}>
              <code>
                {t.commitType[event.commitType]}({event.branch}):
              </code>{' '}
              {event.title}
            </p>

            {event.organization && <p className={styles.cardOrg}>{event.organization}</p>}

            <dl className={styles.cardFields}>
              <div>
                <dt>{t.careerGraph.branchFieldLabel}</dt>
                <dd>
                  <span
                    className={styles.legendDot}
                    style={{ background: BRANCH_META[event.branch].colorVar }}
                    aria-hidden="true"
                  />
                  {event.branch === 'career' ? t.careerGraph.branchCareer : t.careerGraph.branchEducation}
                </dd>
              </div>
              <div>
                <dt>{t.careerGraph.periodFieldLabel}</dt>
                <dd>{event.period}</dd>
              </div>
            </dl>

            <div className={styles.cardSection}>
              <p className={styles.cardSectionLabel}>{t.careerGraph.descriptionFieldLabel}</p>
              <p>{event.description}</p>
            </div>

            {event.technologies && event.technologies.length > 0 && (
              <div className={styles.cardSection}>
                <p className={styles.cardSectionLabel}>{t.careerGraph.technologiesFieldLabel}</p>
                <ul className={styles.techList}>
                  {event.technologies.map((tech) => (
                    <li key={tech}>{tech}</li>
                  ))}
                </ul>
              </div>
            )}
          </motion.div>
        ) : (
          <p className={styles.cardHint}>{t.careerGraph.selectHint}</p>
        )}
      </AnimatePresence>
    </aside>
  )
}
