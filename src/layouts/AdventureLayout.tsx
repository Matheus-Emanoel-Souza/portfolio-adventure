import { Suspense } from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { Loading } from '@/components/Loading/Loading'
import { PageTransition } from '@/components/PageTransition'
import { XPBar } from '@/components/XPBar/XPBar'
import { useGameProgress } from '@/features/game-progress/useGameProgress'
import styles from './AdventureLayout.module.css'

const SECTIONS = [
  { to: '/adventure', label: 'MAPA', end: true },
  { to: '/adventure/about', label: 'PERSONAGEM' },
  { to: '/adventure/projects', label: 'QUESTS' },
  { to: '/adventure/skills', label: 'SKILL TREE' },
  { to: '/adventure/achievements', label: 'CONQUISTAS' },
  { to: '/adventure/quest-log', label: 'QUEST LOG' },
  { to: '/adventure/contact', label: 'CONTATO' },
]

/** Layout compartilhado do hub /adventure/* — HUD fixo + navegação por seção. */
export function AdventureLayout() {
  const { stats, visitedSections, totalSections } = useGameProgress()
  const location = useLocation()

  return (
    <div className={styles.layout}>
      <header className={styles.hud}>
        <NavLink to="/" className={styles.brand}>
          MATHEUS.DEV
        </NavLink>
        <div className={styles.hudRight}>
          <span className={styles.progress}>
            {visitedSections.length}/{totalSections} SEÇÕES EXPLORADAS
          </span>
          <XPBar level={stats.level} value={stats.xpIntoLevel} max={stats.xpForNextLevel} />
        </div>
      </header>

      <nav className={styles.nav} aria-label="Navegação da aventura">
        {SECTIONS.map((section) => (
          <NavLink
            key={section.to}
            to={section.to}
            end={section.end}
            className={({ isActive }) =>
              [styles.navLink, isActive && styles.navLinkActive].filter(Boolean).join(' ')
            }
          >
            {section.label}
          </NavLink>
        ))}
      </nav>

      <main id="main-content" className={styles.main} tabIndex={-1}>
        <Suspense fallback={<Loading />}>
          <PageTransition key={location.pathname}>
            <Outlet />
          </PageTransition>
        </Suspense>
      </main>
    </div>
  )
}
