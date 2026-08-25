import { useContext } from 'react'
import { GameProgressContext } from './context'

export function useGameProgress() {
  const ctx = useContext(GameProgressContext)
  if (!ctx) {
    throw new Error('useGameProgress precisa estar dentro de <GameProgressProvider>')
  }
  return ctx
}
