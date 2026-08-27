import { StatusTag } from '@/components/StatusTag/StatusTag'
import { getSkillsByIds } from '@/data/skills'
import type { Dictionary } from '@/i18n/types'
import type { Project } from '@/types'
import styles from './ProjectShowcase.module.css'

const STATUS_TONE = {
  completed: 'completed',
  'in-progress': 'inProgress',
  planned: 'planned',
} as const

interface ProjectPanelProps {
  project: Project
  t: Dictionary
  /** Só o painel visível no momento fica no tab order — os outros existem no DOM (scroll), mas não roubam foco. */
  active: boolean
}

/**
 * Um painel do showcase horizontal — texto + screenshot (quando existir).
 * Mesmos campos de `Project` que o QuestCard usa (nada duplicado), só com
 * mais espaço e um layout consistente entre projetos. Cinco blocos nomeados
 * (header/description/media/details/actions) — o grid do CSS reordena eles
 * por breakpoint sem mexer no DOM (desktop: texto + screenshot lado a lado;
 * mobile: empilhado, screenshot logo após a descrição curta).
 */
export function ProjectPanel({ project, t, active }: ProjectPanelProps) {
  const technologies = getSkillsByIds(project.skillIds)
  const hasScreenshots = Boolean(project.screenshots && project.screenshots.length > 0)

  return (
    <article className={styles.panel} aria-label={project.name}>
      <div
        className={[styles.panelInner, hasScreenshots && styles.panelInnerWithMedia]
          .filter(Boolean)
          .join(' ')}
      >
        <header className={styles.blockHeader}>
          <h3 className={styles.panelName}>{project.name}</h3>
          <StatusTag tone={STATUS_TONE[project.status]}>
            {t.quickMode.projectStatus[project.status]}
          </StatusTag>
        </header>

        <p className={styles.blockDescription}>{project.description}</p>

        {hasScreenshots && (
          <div className={styles.blockMedia}>
            {project.screenshots!.slice(0, 2).map((src) => (
              <img
                key={src}
                src={src}
                alt={`${t.common.screenshotOf} ${project.name}`}
                loading="lazy"
                decoding="async"
                className={styles.panelImage}
              />
            ))}
          </div>
        )}

        <div className={styles.blockDetails}>
          {project.problem && (
            <div className={styles.panelSection}>
              <span className={styles.panelSectionLabel}>{t.common.problem}</span>
              <p>{project.problem}</p>
            </div>
          )}

          {project.solution && (
            <div className={styles.panelSection}>
              <span className={styles.panelSectionLabel}>{t.common.solution}</span>
              <p>{project.solution}</p>
            </div>
          )}

          {technologies.length > 0 && (
            <ul className={styles.techList}>
              {technologies.map((tech) => (
                <li key={tech.id} className={styles.techChip}>
                  {tech.name}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className={styles.blockActions}>
          {project.links.demo && (
            <a
              href={project.links.demo}
              target="_blank"
              rel="noreferrer"
              tabIndex={active ? undefined : -1}
              className={[styles.actionButton, styles.actionButtonPrimary].join(' ')}
              aria-label={`${t.common.viewProject}: ${project.name} (${t.contact.openAria})`}
            >
              {t.common.viewProject}
            </a>
          )}
          {project.links.github && (
            <a
              href={project.links.github}
              target="_blank"
              rel="noreferrer"
              tabIndex={active ? undefined : -1}
              className={styles.actionButton}
              aria-label={`${t.common.github}: ${project.name} (${t.contact.openAria})`}
            >
              {t.common.github}
            </a>
          )}
        </div>
      </div>
    </article>
  )
}
