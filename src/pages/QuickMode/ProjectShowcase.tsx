import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from 'react'
import { EmptyState } from '@/components/EmptyState/EmptyState'
import { GitHubIcon } from '@/components/icons/GitHubIcon'
import { profile } from '@/data/profile'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import type { Dictionary } from '@/i18n/types'
import type { Project } from '@/types'
import { ProjectPanel } from './ProjectPanel'
import styles from './ProjectShowcase.module.css'

interface ProjectShowcaseProps {
  projects: Project[]
  t: Dictionary
}

/**
 * Showcase horizontal de projetos — um painel por projeto, navegação por
 * scroll snap (arraste/swipe/trackpad), setas e indicador de posição.
 * Sem carousel automático: quem controla a navegação é sempre o usuário.
 */
export function ProjectShowcase({ projects, t }: ProjectShowcaseProps) {
  const reducedMotion = useReducedMotion()
  const trackRef = useRef<HTMLDivElement>(null)
  const rafRef = useRef<number | undefined>(undefined)
  const [activeIndex, setActiveIndex] = useState(0)

  const scrollToIndex = useCallback(
    (index: number) => {
      const clamped = Math.max(0, Math.min(index, projects.length - 1))
      // Estado otimista — não espera o evento de scroll (que em telas sem
      // gesto nenhum, como clique nas setas/bolinhas, só chega depois do
      // smooth scroll terminar). handleScroll ainda corrige o índice se o
      // usuário arrastar/soltar o scroll livremente por conta própria.
      setActiveIndex(clamped)
      const track = trackRef.current
      const panel = track?.children[clamped] as HTMLElement | undefined
      if (!track || !panel) return
      track.scrollTo?.({ left: panel.offsetLeft, behavior: reducedMotion ? 'auto' : 'smooth' })
    },
    [projects.length, reducedMotion],
  )

  const handleScroll = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    rafRef.current = requestAnimationFrame(() => {
      const track = trackRef.current
      if (!track || track.clientWidth === 0) return
      const index = Math.round(track.scrollLeft / track.clientWidth)
      setActiveIndex((current) => (current === index ? current : index))
    })
  }, [])

  useEffect(
    () => () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    },
    [],
  )

  function handleTrackKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === 'ArrowRight') {
      event.preventDefault()
      scrollToIndex(activeIndex + 1)
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault()
      scrollToIndex(activeIndex - 1)
    }
  }

  if (projects.length === 0) {
    return (
      <EmptyState
        title={t.quickMode.projectsEmptyTitle}
        description={t.quickMode.projectsEmptyDescription}
      />
    )
  }

  const isFirst = activeIndex <= 0
  const isLast = activeIndex >= projects.length - 1

  return (
    <div className={styles.wrap}>
      <div className={styles.showcase}>
        <button
          type="button"
          className={styles.navArrow}
          onClick={() => scrollToIndex(activeIndex - 1)}
          disabled={isFirst}
          aria-label={t.quickMode.projectsPrevAria}
        >
          <span aria-hidden="true">←</span>
        </button>

        <div
          ref={trackRef}
          className={styles.track}
          role="group"
          aria-roledescription="carousel"
          aria-label={t.quickMode.projectsShowcaseAria}
          tabIndex={0}
          onScroll={handleScroll}
          onKeyDown={handleTrackKeyDown}
        >
          {projects.map((project, index) => (
            <ProjectPanel key={project.id} project={project} t={t} active={index === activeIndex} />
          ))}
        </div>

        <button
          type="button"
          className={styles.navArrow}
          onClick={() => scrollToIndex(activeIndex + 1)}
          disabled={isLast}
          aria-label={t.quickMode.projectsNextAria}
        >
          <span aria-hidden="true">→</span>
        </button>
      </div>

      <div className={styles.meta}>
        <p className={styles.dragHint} aria-hidden="true">
          {t.quickMode.dragHint}
        </p>
        <div className={styles.indicators}>
          <span className={styles.counter} aria-hidden="true">
            {String(activeIndex + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
          </span>
          <div className={styles.dots} role="group" aria-label={t.quickMode.projectsShowcaseAria}>
            {projects.map((project, index) => (
              <button
                key={project.id}
                type="button"
                aria-current={index === activeIndex ? 'true' : undefined}
                aria-label={`${t.quickMode.projectsGoToAria}: ${project.name}`}
                className={[styles.dot, index === activeIndex && styles.dotActive]
                  .filter(Boolean)
                  .join(' ')}
                onClick={() => scrollToIndex(index)}
              />
            ))}
          </div>
        </div>
      </div>

      <div className={styles.githubCta}>
        <p>{t.quickMode.projectsGithubCta}</p>
        <a
          href={profile.social.github}
          target="_blank"
          rel="noreferrer"
          className={styles.githubButton}
          aria-label={`${t.common.github} (${t.contact.openAria})`}
        >
          <GitHubIcon className={styles.githubButtonIcon} />
          {t.common.github}
          <span aria-hidden="true">↗</span>
        </a>
      </div>
    </div>
  )
}
