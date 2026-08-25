import { useLanguage } from '@/i18n/useLanguage'
import type { Lang } from '@/i18n/types'
import styles from './LanguageSwitcher.module.css'

const OPTIONS: { value: Lang; label: string }[] = [
  { value: 'pt', label: 'PT' },
  { value: 'en', label: 'EN' },
]

/** Alterna PT/EN. Preferência persiste em localStorage via useLanguage. */
export function LanguageSwitcher() {
  const { lang, setLang, t } = useLanguage()

  return (
    <div className={styles.group} role="group" aria-label={t.languageSwitcher.label}>
      {OPTIONS.map((option) => (
        <button
          key={option.value}
          type="button"
          className={[styles.option, option.value === lang && styles.optionActive]
            .filter(Boolean)
            .join(' ')}
          aria-pressed={option.value === lang}
          onClick={() => setLang(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  )
}
