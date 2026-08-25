import { CopyButton } from '@/components/CopyButton/CopyButton'
import { PixelButton } from '@/components/PixelButton/PixelButton'
import { PixelPanel } from '@/components/PixelPanel/PixelPanel'
import { profile } from '@/data/profile'
import { useMarkSectionVisited } from '@/features/game-progress/useMarkSectionVisited'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { useLanguage } from '@/i18n/useLanguage'
import styles from './Contact.module.css'

export default function Contact() {
  useDocumentTitle('Contato')
  useMarkSectionVisited('contact')
  const { t } = useLanguage()

  return (
    <div>
      <h2>{t.contact.heading}</h2>
      <p>{t.contact.subtitle}</p>

      <PixelPanel bordered className={styles.terminal}>
        <p className={styles.terminalHeader}>{t.contact.terminalHeader}</p>

        <div className={styles.channels}>
          <div className={styles.channel}>
            <div className={styles.channelLabel}>
              <span className={styles.channelName}>{t.contact.githubLabel}</span>
              <span className={styles.channelValue}>{profile.social.github}</span>
            </div>
            <PixelButton
              as="a"
              href={profile.social.github}
              target="_blank"
              rel="noreferrer"
              variant="primary"
              aria-label={`${t.contact.openAria}: GitHub`}
            >
              {t.common.open}
            </PixelButton>
          </div>

          <div className={styles.channel}>
            <div className={styles.channelLabel}>
              <span className={styles.channelName}>{t.contact.emailLabel}</span>
              <span className={styles.channelValue}>{profile.social.email}</span>
            </div>
            <div className={styles.channelActions}>
              <CopyButton
                value={profile.social.email}
                label={t.common.copy}
                copiedLabel={t.common.copied}
                ariaLabel={t.contact.copyEmailAria}
                ariaLabelCopied={t.contact.copyEmailCopiedAria}
              />
              <PixelButton
                as="a"
                href={`mailto:${profile.social.email}`}
                aria-label={`${t.contact.sendAria} ${profile.social.email}`}
              >
                {t.common.send}
              </PixelButton>
            </div>
          </div>

          <div className={styles.channel}>
            <div className={styles.channelLabel}>
              <span className={styles.channelName}>{t.contact.linkedinLabel}</span>
              <span className={styles.channelValue}>
                {profile.social.linkedin ?? t.contact.linkedinEmptyNote}
              </span>
            </div>
            {profile.social.linkedin && (
              <PixelButton
                as="a"
                href={profile.social.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label={`${t.contact.openAria}: LinkedIn`}
              >
                {t.common.open}
              </PixelButton>
            )}
          </div>
        </div>
      </PixelPanel>
    </div>
  )
}
