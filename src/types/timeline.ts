export type TimelineType = 'education' | 'experience' | 'project' | 'milestone'

export const TIMELINE_TYPE_LABELS: Record<TimelineType, string> = {
  education: 'Educação',
  experience: 'Experiência',
  project: 'Projeto',
  milestone: 'Marco',
}

export interface TimelineEntry {
  id: string
  type: TimelineType
  title: string
  organization?: string
  /** Texto livre, ex. "2023 — atual". */
  period: string
  description: string
}
