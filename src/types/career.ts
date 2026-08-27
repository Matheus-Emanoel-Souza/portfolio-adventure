/** Branch do "repositório" de carreira. Union fechada — estender aqui pra adicionar novas. */
export type CareerBranch = 'career' | 'education' | 'courses'

/**
 * Tipo do commit, inspirado em Conventional Commits. Não força um tipo único
 * pra tudo — cada evento usa o que fizer sentido semanticamente.
 */
export type CareerCommitType = 'init' | 'feat' | 'refactor' | 'milestone' | 'study' | 'cert' | 'course'

// Rótulos de commitType e de branch ficam no dicionário de i18n (src/i18n/*.ts).

export interface CareerEvent {
  id: string
  branch: CareerBranch
  commitType: CareerCommitType
  title: string
  organization?: string
  /** "YYYY-MM" — usado só pra ordenar/posicionar no eixo temporal, nunca exibido cru. */
  sortDate: string
  /**
   * "YYYY-MM" opcional — início real do evento, quando difere do ano de
   * `sortDate` (ex.: `sortDate` aponta pro fim, pra ordenar pela conclusão).
   * Quando presente, o Career Graph acrescenta um marcador visual de início
   * nesse ponto do eixo, sem duplicar o commit/card do evento.
   */
  startSortDate?: string
  /** Texto livre exatamente como deve aparecer, ex. "Julho de 2025 — atual". */
  period: string
  /**
   * Marca o evento em andamento (estágio atual, graduação em curso). Quando
   * `sortDate` já ficou pra trás do ano vigente, o Career Graph acrescenta um
   * marcador "atual" no ano vigente — a branch chega até hoje mesmo o commit
   * tendo sido registrado no início da experiência.
   */
  current?: boolean
  description: string
  /** Nunca inventar aqui — só tecnologias/conhecimentos confirmados. */
  technologies?: string[]
  /**
   * Trilha agrupada (opcional): quando um commit representa vários cursos
   * pequenos relacionados em vez de um único curso, liste-os aqui em vez de
   * criar um `CareerEvent` pra cada um — evita poluir o graph com dezenas de
   * commits minúsculos. Usado sobretudo na branch `courses`, mas não é
   * exclusivo dela.
   */
  items?: string[]
}
