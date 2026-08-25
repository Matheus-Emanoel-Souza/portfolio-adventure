export type TimelineType = 'education' | 'experience' | 'project' | 'milestone'

// Rótulos por tipo ficam no dicionário de i18n (src/i18n/*.ts).

export interface TimelineEntry {
  id: string
  type: TimelineType
  title: string
  organization?: string
  /** Texto livre, ex. "2023 — atual". */
  period: string
  description: string
}
