import { Link } from 'react-router-dom'
import { CopyButton } from '@/components/CopyButton/CopyButton'
import { EmailIcon } from '@/components/icons/EmailIcon'
import { LinkedInIcon } from '@/components/icons/LinkedInIcon'
import { WhatsAppIcon } from '@/components/icons/WhatsAppIcon'
import { LanguageSwitcher } from '@/components/LanguageSwitcher/LanguageSwitcher'
import { careerEvents } from '@/data/career'
import { profile } from '@/data/profile'
import { projects } from '@/data/projects'
import { skills } from '@/data/skills'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { useLanguage } from '@/i18n/useLanguage'
import { buildWhatsAppLink } from '@/lib/whatsapp'
import { SKILL_CATEGORIES } from '@/types'
import { CareerTimeline } from './CareerTimeline'
import { ContactCard } from './ContactCard'
import { ProjectShowcase } from './ProjectShowcase'
import styles from './QuickMode.module.css'

/**
 * Versão tradicional e rápida do portfólio — mesmos dados de `src/data/*` e
 * mesma fonte de trajetória do Career Graph (`careerEvents`), sem chrome de
 * jogo, pensada pra leitura rápida por recrutadores.
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
          <p className={styles.role}>{profile.role}</p>
          {profile.tagline && <p className={styles.tagline}>{profile.tagline}</p>}
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

        <section className={[styles.section, styles.sectionWide].join(' ')} aria-labelledby="qm-projects-heading">
          <h2 id="qm-projects-heading">{t.quickMode.projectsHeading}</h2>
          <ProjectShowcase projects={projects} t={t} />
        </section>

        <section className={[styles.section, styles.sectionWide].join(' ')} aria-labelledby="qm-career-heading">
          <h2 id="qm-career-heading">{t.quickMode.careerHeading}</h2>
          <CareerTimeline events={careerEvents} t={t} />
        </section>

        <section className={styles.section}>
          <h2>{t.quickMode.contactHeading}</h2>
          <p className={styles.contactIntro}>{t.quickMode.contactIntro}</p>
          <div className={styles.contactGrid}>
            <ContactCard
              icon={<EmailIcon className={styles.contactIconSvg} />}
              title={t.quickMode.contactEmailTitle}
              action={t.quickMode.contactEmailAction}
              href={`mailto:${profile.social.email}`}
              ariaLabel={`${t.contact.sendAria} ${profile.social.email}`}
              extra={
                <CopyButton
                  value={profile.social.email}
                  label={t.common.copy}
                  copiedLabel={t.common.copied}
                  ariaLabel={t.contact.copyEmailAria}
                  ariaLabelCopied={t.contact.copyEmailCopiedAria}
                />
              }
            />

            {profile.social.linkedin && (
              <ContactCard
                icon={<LinkedInIcon className={styles.contactIconSvg} />}
                title={t.quickMode.contactLinkedinTitle}
                action={t.quickMode.contactLinkedinAction}
                href={profile.social.linkedin}
                external
                ariaLabel={`${t.quickMode.contactLinkedinTitle} (${t.contact.openAria})`}
              />
            )}

            {profile.social.whatsapp && (
              <ContactCard
                icon={<WhatsAppIcon className={styles.contactIconSvg} />}
                title={t.quickMode.contactWhatsappTitle}
                action={t.quickMode.contactWhatsappAction}
                href={buildWhatsAppLink(profile.social.whatsapp)}
                external
                ariaLabel={`${t.quickMode.contactWhatsappTitle} (${t.contact.openAria})`}
              />
            )}
          </div>
        </section>
      </main>
    </div>
  )
}
