import { useState } from 'react'
import { Link } from 'react-router-dom'
import { EmptyState } from '@/components/EmptyState/EmptyState'
import { PixelPanel } from '@/components/PixelPanel/PixelPanel'
import { getProjectsBySkillId } from '@/data/projects'
import { getSkillById, skills } from '@/data/skills'
import { useMarkSectionVisited } from '@/features/game-progress/useMarkSectionVisited'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { SKILL_CATEGORY_LABELS, type SkillCategory } from '@/types'
import styles from './SkillTree.module.css'

const CATEGORIES = Object.keys(SKILL_CATEGORY_LABELS) as SkillCategory[]

export default function SkillTree() {
  useDocumentTitle('Skill Tree')
  useMarkSectionVisited('skills')

  const [selectedSkillId, setSelectedSkillId] = useState<string | null>(null)
  const selectedSkill = selectedSkillId ? getSkillById(selectedSkillId) : undefined
  const relatedProjects = selectedSkillId ? getProjectsBySkillId(selectedSkillId) : []

  return (
    <div>
      <h2>Skill Tree</h2>
      <p>Selecione uma skill pra ver em quais projetos ela foi usada.</p>

      <div className={styles.categories}>
        {CATEGORIES.map((category) => {
          const categorySkills = skills.filter((skill) => skill.category === category)
          return (
            <div key={category} className={styles.category}>
              <h3 className={styles.categoryTitle}>{SKILL_CATEGORY_LABELS[category]}</h3>
              {categorySkills.length > 0 ? (
                <div className={styles.nodes}>
                  {categorySkills.map((skill) => (
                    <button
                      key={skill.id}
                      type="button"
                      className={[
                        styles.node,
                        skill.id === selectedSkillId && styles.nodeSelected,
                      ]
                        .filter(Boolean)
                        .join(' ')}
                      aria-pressed={skill.id === selectedSkillId}
                      onClick={() =>
                        setSelectedSkillId((current) => (current === skill.id ? null : skill.id))
                      }
                    >
                      {skill.name}
                    </button>
                  ))}
                </div>
              ) : (
                <p className={styles.emptyNote}>Em construção — a preencher.</p>
              )}
            </div>
          )
        })}
      </div>

      {selectedSkill && (
        <PixelPanel bordered className={styles.detail}>
          <h3>{selectedSkill.name}</h3>
          {selectedSkill.summary && <p>{selectedSkill.summary}</p>}

          {relatedProjects.length > 0 ? (
            <ul className={styles.projectList}>
              {relatedProjects.map((project) => (
                <li key={project.id}>
                  <Link className={styles.projectLink} to={`/adventure/projects#${project.id}`}>
                    {project.name}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <EmptyState
              title="Nenhum projeto vinculado ainda"
              description="Associe projetos a esta skill via skillIds em src/data/projects.ts."
            />
          )}
        </PixelPanel>
      )}
    </div>
  )
}
