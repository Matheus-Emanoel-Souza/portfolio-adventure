import type { ReactNode } from 'react'
import styles from './QuickMode.module.css'

interface ContactCardProps {
  icon: ReactNode
  title: string
  action: string
  href: string
  ariaLabel: string
  external?: boolean
  /** Controle secundário fora do link principal (ex.: CopyButton do e-mail) — nunca aninhado dentro do `<a>`. */
  extra?: ReactNode
}

/** Card de canal de contato — área clicável grande, ícone + título + ação. */
export function ContactCard({ icon, title, action, href, ariaLabel, external, extra }: ContactCardProps) {
  return (
    <div className={styles.contactCard}>
      <a
        href={href}
        {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
        className={styles.contactCardLink}
        aria-label={ariaLabel}
      >
        <span className={styles.contactCardIcon} aria-hidden="true">
          {icon}
        </span>
        <span className={styles.contactCardBody}>
          <span className={styles.contactCardTitle}>{title}</span>
          <span className={styles.contactCardAction}>
            {action}
            <span aria-hidden="true">→</span>
          </span>
        </span>
      </a>
      {extra && <div className={styles.contactCardExtra}>{extra}</div>}
    </div>
  )
}
