import type { Achievement } from '@/types'

/**
 * Regras determinísticas a partir dos dados reais (projects/skills/career).
 * Nada de `Math.random()` ou desbloqueio por tempo de sessão — se aparece
 * desbloqueado, é porque o dado que sustenta a conquista existe de fato.
 */
export const achievements: Achievement[] = [
  {
    id: 'first-commit',
    title: 'First Commit',
    description: 'O Portfolio Adventure existe e está no ar.',
    glyph: '⌨',
    isUnlocked: () => true,
  },
  {
    id: 'project-builder',
    title: 'Project Builder',
    description: 'Pelo menos uma quest (projeto) cadastrada.',
    glyph: '🛠',
    isUnlocked: (ctx) => ctx.completedProjectsCount + ctx.inProgressProjectsCount >= 1,
  },
  {
    id: 'open-source',
    title: 'Open Source',
    description: 'Pelo menos um projeto com repositório público.',
    glyph: '🌐',
    isUnlocked: (ctx) => ctx.publicRepoProjectsCount >= 1,
  },
  {
    id: 'full-stack',
    title: 'Full Stack',
    description: 'Skills registradas em frontend e backend.',
    glyph: '🧩',
    isUnlocked: (ctx) =>
      ctx.skillCategoriesCovered.includes('frontend') &&
      ctx.skillCategoriesCovered.includes('backend'),
  },
  {
    id: 'bug-hunter',
    title: 'Bug Hunter',
    description: 'Reservado — desbloqueia quando o histórico de issues resolvidas for integrado.',
    glyph: '🐛',
    isUnlocked: () => false,
  },
]
