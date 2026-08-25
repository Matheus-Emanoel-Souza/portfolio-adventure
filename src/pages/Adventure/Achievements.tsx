import { PixelPanel } from '@/components/PixelPanel/PixelPanel'
import { StatusTag } from '@/components/StatusTag/StatusTag'
import { useGameProgress } from '@/features/game-progress/useGameProgress'
import { useMarkSectionVisited } from '@/features/game-progress/useMarkSectionVisited'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import styles from './Achievements.module.css'

export default function Achievements() {
  useDocumentTitle('Conquistas')
  useMarkSectionVisited('achievements')

  const { achievements } = useGameProgress()
  const unlockedCount = achievements.filter((a) => a.unlocked).length

  return (
    <div>
      <h2>Conquistas</h2>
      <p>
        {unlockedCount}/{achievements.length} desbloqueadas — desbloqueio é sempre baseado em
        dado real (projetos, skills, trajetória), nunca simulado.
      </p>

      <div className={styles.grid}>
        {achievements.map((achievement) => (
          <PixelPanel
            key={achievement.id}
            bordered={achievement.unlocked}
            className={[styles.badge, !achievement.unlocked && styles.locked]
              .filter(Boolean)
              .join(' ')}
          >
            <span className={styles.glyph} aria-hidden="true">
              {achievement.glyph}
            </span>
            <h3 className={styles.title}>{achievement.title}</h3>
            <p className={styles.description}>{achievement.description}</p>
            <StatusTag tone={achievement.unlocked ? 'completed' : 'locked'}>
              {achievement.unlocked ? 'DESBLOQUEADA' : 'BLOQUEADA'}
            </StatusTag>
          </PixelPanel>
        ))}
      </div>
    </div>
  )
}
