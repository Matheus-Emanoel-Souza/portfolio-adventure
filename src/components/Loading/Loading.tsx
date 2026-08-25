import { useLanguage } from '@/i18n/useLanguage'
import styles from './Loading.module.css'

/** Fallback de `Suspense` pras rotas lazy — role="status" pra leitor de tela. */
export function Loading() {
  const { t } = useLanguage()
  return (
    <div className={styles.wrapper} role="status" aria-live="polite">
      <div className={styles.dots} aria-hidden="true">
        <span className={styles.dot} />
        <span className={styles.dot} />
        <span className={styles.dot} />
      </div>
      <span>{t.common.loading}</span>
    </div>
  )
}
