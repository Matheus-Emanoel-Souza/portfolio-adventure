import { achievements } from '@/data/achievements'
import { projects } from '@/data/projects'
import { skills } from '@/data/skills'
import { timeline } from '@/data/timeline'
import type { Achievement, AchievementContext } from '@/types'

/** Lógica pura, sem React — fácil de testar isoladamente. */

export function buildAchievementContext(): AchievementContext {
  return {
    completedProjectsCount: projects.filter((p) => p.status === 'completed').length,
    inProgressProjectsCount: projects.filter((p) => p.status === 'in-progress').length,
    publicRepoProjectsCount: projects.filter((p) => p.isPublicRepo).length,
    skillCategoriesCovered: Array.from(new Set(skills.map((s) => s.category))),
    timelineEntriesCount: timeline.length,
  }
}

export interface AchievementState extends Achievement {
  unlocked: boolean
}

export function resolveAchievements(context: AchievementContext): AchievementState[] {
  return achievements.map((achievement) => ({
    ...achievement,
    unlocked: achievement.isUnlocked(context),
  }))
}

/** XP por conquista/quest — constantes simples e documentadas, sem "mágica". */
const XP_PER_COMPLETED_PROJECT = 100
const XP_PER_IN_PROGRESS_PROJECT = 40
const XP_PER_UNLOCKED_ACHIEVEMENT = 50
const XP_PER_TIMELINE_ENTRY = 20
const XP_PER_LEVEL = 150

export interface GameStats {
  xp: number
  level: number
  xpIntoLevel: number
  xpForNextLevel: number
}

export function computeGameStats(
  context: AchievementContext,
  unlockedAchievementsCount: number,
): GameStats {
  const xp =
    context.completedProjectsCount * XP_PER_COMPLETED_PROJECT +
    context.inProgressProjectsCount * XP_PER_IN_PROGRESS_PROJECT +
    unlockedAchievementsCount * XP_PER_UNLOCKED_ACHIEVEMENT +
    context.timelineEntriesCount * XP_PER_TIMELINE_ENTRY

  const level = Math.floor(xp / XP_PER_LEVEL) + 1
  const xpIntoLevel = xp % XP_PER_LEVEL

  return { xp, level, xpIntoLevel, xpForNextLevel: XP_PER_LEVEL }
}

/** Seções do hub /adventure — usadas pra "quests visitadas" no HUD. */
export const ADVENTURE_SECTIONS = [
  'about',
  'projects',
  'skills',
  'achievements',
  'quest-log',
  'contact',
] as const

export type AdventureSection = (typeof ADVENTURE_SECTIONS)[number]
