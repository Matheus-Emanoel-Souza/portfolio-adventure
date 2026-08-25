import { useEffect, useRef, useState } from 'react'
import styles from './CopyButton.module.css'

interface CopyButtonProps {
  value: string
  label: string
  copiedLabel: string
  ariaLabel: string
  ariaLabelCopied: string
}

/** Copia `value` pro clipboard, com fallback pra navegadores sem Clipboard API. */
async function copyToClipboard(value: string) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(value)
    return
  }
  const textarea = document.createElement('textarea')
  textarea.value = value
  textarea.style.position = 'fixed'
  textarea.style.opacity = '0'
  document.body.appendChild(textarea)
  textarea.select()
  document.execCommand('copy')
  document.body.removeChild(textarea)
}

export function CopyButton({ value, label, copiedLabel, ariaLabel, ariaLabelCopied }: CopyButtonProps) {
  const [copied, setCopied] = useState(false)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  useEffect(() => () => clearTimeout(timeoutRef.current), [])

  const handleClick = async () => {
    try {
      await copyToClipboard(value)
      setCopied(true)
      clearTimeout(timeoutRef.current)
      timeoutRef.current = setTimeout(() => setCopied(false), 2000)
    } catch {
      // Sem permissão de clipboard — falha silenciosa, botão continua clicável.
    }
  }

  return (
    <button
      type="button"
      className={[styles.button, copied && styles.copied].filter(Boolean).join(' ')}
      onClick={handleClick}
      aria-label={copied ? ariaLabelCopied : ariaLabel}
    >
      <span aria-hidden="true">{copied ? copiedLabel : label}</span>
    </button>
  )
}
