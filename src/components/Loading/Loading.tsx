import styles from './Loading.module.css'

/** Fallback de `Suspense` pras rotas lazy — role="status" pra leitor de tela. */
export function Loading() {
  return (
    <div className={styles.wrapper} role="status" aria-live="polite">
      <div className={styles.dots} aria-hidden="true">
        <span className={styles.dot} />
        <span className={styles.dot} />
        <span className={styles.dot} />
      </div>
      <span>CARREGANDO...</span>
    </div>
  )
}
