import { careerEvents } from '@/data/career'
import { CareerGraph as CareerGraphView } from '@/features/career-graph/CareerGraph'
import { useMarkSectionVisited } from '@/features/game-progress/useMarkSectionVisited'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'

export default function CareerGraph() {
  useDocumentTitle('Career Graph')
  useMarkSectionVisited('career')

  return <CareerGraphView events={careerEvents} />
}
