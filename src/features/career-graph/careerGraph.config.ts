import type { CareerBranch } from '@/types'

export interface BranchMeta {
  branch: CareerBranch
  /** Ordem da lane, da esquerda pra direita no graph. */
  order: number
  /** Custom property de cor já existente em styles/tokens.css — sem hex novo. */
  colorVar: string
}

/**
 * Metadados por branch. Pra adicionar uma branch nova (ex. `projects`):
 * 1. estender a union `CareerBranch` em src/types/career.ts;
 * 2. adicionar uma entrada aqui com `order` e `colorVar`;
 * 3. adicionar eventos em src/data/career.ts com esse `branch`.
 * O layout (careerGraph.utils.ts) e o SVG não têm nada hardcoded pra duas
 * branches — leem sempre a partir daqui e dos dados.
 */
export const BRANCH_META: Record<CareerBranch, BranchMeta> = {
  career: { branch: 'career', order: 0, colorVar: 'var(--color-primary)' },
  education: { branch: 'education', order: 1, colorVar: 'var(--color-secondary)' },
}

export const BRANCH_ORDER: CareerBranch[] = Object.values(BRANCH_META)
  .sort((a, b) => a.order - b.order)
  .map((meta) => meta.branch)

/**
 * Geometria do graph em px — única fonte de verdade, compartilhada pelo SVG
 * (linhas das branches) e pelo CSS Grid (linhas de conteúdo), pra os dois
 * ficarem sempre alinhados sem medir layout em runtime.
 */
export const GRAPH_LAYOUT = {
  rowHeight: 112,
  laneWidth: 56,
  gutterWidth: 44,
  nodeRadius: 7,
} as const

