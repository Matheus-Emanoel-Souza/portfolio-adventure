export type ProjectStatus = 'completed' | 'in-progress' | 'planned'

// Rótulos de status ficam no dicionário de i18n (src/i18n/*.ts), não aqui —
// são texto de interface, traduzido por idioma.

export interface ProjectLinks {
  demo?: string
  github?: string
}

export interface Project {
  id: string
  name: string
  status: ProjectStatus
  /** Resumo curto pro card. */
  description: string
  problem: string
  solution: string
  /** ids de `Skill`, usados pra cruzar com a Skill Tree. */
  skillIds: string[]
  /** Caminhos de imagem (opcional — nada fictício até existirem screenshots reais). */
  screenshots?: string[]
  links: ProjectLinks
  /** Repo público → conta pra achievement "Open Source". */
  isPublicRepo?: boolean
  featured?: boolean
}
