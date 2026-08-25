import { Link } from 'react-router-dom'
import { EmptyState } from '@/components/EmptyState/EmptyState'
import { LanguageSwitcher } from '@/components/LanguageSwitcher/LanguageSwitcher'
import { QuestCard } from '@/components/QuestCard/QuestCard'
import { profile } from '@/data/profile'
import { projects } from '@/data/projects'
import { skills } from '@/data/skills'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { useLanguage } from '@/i18n/useLanguage'
import { SKILL_CATEGORIES } from '@/types'
import styles from './QuickMode.module.css'

/**
 * Versão tradicional e rápida do portfólio — mesmos dados de
 * `src/data/*`, sem chrome de jogo, pensada pra leitura rápida por
 * recrutadores.
 */
export default function QuickMode() {
  useDocumentTitle('Quick Mode')
  const { t } = useLanguage()

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <Link to="/" className={styles.brand}>
          {profile.handle}
        </Link>
        <div className={styles.headerRight}>
          <Link to="/adventure" className={styles.backLink}>
            {t.quickMode.viewAdventure}
          </Link>
          <LanguageSwitcher />
        </div>
      </header>

      <main id="main-content" className={styles.main} tabIndex={-1}>
        <section className={styles.section}>
          <h1>{profile.name}</h1>
          <p>{profile.role}</p>
          {profile.bio ? <p>{profile.bio}</p> : null}
        </section>

        <section className={styles.section}>
          <h2>{t.quickMode.skillsHeading}</h2>
          <div className={styles.skillGroups}>
            {SKILL_CATEGORIES.map((category) => {
              const categorySkills = skills.filter((skill) => skill.category === category)
              if (categorySkills.length === 0) return null
              return (
                <div key={category}>
                  <span className={styles.skillGroupTitle}>{t.skillCategory[category]}</span>
                  <ul className={styles.skillChips}>
                    {categorySkills.map((skill) => (
                      <li key={skill.id}>{skill.name}</li>
                    ))}
                  </ul>
                </div>
              )
            })}
          </div>
        </section>

        <section className={styles.section}>
          <h2>{t.quickMode.projectsHeading}</h2>
          {projects.length > 0 ? (
            <div className={styles.projectList}>
              {projects.map((project) => (
                <QuestCard key={project.id} project={project} compact />
              ))}
            </div>
          ) : (
            <EmptyState
              title={t.quickMode.projectsEmptyTitle}
              description={t.quickMode.projectsEmptyDescription}
            />
          )}
        </section>

        <section className={styles.section}>
          <h2>{t.quickMode.contactHeading}</h2>
          <div className={styles.contactList}>
            <a href={profile.social.github} target="_blank" rel="noreferrer">
              GitHub
            </a>
            <a href={`mailto:${profile.social.email}`}>{profile.social.email}</a>
            {profile.social.linkedin && (
              <a href={profile.social.linkedin} target="_blank" rel="noreferrer">
                LinkedIn
              </a>
            )}
          </div>
        </section>
      </main>
    </div>
  )
}
