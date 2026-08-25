import type { Skill } from '@/types'

/**
 * Só entram aqui tecnologias com uso real e verificável (ex.: as usadas
 * neste próprio projeto). Categorias sem tecnologia confirmada ficam vazias
 * de propósito — a UI mostra um estado "a preencher" em vez de inventar.
 * TODO: completar backend / banco de dados / devops / arquitetura.
 */
export const skills: Skill[] = [
  { id: 'react', name: 'React', category: 'frontend', summary: 'Base deste portfólio.' },
  {
    id: 'typescript',
    name: 'TypeScript',
    category: 'frontend',
    summary: 'Tipagem em todo o projeto.',
  },
  { id: 'vite', name: 'Vite', category: 'frontend', summary: 'Build e dev server.' },
  { id: 'css', name: 'CSS', category: 'frontend', summary: 'Estilização sem framework extra.' },
  {
    id: 'framer-motion',
    name: 'Framer Motion',
    category: 'frontend',
    summary: 'Transições e microinterações.',
  },
  { id: 'git', name: 'Git', category: 'tools', summary: 'Controle de versão.' },
  {
    id: 'github-actions',
    name: 'GitHub Actions',
    category: 'tools',
    summary: 'CI/CD deste repositório.',
  },
]

export function getSkillById(id: string): Skill | undefined {
  return skills.find((skill) => skill.id === id)
}

export function getSkillsByIds(ids: string[]): Skill[] {
  return ids.map(getSkillById).filter((skill): skill is Skill => Boolean(skill))
}
