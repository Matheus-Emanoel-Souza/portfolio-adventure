import type { ReactNode } from 'react'
import styles from './StatusTag.module.css'

type Tone = 'completed' | 'inProgress' | 'planned' | 'locked'

const TONE_CLASS: Record<Tone, string> = {
  completed: styles.completed,
  inProgress: styles.inProgress,
  planned: styles.planned,
  locked: styles.locked,
}

interface StatusTagProps {
  tone: Tone
  children: ReactNode
}

export function StatusTag({ tone, children }: StatusTagProps) {
  return <span className={`${styles.tag} ${TONE_CLASS[tone]}`}>{children}</span>
}
