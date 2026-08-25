import { useLanguage } from '@/i18n/useLanguage'

/** Só visível quando recebe foco de teclado — pula direto pro conteúdo. */
export function SkipLink() {
  const { t } = useLanguage()
  return (
    <a href="#main-content" className="skip-link">
      {t.skipLink}
    </a>
  )
}
