import type { Project } from '@/types'

/**
 * Vazio de propósito: nenhum projeto real foi confirmado ainda.
 * TODO: adicionar quests reais aqui — id, status, descrição,
 * problema/solução, skillIds (ver data/skills.ts), links e screenshots.
 * A UI (ver pages/Adventure/Projects e pages/QuickMode) já trata o caso
 * vazio com uma mensagem "em breve", sem dado fictício.
 */
export const projects: Project[] = []

export function getProjectsBySkillId(skillId: string): Project[] {
  return projects.filter((project) => project.skillIds.includes(skillId))
}
