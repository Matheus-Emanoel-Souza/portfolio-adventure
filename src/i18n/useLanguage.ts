import { useContext } from 'react'
import { LanguageContext } from './context'

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) {
    throw new Error('useLanguage precisa estar dentro de <LanguageProvider>')
  }
  return ctx
}
