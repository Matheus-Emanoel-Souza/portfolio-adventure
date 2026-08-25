import { useMemo, type ReactNode } from 'react'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { LanguageContext, type LanguageValue } from './context'
import { en } from './en'
import { pt } from './pt'
import type { Dictionary, Lang } from './types'

const DICTIONARIES: Record<Lang, Dictionary> = { pt, en }

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useLocalStorage<Lang>('portfolio-adventure:lang', 'pt')

  const value = useMemo<LanguageValue>(
    () => ({ lang, setLang, t: DICTIONARIES[lang] }),
    [lang, setLang],
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}
