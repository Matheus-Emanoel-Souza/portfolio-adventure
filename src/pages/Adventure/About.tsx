import { EmptyState } from '@/components/EmptyState/EmptyState'
import { DownloadIcon } from '@/components/icons/DownloadIcon'
import { PixelButton } from '@/components/PixelButton/PixelButton'
import { PixelPanel } from '@/components/PixelPanel/PixelPanel'
import { profile, RESUME_FILE_NAME } from '@/data/profile'
import { useMarkSectionVisited } from '@/features/game-progress/useMarkSectionVisited'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { useLanguage } from '@/i18n/useLanguage'
import styles from './About.module.css'

export default function About() {
  useDocumentTitle('Personagem')
  useMarkSectionVisited('about')
  const { t } = useLanguage()

  return (
    <div className={styles.layout}>
      <PixelPanel bordered className={styles.card}>
        <div className={styles.avatar} aria-hidden="true">
          {profile.name.charAt(0)}
        </div>
        <h2 className={styles.name}>{profile.name}</h2>
        <p className={styles.role}>{profile.role}</p>
        {profile.location && <p className={styles.role}>{profile.location}</p>}
        <PixelButton
          as="a"
          href={profile.resumeUrl}
          download={RESUME_FILE_NAME}
          variant="primary"
          className={styles.resumeButton}
        >
          <DownloadIcon className={styles.resumeIcon} />
          {t.about.downloadResume}
        </PixelButton>
      </PixelPanel>

      <PixelPanel className={styles.card}>
        <h3>{t.about.playerStats}</h3>
        {profile.bio ? (
          <p>{profile.bio}</p>
        ) : (
          <EmptyState title={t.about.bioEmptyTitle} description={t.about.bioEmptyDescription} />
        )}

        {profile.stats.length > 0 ? (
          <div className={styles.statsGrid}>
            {profile.stats.map((stat) => (
              <div key={stat.label} className={styles.stat}>
                <span className={styles.statLabel}>{stat.label}</span>
                <span className={styles.statValue}>{stat.value}</span>
              </div>
            ))}
          </div>
        ) : (
          <EmptyState
            title={t.about.statsEmptyTitle}
            description={t.about.statsEmptyDescription}
          />
        )}
      </PixelPanel>
    </div>
  )
}
