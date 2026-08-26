import { Suspense } from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { Loading } from '@/components/Loading/Loading'
import { LanguageSwitcher } from '@/components/LanguageSwitcher/LanguageSwitcher'
import { PageTransition } from '@/components/PageTransition'
import { XPBar } from '@/components/XPBar/XPBar'
import { useGameProgress } from '@/features/game-progress/useGameProgress'
import { useLanguage } from '@/i18n/useLanguage'
import styles from './AdventureLayout.module.css'

/** Layout compartilhado do hub /adventure/* — HUD fixo + navegação por seção. */
export function AdventureLayout() {
  const { stats, visitedSections, totalSections } = useGameProgress()
  const { t } = useLanguage()
  const location = useLocation()

  const sections = [
    { to: '/adventure', label: t.nav.map, end: true },
    { to: '/adventure/about', label: t.nav.character },
    { to: '/adventure/projects', label: t.nav.quests },
    { to: '/adventure/skills', label: t.nav.skillTree },
    { to: '/adventure/achievements', label: t.nav.achievements },
    { to: '/adventure/career', label: t.nav.careerGraph },
    { to: '/adventure/contact', label: t.nav.contact },
  ]

  return (
    <div className={styles.layout}>
      <header className={styles.hud}>
        <NavLink to="/" className={styles.brand}>
          MATHEUS.DEV
        </NavLink>
        <div className={styles.hudRight}>
          <span className={styles.progress}>
            {visitedSections.length}/{totalSections} {t.hud.sectionsExplored}
          </span>
          <XPBar level={stats.level} value={stats.xpIntoLevel} max={stats.xpForNextLevel} />
          <LanguageSwitcher />
        </div>
      </header>

      <nav className={styles.nav} aria-label={t.nav.ariaLabel}>
        {sections.map((section) => (
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
