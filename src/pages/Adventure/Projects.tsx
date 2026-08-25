import { EmptyState } from '@/components/EmptyState/EmptyState'
import { QuestCard } from '@/components/QuestCard/QuestCard'
import { projects } from '@/data/projects'
import { useMarkSectionVisited } from '@/features/game-progress/useMarkSectionVisited'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import styles from './Projects.module.css'

export default function Projects() {
  useDocumentTitle('Quests')
  useMarkSectionVisited('projects')

  return (
    <div>
      <h2>Quests</h2>
      <p>Projetos, tratados como missões.</p>

      {projects.length > 0 ? (
        <div className={styles.grid}>
          {projects.map((project) => (
            <QuestCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <EmptyState
          title="Nenhuma quest cadastrada ainda"
          description="Os projetos aparecem aqui assim que forem adicionados em src/data/projects.ts."
        />
      )}
    </div>
  )
}
