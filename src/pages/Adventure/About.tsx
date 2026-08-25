import { EmptyState } from '@/components/EmptyState/EmptyState'
import { PixelPanel } from '@/components/PixelPanel/PixelPanel'
import { profile } from '@/data/profile'
import { useMarkSectionVisited } from '@/features/game-progress/useMarkSectionVisited'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import styles from './About.module.css'

export default function About() {
  useDocumentTitle('Personagem')
  useMarkSectionVisited('about')

  return (
    <div className={styles.layout}>
      <PixelPanel bordered className={styles.card}>
        <div className={styles.avatar} aria-hidden="true">
          {profile.name.charAt(0)}
        </div>
        <h2 className={styles.name}>{profile.name}</h2>
        <p className={styles.role}>{profile.role}</p>
        {profile.location && <p className={styles.role}>{profile.location}</p>}
      </PixelPanel>

      <PixelPanel className={styles.card}>
        <h3>Player Stats</h3>
        {profile.bio ? (
          <p>{profile.bio}</p>
        ) : (
          <EmptyState
            title="Bio a preencher"
            description="Adicione uma bio real em src/data/profile.ts."
          />
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
            title="Stats a preencher"
            description="Adicione Player Stats reais em src/data/profile.ts."
          />
        )}
      </PixelPanel>
    </div>
  )
}
