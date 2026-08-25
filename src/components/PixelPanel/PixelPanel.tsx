import type { HTMLAttributes, ReactNode } from 'react'
import styles from './PixelPanel.module.css'

interface PixelPanelProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  raised?: boolean
  bordered?: boolean
}

/** Painel base — cartão com borda dura e sombra "pixel", sem cantos redondos. */
export function PixelPanel({
  children,
  raised,
  bordered,
  className,
  ...rest
}: PixelPanelProps) {
  const classes = [styles.panel, raised && styles.raised, bordered && styles.bordered, className]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={classes} {...rest}>
      {children}
    </div>
  )
}
