import { Link } from 'react-router-dom'
import { EmptyState } from '@/components/EmptyState/EmptyState'
import { WhatsAppIcon } from '@/components/icons/WhatsAppIcon'
import { LanguageSwitcher } from '@/components/LanguageSwitcher/LanguageSwitcher'
import { QuestCard } from '@/components/QuestCard/QuestCard'
import { careerEvents } from '@/data/career'
import { profile } from '@/data/profile'
import { projects } from '@/data/projects'
import { skills } from '@/data/skills'
import { layoutCareerEvents } from '@/features/career-graph/careerGraph.utils'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { useLanguage } from '@/i18n/useLanguage'
import { buildWhatsAppLink } from '@/lib/whatsapp'
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
  // Quick Mode mostra só career/education (marcos maiores) — cursos avulsos
  // poluiriam a leitura rápida de recrutador. Mesma fonte de dados do Career
  // Graph, só filtrada; quando houver cursos reais cadastrados, uma seção
  // "Cursos" separada pode entrar aqui sem misturar com graduação/estágios.
  const orderedCareerEvents = layoutCareerEvents(
    careerEvents.filter((event) => event.branch !== 'courses'),
  )

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
          <h2>{t.quickMode.careerHeading}</h2>
          <ul className={styles.careerList}>
            {orderedCareerEvents.map((event) => (
              <li key={event.id} className={styles.careerItem}>
                <div className={styles.careerItemHeader}>
                  <strong>{event.title}</strong>
                  {event.current && (
                    <span className={styles.careerCurrentBadge}>
                      {t.quickMode.careerCurrentBadge}
                    </span>
                  )}
                </div>
                {event.organization && <p className={styles.careerOrg}>{event.organization}</p>}
                <p className={styles.careerPeriod}>{event.period}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className={styles.section}>
          <h2>{t.quickMode.contactHeading}</h2>
          <div className={styles.contactList}>
            <a
              href={profile.social.github}
              target="_blank"
              rel="noreferrer"
              className={styles.primaryContactLink}
            >
              GitHub
            </a>
            <a href={`mailto:${profile.social.email}`}>{profile.social.email}</a>
            {profile.social.linkedin && (
              <a href={profile.social.linkedin} target="_blank" rel="noreferrer">
                LinkedIn
              </a>
            )}
            {profile.social.whatsapp && (
              <a
                href={buildWhatsAppLink(profile.social.whatsapp)}
                target="_blank"
                rel="noreferrer"
                className={styles.whatsappLink}
              >
                <WhatsAppIcon className={styles.whatsappIcon} />
                WhatsApp
              </a>
            )}
          </div>
        </section>
      </main>
    </div>
  )
}
