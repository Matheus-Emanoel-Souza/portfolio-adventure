import { useCallback, useEffect, useState } from 'react'

/**
 * Estado sincronizado com localStorage. Falha graciosamente (modo privado,
 * quota estourada, SSR) caindo de volta pro valor inicial em memória.
 */
export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    if (typeof window === 'undefined') return initialValue
    try {
      const raw = window.localStorage.getItem(key)
      return raw ? (JSON.parse(raw) as T) : initialValue
    } catch {
      return initialValue
    }
  })

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch {
      // Armazenamento indisponível (modo privado/quota) — segue só em memória.
    }
  }, [key, value])

  const reset = useCallback(() => setValue(initialValue), [initialValue])

  return [value, setValue, reset] as const
}
