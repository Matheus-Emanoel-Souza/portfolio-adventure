import type { SkillCategory } from './skill'

export interface AchievementContext {
  completedProjectsCount: number
  inProgressProjectsCount: number
  publicRepoProjectsCount: number
  /** Categorias de skill com pelo menos uma entrada cadastrada. */
  skillCategoriesCovered: SkillCategory[]
  careerEventsCount: number
}

export interface Achievement {
  id: string
  title: string
  description: string
  /** Glifo pixel curto (emoji ou símbolo), não ícone customizado pesado. */
  glyph: string
  /** Regra determinística — nunca `Math.random()` ou estado fake. */
  isUnlocked: (context: AchievementContext) => boolean
}
