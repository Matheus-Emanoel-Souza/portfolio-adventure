import { PixelButton } from '@/components/PixelButton/PixelButton'
import { PixelPanel } from '@/components/PixelPanel/PixelPanel'
import { StatusTag } from '@/components/StatusTag/StatusTag'
import { getSkillsByIds } from '@/data/skills'
import { PROJECT_STATUS_LABELS, type Project } from '@/types'
import styles from './QuestCard.module.css'

const STATUS_TONE = {
  completed: 'completed',
  'in-progress': 'inProgress',
  planned: 'planned',
} as const

interface QuestCardProps {
  project: Project
  /** Modo compacto pro Quick Mode: sem screenshots, problema/solução resumidos. */
  compact?: boolean
}

/** Card de projeto-como-quest. Compartilhado entre a Aventura e o Quick Mode. */
export function QuestCard({ project, compact = false }: QuestCardProps) {
  const technologies = getSkillsByIds(project.skillIds)

  return (
    <PixelPanel bordered className={styles.card} id={project.id}>
      <div className={styles.header}>
        <h3 className={styles.name}>{project.name}</h3>
        <StatusTag tone={STATUS_TONE[project.status]}>
          {PROJECT_STATUS_LABELS[project.status]}
        </StatusTag>
      </div>

      <p>{project.description}</p>

      {!compact && (
        <>
          <div className={styles.section}>
            <span className={styles.sectionLabel}>Problema</span>
            <p>{project.problem}</p>
          </div>
          <div className={styles.section}>
            <span className={styles.sectionLabel}>Solução</span>
            <p>{project.solution}</p>
          </div>
        </>
      )}

      {technologies.length > 0 && (
        <div className={styles.section}>
          <span className={styles.sectionLabel}>Tecnologias</span>
          <ul className={styles.techList}>
            {technologies.map((tech) => (
              <li key={tech.id} className={styles.techChip}>
                {tech.name}
              </li>
            ))}
          </ul>
        </div>
      )}

      {!compact && project.screenshots && project.screenshots.length > 0 && (
        <div className={styles.screenshots}>
          {project.screenshots.map((src) => (
            <img key={src} src={src} alt={`Screenshot de ${project.name}`} loading="lazy" />
          ))}
        </div>
      )}

      <div className={styles.actions}>
        {project.links.demo && (
          <PixelButton
            as="a"
            href={project.links.demo}
            target="_blank"
            rel="noreferrer"
            variant="primary"
          >
            VER PROJETO
          </PixelButton>
        )}
        {project.links.github && (
          <PixelButton as="a" href={project.links.github} target="_blank" rel="noreferrer">
            GITHUB
          </PixelButton>
        )}
      </div>
    </PixelPanel>
  )
}
