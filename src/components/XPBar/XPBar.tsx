import styles from './XPBar.module.css'

interface XPBarProps {
  level: number
  value: number
  max: number
}

export function XPBar({ level, value, max }: XPBarProps) {
  const percent = Math.min(100, Math.round((value / max) * 100))

  return (
    <div className={styles.wrapper}>
      <span>
        LVL {level} · {value}/{max} XP
      </span>
      <div
        className={styles.track}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-label={`Progresso de XP: nível ${level}`}
      >
        <div className={styles.fill} style={{ width: `${percent}%` }} />
      </div>
    </div>
  )
}
