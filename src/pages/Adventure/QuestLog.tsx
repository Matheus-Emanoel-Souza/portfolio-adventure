import { EmptyState } from '@/components/EmptyState/EmptyState'
import { StatusTag } from '@/components/StatusTag/StatusTag'
import { timeline } from '@/data/timeline'
import { useMarkSectionVisited } from '@/features/game-progress/useMarkSectionVisited'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { TIMELINE_TYPE_LABELS } from '@/types'
import styles from './QuestLog.module.css'

export default function QuestLog() {
  useDocumentTitle('Quest Log')
  useMarkSectionVisited('quest-log')

  return (
    <div>
      <h2>Quest Log</h2>
      <p>Trajetória acadêmica, profissional e marcos relevantes.</p>

      {timeline.length > 0 ? (
        <ol className={styles.timeline}>
          {timeline.map((entry) => (
            <li key={entry.id} className={styles.entry}>
              <span className={styles.period}>{entry.period}</span>
              <StatusTag tone="planned">{TIMELINE_TYPE_LABELS[entry.type]}</StatusTag>
              <h3 className={styles.title}>{entry.title}</h3>
              {entry.organization && <p className={styles.organization}>{entry.organization}</p>}
              <p>{entry.description}</p>
            </li>
          ))}
        </ol>
      ) : (
        <EmptyState
          title="Quest Log vazio por enquanto"
          description="A trajetória aparece aqui assim que for adicionada em src/data/timeline.ts."
        />
      )}
    </div>
  )
}
