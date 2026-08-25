import { createContext } from 'react'
import type { AchievementState, AdventureSection, GameStats } from './gameProgress'

export interface GameProgressValue {
  stats: GameStats
  achievements: AchievementState[]
  visitedSections: AdventureSection[]
  totalSections: number
  markSectionVisited: (section: AdventureSection) => void
}

export const GameProgressContext = createContext<GameProgressValue | null>(null)
