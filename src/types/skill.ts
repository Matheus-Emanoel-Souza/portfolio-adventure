export type SkillCategory =
  | 'frontend'
  | 'backend'
  | 'database'
  | 'devops'
  | 'tools'
  | 'architecture'

export interface Skill {
  id: string
  name: string
  category: SkillCategory
  /** Frase curta de contexto — nunca um percentual arbitrário. */
  summary?: string
}

export const SKILL_CATEGORY_LABELS: Record<SkillCategory, string> = {
  frontend: 'Frontend',
  backend: 'Backend',
  database: 'Banco de Dados',
  devops: 'DevOps',
  tools: 'Ferramentas',
  architecture: 'Arquitetura',
}
