import { Link } from 'react-router-dom'
import { LanguageSwitcher } from '@/components/LanguageSwitcher/LanguageSwitcher'
import { PixelButton } from '@/components/PixelButton/PixelButton'
import { profile } from '@/data/profile'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { useLanguage } from '@/i18n/useLanguage'
import styles from './Home.module.css'

export default function Home() {
  useDocumentTitle('Início')
  const { t } = useLanguage()

  return (
    <section className={styles.hero}>
      <div className={styles.languageBar}>
        <LanguageSwitcher />
      </div>

      <div className={styles.titleBlock}>
        <h1 className={styles.handle}>{profile.handle}</h1>
        <p className={styles.role}>{profile.role}</p>
        <p className={styles.tagline}>{profile.tagline}</p>
      </div>

      <div className={styles.actions}>
        <PixelButton as={Link} to="/adventure" variant="primary">
          {t.home.startAdventure}
        </PixelButton>
        <PixelButton as={Link} to="/quick" variant="ghost">
          {t.home.quickMode}
        </PixelButton>
      </div>

      <p className={styles.hint}>{t.home.hint}</p>
    </section>
  )
}
