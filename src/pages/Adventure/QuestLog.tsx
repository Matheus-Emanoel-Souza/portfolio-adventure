import { EmptyState } from '@/components/EmptyState/EmptyState'
import { StatusTag } from '@/components/StatusTag/StatusTag'
import { timeline } from '@/data/timeline'
import { useMarkSectionVisited } from '@/features/game-progress/useMarkSectionVisited'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { useLanguage } from '@/i18n/useLanguage'
import styles from './QuestLog.module.css'

export default function QuestLog() {
  useDocumentTitle('Quest Log')
  useMarkSectionVisited('quest-log')
  const { t } = useLanguage()

  return (
    <div>
      <h2>{t.questLog.heading}</h2>
      <p>{t.questLog.subtitle}</p>

      {timeline.length > 0 ? (
        <ol className={styles.timeline}>
          {timeline.map((entry) => (
            <li key={entry.id} className={styles.entry}>
              <span className={styles.period}>{entry.period}</span>
              <StatusTag tone="planned">{t.timelineType[entry.type]}</StatusTag>
              <h3 className={styles.title}>{entry.title}</h3>
              {entry.organization && <p className={styles.organization}>{entry.organization}</p>}
              <p>{entry.description}</p>
            </li>
          ))}
        </ol>
      ) : (
        <EmptyState title={t.questLog.emptyTitle} description={t.questLog.emptyDescription} />
      )}
    </div>
  )
}
