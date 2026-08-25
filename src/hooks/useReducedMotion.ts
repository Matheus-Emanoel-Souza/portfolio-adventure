import { useEffect, useState } from 'react'

const QUERY = '(prefers-reduced-motion: reduce)'

function getInitial() {
  if (typeof window === 'undefined' || !window.matchMedia) return false
  return window.matchMedia(QUERY).matches
}

/**
 * Reflete `prefers-reduced-motion` em tempo real (o usuário pode mudar a
 * preferência do SO sem recarregar a página). Usado pelos componentes com
 * Framer Motion pra trocar variantes animadas por transições instantâneas.
 */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(getInitial)

  useEffect(() => {
    if (!window.matchMedia) return
    const mql = window.matchMedia(QUERY)
    const listener = (event: MediaQueryListEvent) => setReduced(event.matches)
    mql.addEventListener('change', listener)
    return () => mql.removeEventListener('change', listener)
  }, [])

  return reduced
}
