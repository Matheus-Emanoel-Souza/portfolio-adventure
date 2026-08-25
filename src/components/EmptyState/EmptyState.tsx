import styles from './EmptyState.module.css'

interface EmptyStateProps {
  title: string
  description: string
}

/** Estado honesto pra dados ainda não preenchidos — nunca inventa conteúdo. */
export function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.glyph} aria-hidden="true">
        ▧
      </div>
      <p className={styles.title}>{title}</p>
      <p>{description}</p>
    </div>
  )
}
