import { Link } from 'react-router-dom'
import { PixelPanel } from '@/components/PixelPanel/PixelPanel'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { useLanguage } from '@/i18n/useLanguage'
import styles from './AdventureMap.module.css'

export default function AdventureMap() {
  useDocumentTitle('Mapa da Aventura')
  const { t } = useLanguage()

  const locations = [
    { to: '/adventure/about', ...t.adventureMap.locations.about },
    { to: '/adventure/projects', ...t.adventureMap.locations.projects },
    { to: '/adventure/skills', ...t.adventureMap.locations.skills },
    { to: '/adventure/achievements', ...t.adventureMap.locations.achievements },
    { to: '/adventure/quest-log', ...t.adventureMap.locations.questLog },
    { to: '/adventure/contact', ...t.adventureMap.locations.contact },
  ]

  return (
    <div>
      <div className={styles.intro}>
        <h2>{t.adventureMap.title}</h2>
        <p>{t.adventureMap.subtitle}</p>
      </div>

      <div className={styles.grid}>
        {locations.map((location) => (
          <Link key={location.to} to={location.to} className={styles.card}>
            <PixelPanel bordered>
              <span className={styles.cardTitle}>{location.title}</span>
              <p className={styles.cardDescription}>{location.description}</p>
            </PixelPanel>
          </Link>
        ))}
      </div>
    </div>
  )
}
