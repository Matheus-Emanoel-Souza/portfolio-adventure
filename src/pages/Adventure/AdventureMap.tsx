import { Link } from 'react-router-dom'
import { PixelPanel } from '@/components/PixelPanel/PixelPanel'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import styles from './AdventureMap.module.css'

const LOCATIONS = [
  {
    to: '/adventure/about',
    title: 'PERSONAGEM',
    description: 'Character Card e Player Stats.',
  },
  {
    to: '/adventure/projects',
    title: 'QUESTS',
    description: 'Projetos, tratados como missões concluídas ou em andamento.',
  },
  {
    to: '/adventure/skills',
    title: 'SKILL TREE',
    description: 'Tecnologias por área — clique numa skill pra ver os projetos ligados a ela.',
  },
  {
    to: '/adventure/achievements',
    title: 'CONQUISTAS',
    description: 'Achievements desbloqueados a partir do progresso real.',
  },
  {
    to: '/adventure/quest-log',
    title: 'QUEST LOG',
    description: 'Trajetória acadêmica e profissional em ordem cronológica.',
  },
  {
    to: '/adventure/contact',
    title: 'CONTATO',
    description: 'Communication Center — GitHub, LinkedIn e e-mail.',
  },
]

export default function AdventureMap() {
  useDocumentTitle('Mapa da Aventura')

  return (
    <div>
      <div className={styles.intro}>
        <h2>Mapa da Aventura</h2>
        <p>Escolha um destino pra explorar.</p>
      </div>

      <div className={styles.grid}>
        {LOCATIONS.map((location) => (
          <Link key={location.to} to={location.to} className={styles.card}>
            <PixelPanel bordered>
              <span className={styles.cardTitle}>{location.title}</span>
              <p className={styles.cardDescription}>{location.description}</p>
            </PixelPanel>
          </Link>
        ))}
      </div>
    </div>
  )
}
