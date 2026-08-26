import type { CareerBranch, CareerEvent } from '@/types'

/** Um `CareerEvent` já posicionado no ladder vertical compartilhado entre branches. */
export interface LayoutedCareerEvent extends CareerEvent {
  /** Hash curto determinístico, estilo Git — ver `shortHash`. */
  hash: string
  /** Linha no ladder: 0 = mais recente (topo), cresce pra baixo/mais antigo. */
  row: number
}

/** Faixa vertical ocupada por uma branch — do commit mais recente ao mais antigo dela. */
export interface BranchLane {
  branch: CareerBranch
  topRow: number
  bottomRow: number
}

export type BranchFilter = CareerBranch | 'all'
