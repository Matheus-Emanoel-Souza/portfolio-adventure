import { createContext } from 'react'
import type { Dictionary, Lang } from './types'

export interface LanguageValue {
  lang: Lang
  setLang: (lang: Lang) => void
  t: Dictionary
}

export const LanguageContext = createContext<LanguageValue | null>(null)
