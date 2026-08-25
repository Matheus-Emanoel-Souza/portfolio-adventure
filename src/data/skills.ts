import type { Skill } from '@/types'

/**
 * Tecnologias com uso real e verificável — as usadas neste projeto ou
 * confirmadas pelo Matheus. Categorias sem tecnologia confirmada ficam
 * vazias de propósito — a UI mostra um estado "a preencher" em vez de
 * inventar. TODO: completar devops.
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
    id: 'javascript',
    name: 'JavaScript',
    category: 'frontend',
    summary: 'Linguagem base da web.',
  },
  {
    id: 'framer-motion',
    name: 'Framer Motion',
    category: 'frontend',
    summary: 'Transições e microinterações.',
  },
  { id: 'electron', name: 'Electron', category: 'frontend', summary: 'Usado no LearnDeck.' },
  { id: 'java', name: 'Java', category: 'backend', summary: 'Linguagem de programação.' },
  {
    id: 'spring-boot',
    name: 'Spring Boot',
    category: 'backend',
    summary: 'Framework Java pra backend.',
  },
  { id: 'node', name: 'Node.js', category: 'backend', summary: 'Runtime JavaScript no servidor.' },
  { id: 'dotnet', name: '.NET', category: 'backend', summary: 'Usado no Smart Taskbar (WPF).' },
  { id: 'csharp', name: 'C#', category: 'backend', summary: 'Linguagem de programação.' },
  { id: 'cpp', name: 'C++', category: 'backend', summary: 'Linguagem de programação.' },
  { id: 'c', name: 'C', category: 'backend', summary: 'Linguagem de programação.' },
  {
    id: 'databases',
    name: 'Banco de Dados',
    category: 'database',
    summary: 'Modelagem e consultas.',
  },
  {
    id: 'software-engineering',
    name: 'Engenharia de Software',
    category: 'architecture',
    summary: 'Princípios e processo de desenvolvimento.',
  },
  { id: 'git', name: 'Git', category: 'tools', summary: 'Controle de versão.' },
  { id: 'github', name: 'GitHub', category: 'tools', summary: 'Colaboração e hospedagem de código.' },
  {
    id: 'github-actions',
    name: 'GitHub Actions',
    category: 'tools',
    summary: 'CI/CD deste repositório.',
  },
  {
    id: 'kanban',
    name: 'Kanban',
    category: 'tools',
    summary: 'Gestão ágil de tarefas e fluxo de trabalho.',
  },
  {
    id: 'documentation',
    name: 'Documentação',
    category: 'tools',
    summary: 'Registro e organização de processos.',
  },
  {
    id: 'proposal-writing',
    name: 'Redação de Propostas',
    category: 'tools',
    summary: 'Comunicação técnica escrita.',
  },
]

export function getSkillById(id: string): Skill | undefined {
  return skills.find((skill) => skill.id === id)
}

export function getSkillsByIds(ids: string[]): Skill[] {
  return ids.map(getSkillById).filter((skill): skill is Skill => Boolean(skill))
}
