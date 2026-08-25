export type SkillCategory =
  | 'frontend'
  | 'backend'
  | 'database'
  | 'devops'
  | 'tools'
  | 'architecture'

export const SKILL_CATEGORIES: SkillCategory[] = [
  'frontend',
  'backend',
  'database',
  'devops',
  'tools',
  'architecture',
]

export interface Skill {
  id: string
  name: string
  category: SkillCategory
  /** Frase curta de contexto — nunca um percentual arbitrário. */
  summary?: string
}

// Rótulos por categoria ficam no dicionário de i18n (src/i18n/*.ts).
