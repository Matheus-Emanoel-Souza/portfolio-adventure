import { motion } from 'framer-motion'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { BRANCH_META, BRANCH_ORDER, GRAPH_LAYOUT } from './careerGraph.config'
import type { BranchLane, BranchFilter } from './careerGraph.types'

interface CareerGraphPathsProps {
  lanes: BranchLane[]
  filter: BranchFilter
}

/** Decorativo — o conteúdo real (branch/período/etc.) já existe como texto em `CareerGraphRow`. */
export function CareerGraphPaths({ lanes, filter }: CareerGraphPathsProps) {
  const reducedMotion = useReducedMotion()
  const { rowHeight, laneWidth, gutterWidth } = GRAPH_LAYOUT
  const width = gutterWidth + laneWidth * BRANCH_ORDER.length
  const maxBottomRow = Math.max(0, ...lanes.map((lane) => lane.bottomRow))
  const height = rowHeight * (maxBottomRow + 1)

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      aria-hidden="true"
      style={{ position: 'absolute', top: 0, left: 0, overflow: 'visible' }}
    >
      {lanes.map((lane) => {
        const laneIndex = BRANCH_ORDER.indexOf(lane.branch)
        const x = gutterWidth + laneWidth * laneIndex + laneWidth / 2
        const yTop = rowHeight * lane.topRow + rowHeight / 2
        const yBottom = rowHeight * lane.bottomRow + rowHeight / 2
        const dimmed = filter !== 'all' && filter !== lane.branch
        const d = `M ${x} ${yTop} L ${x} ${yBottom}`

        return (
          <motion.path
            key={lane.branch}
            d={d}
            fill="none"
            stroke={BRANCH_META[lane.branch].colorVar}
            strokeWidth={2.5}
            strokeLinecap="round"
            opacity={dimmed ? 0.25 : 1}
            initial={reducedMotion ? false : { pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          />
        )
      })}
    </svg>
  )
}
