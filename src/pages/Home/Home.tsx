import { Link } from 'react-router-dom'
import { PixelButton } from '@/components/PixelButton/PixelButton'
import { profile } from '@/data/profile'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import styles from './Home.module.css'

export default function Home() {
  useDocumentTitle('Início')

  return (
    <section className={styles.hero}>
      <div className={styles.titleBlock}>
        <h1 className={styles.handle}>{profile.handle}</h1>
        <p className={styles.role}>{profile.role}</p>
        <p className={styles.tagline}>{profile.tagline}</p>
      </div>

      <div className={styles.actions}>
        <PixelButton as={Link} to="/adventure" variant="primary">
          [ INICIAR AVENTURA ]
        </PixelButton>
        <PixelButton as={Link} to="/quick" variant="ghost">
          [ QUICK MODE ]
        </PixelButton>
      </div>

      <p className={styles.hint}>Quick Mode: versão tradicional e rápida, direto ao ponto.</p>
    </section>
  )
}
