import { EmptyState } from '@/components/EmptyState/EmptyState'
import { QuestCard } from '@/components/QuestCard/QuestCard'
import { projects } from '@/data/projects'
import { useMarkSectionVisited } from '@/features/game-progress/useMarkSectionVisited'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { useLanguage } from '@/i18n/useLanguage'
import styles from './Projects.module.css'

export default function Projects() {
  useDocumentTitle('Quests')
  useMarkSectionVisited('projects')
  const { t } = useLanguage()

  return (
    <div>
      <h2>{t.projects.heading}</h2>
      <p>{t.projects.subtitle}</p>

      {projects.length > 0 ? (
        <div className={styles.grid}>
          {projects.map((project) => (
            <QuestCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <EmptyState title={t.projects.emptyTitle} description={t.projects.emptyDescription} />
      )}
    </div>
  )
}
