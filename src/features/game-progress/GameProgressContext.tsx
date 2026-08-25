import { useCallback, useMemo, type ReactNode } from 'react'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { GameProgressContext, type GameProgressValue } from './context'
import {
  ADVENTURE_SECTIONS,
  buildAchievementContext,
  computeGameStats,
  resolveAchievements,
  type AdventureSection,
} from './gameProgress'

export function GameProgressProvider({ children }: { children: ReactNode }) {
  const [visitedSections, setVisitedSections] = useLocalStorage<AdventureSection[]>(
    'portfolio-adventure:visited-sections',
    [],
  )

  const markSectionVisited = useCallback(
    (section: AdventureSection) => {
      setVisitedSections((current) =>
        current.includes(section) ? current : [...current, section],
      )
    },
    [setVisitedSections],
  )

  const value = useMemo<GameProgressValue>(() => {
    const context = buildAchievementContext()
    const resolvedAchievements = resolveAchievements(context)
    const unlockedCount = resolvedAchievements.filter((a) => a.unlocked).length
    return {
      stats: computeGameStats(context, unlockedCount),
      achievements: resolvedAchievements,
      visitedSections,
      totalSections: ADVENTURE_SECTIONS.length,
      markSectionVisited,
    }
  }, [visitedSections, markSectionVisited])

  return <GameProgressContext.Provider value={value}>{children}</GameProgressContext.Provider>
}
