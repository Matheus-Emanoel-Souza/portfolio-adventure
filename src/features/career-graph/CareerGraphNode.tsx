import { GRAPH_LAYOUT } from './careerGraph.config'
import type { LayoutedCareerEvent } from './careerGraph.types'
import styles from './CareerGraph.module.css'

interface CareerGraphNodeProps {
  event: LayoutedCareerEvent
  laneIndex: number
  colorVar: string
  selected: boolean
  dimmed: boolean
  isHead: boolean
  onSelect: (id: string) => void
}

/**
 * Ponto do commit sobre o track do graph — atalho de clique/toque puramente
 * visual (`aria-hidden`, fora da ordem de Tab). A ação de selecionar já é
 * acessível via a linha de conteúdo (`CareerGraphRow`, um `<button>` real);
 * isto aqui não duplica parada de teclado, só o alvo visual sobre o desenho.
 */
export function CareerGraphNode({
  event,
  laneIndex,
  colorVar,
  selected,
  dimmed,
  isHead,
  onSelect,
}: CareerGraphNodeProps) {
  const { rowHeight, laneWidth, gutterWidth } = GRAPH_LAYOUT
  const x = gutterWidth + laneWidth * laneIndex + laneWidth / 2
  const y = rowHeight * event.row + rowHeight / 2

  return (
    <span
      aria-hidden="true"
      onClick={() => onSelect(event.id)}
      className={[
        styles.node,
        event.marker && styles.nodeMarker,
        selected && styles.nodeSelected,
        isHead && styles.nodeHead,
      ]
        .filter(Boolean)
        .join(' ')}
      style={{
        left: x,
        top: y,
        borderColor: colorVar,
        background: selected ? colorVar : 'var(--color-bg)',
        opacity: dimmed ? 0.35 : 1,
      }}
    />
  )
}
