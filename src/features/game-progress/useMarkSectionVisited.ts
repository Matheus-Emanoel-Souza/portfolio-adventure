import { useEffect } from 'react'
import { useGameProgress } from './useGameProgress'
import type { AdventureSection } from './gameProgress'

/** Marca uma seção do hub como visitada assim que a página monta. */
export function useMarkSectionVisited(section: AdventureSection) {
  const { markSectionVisited } = useGameProgress()
  useEffect(() => {
    markSectionVisited(section)
  }, [section, markSectionVisited])
}
