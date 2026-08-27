import { describe, expect, it } from 'vitest'
import { careerEvents } from '@/data/career'
import type { CareerEvent } from '@/types'
import {
  buildBranchLanes,
  buildYearGutter,
  findHeadEvent,
  layoutCareerEvents,
  resolveRootEventId,
  shortHash,
  withTimelineMarkers,
} from './careerGraph.utils'

const events: CareerEvent[] = [
  {
    id: 'ucl',
    branch: 'education',
    commitType: 'feat',
    title: 'Engenharia da Computação',
    organization: 'UCL',
    sortDate: '2026-01',
    period: '9º período — 2026',
    current: true,
    description: 'Graduação em andamento.',
  },
  {
    id: 'oncovit',
    branch: 'career',
    commitType: 'refactor',
    title: 'Estagiário de TI',
    organization: 'Oncovit',
    sortDate: '2025-07',
    period: 'Julho de 2025 — atual',
    current: true,
    description: 'ERP Sankhya.',
  },
  {
    id: 'react-track',
    branch: 'courses',
    commitType: 'course',
    title: 'Trilha React',
    organization: 'Plataforma X',
    sortDate: '2024-01',
    period: '2024',
    description: 'Trilha de cursos curtos sobre React.',
    items: ['React Fundamentals', 'React Hooks'],
  },
  {
    id: 'fibrasa',
    branch: 'career',
    commitType: 'feat',
    title: 'Estagiário de Engenharia de Processos',
    organization: 'FIBRASA S.A.',
    sortDate: '2022-06',
    period: 'Junho de 2022 — Junho de 2023',
    description: 'Procedimentos operacionais.',
  },
]

describe('layoutCareerEvents', () => {
  it('orders events most recent first, across all three branches', () => {
    const layouted = layoutCareerEvents(events)
    expect(layouted.map((event) => event.id)).toEqual(['ucl', 'oncovit', 'react-track', 'fibrasa'])
  })

  it('assigns a monotonically increasing row starting at 0', () => {
    const layouted = layoutCareerEvents(events)
    expect(layouted.map((event) => event.row)).toEqual([0, 1, 2, 3])
  })

  it('keeps a grouped track event with its `items` intact', () => {
    const layouted = layoutCareerEvents(events)
    const track = layouted.find((event) => event.id === 'react-track')
    expect(track?.items).toEqual(['React Fundamentals', 'React Hooks'])
  })

  it('attaches a deterministic hash to every event', () => {
    const first = layoutCareerEvents(events)
    const second = layoutCareerEvents(events)
    expect(first.map((e) => e.hash)).toEqual(second.map((e) => e.hash))
  })
})

describe('shortHash', () => {
  it('is deterministic for the same id', () => {
    expect(shortHash('oncovit')).toBe(shortHash('oncovit'))
  })

  it('differs across different ids', () => {
    expect(shortHash('oncovit')).not.toBe(shortHash('fibrasa'))
  })

  it('never relies on randomness (same hash across repeated calls)', () => {
    const hashes = new Set(Array.from({ length: 5 }, () => shortHash('ucl')))
    expect(hashes.size).toBe(1)
  })
})

describe('buildBranchLanes', () => {
  it('computes the top/bottom row span per branch, including courses', () => {
    const lanes = buildBranchLanes(layoutCareerEvents(events))
    const career = lanes.find((lane) => lane.branch === 'career')
    const education = lanes.find((lane) => lane.branch === 'education')
    const courses = lanes.find((lane) => lane.branch === 'courses')

    expect(career).toEqual({ branch: 'career', topRow: 1, bottomRow: 3 })
    expect(education).toEqual({ branch: 'education', topRow: 0, bottomRow: 0 })
    expect(courses).toEqual({ branch: 'courses', topRow: 2, bottomRow: 2 })
  })
})

describe('buildYearGutter', () => {
  it('labels only the first row of each year', () => {
    const gutter = buildYearGutter(layoutCareerEvents(events))
    expect(Object.fromEntries(gutter)).toEqual({ 0: 2026, 1: 2025, 2: 2024, 3: 2022 })
  })
})

describe('findHeadEvent', () => {
  it('finds the current event on the career branch', () => {
    expect(findHeadEvent(events)?.id).toBe('oncovit')
  })

  it('returns undefined when no career event is current', () => {
    const noCurrent = events.map((event) => ({ ...event, current: false }))
    expect(findHeadEvent(noCurrent)).toBeUndefined()
  })
})

describe('withTimelineMarkers', () => {
  // "now" fixo — o mecanismo lê o relógio real em produção (CareerGraph
  // passa `now` opcional só pra teste), então fixar aqui evita teste frágil
  // que muda de resultado dependendo do dia em que rodar.
  const now = new Date('2026-06-15')

  it('adds a "current" marker for an ongoing event whose sortDate year is behind "now"', () => {
    const layouted = withTimelineMarkers(layoutCareerEvents(events), now)
    const marker = layouted.find((event) => event.id === 'oncovit::current')

    expect(marker).toBeDefined()
    expect(marker?.marker).toBe('current')
    expect(marker?.sourceEventId).toBe('oncovit')
    expect(marker?.branch).toBe('career')
    expect(marker?.sortDate).toBe('2026-06')
  })

  it('does not duplicate a "current" marker when sortDate is already in the "now" year (ucl)', () => {
    const layouted = withTimelineMarkers(layoutCareerEvents(events), now)
    expect(layouted.some((event) => event.id === 'ucl::current')).toBe(false)
  })

  it('keeps every real event untouched — markers are purely additive', () => {
    const layouted = withTimelineMarkers(layoutCareerEvents(events), now)
    for (const event of events) {
      const real = layouted.find((entry) => entry.id === event.id)
      expect(real).toBeDefined()
      expect(real?.marker).toBeUndefined()
      expect(real?.sortDate).toBe(event.sortDate)
    }
  })

  it('orders the "current" marker chronologically among real commits (most recent first)', () => {
    const layouted = withTimelineMarkers(layoutCareerEvents(events), now)
    expect(layouted.map((event) => event.id)).toEqual([
      'oncovit::current',
      'ucl',
      'oncovit',
      'react-track',
      'fibrasa',
    ])
    expect(layouted.map((event) => event.row)).toEqual([0, 1, 2, 3, 4])
  })

  it('adds a "start" marker for a long event whose startSortDate year differs from sortDate', () => {
    const withStart: CareerEvent[] = [
      ...events,
      {
        id: 'senai-civit',
        branch: 'education',
        commitType: 'init',
        title: 'Curso Técnico em Mecânica Industrial',
        organization: 'SENAI CIVIT-ES',
        sortDate: '2021-01',
        startSortDate: '2019-01',
        period: '2019 — 2021',
        description: 'Formação técnica.',
      },
    ]

    const layouted = withTimelineMarkers(layoutCareerEvents(withStart), now)
    const marker = layouted.find((event) => event.id === 'senai-civit::start')

    expect(marker).toBeDefined()
    expect(marker?.marker).toBe('start')
    expect(marker?.sourceEventId).toBe('senai-civit')
    expect(marker?.branch).toBe('education')
    expect(marker?.sortDate).toBe('2019-01')
    // marcador de início estende a lane pra baixo, sem mexer no commit real de 2021.
    const lanes = buildBranchLanes(layouted)
    const education = lanes.find((lane) => lane.branch === 'education')
    expect(education?.bottomRow).toBe(layouted.find((e) => e.id === 'senai-civit::start')?.row)
  })

  it('does not add a "start" marker when startSortDate is the same year as sortDate', () => {
    const sameYear: CareerEvent[] = [
      {
        id: 'short-course',
        branch: 'courses',
        commitType: 'course',
        title: 'Curso curto',
        sortDate: '2024-06',
        startSortDate: '2024-01',
        period: '2024',
        description: 'Curso de um semestre.',
      },
    ]
    const layouted = withTimelineMarkers(layoutCareerEvents(sameYear), now)
    expect(layouted).toHaveLength(1)
  })
})

describe('withTimelineMarkers — real career data (src/data/career.ts)', () => {
  it('gives the ongoing Oncovit internship a "current" marker in the current year (2026)', () => {
    const now = new Date('2026-06-01')
    const layouted = withTimelineMarkers(layoutCareerEvents(careerEvents), now)
    const marker = layouted.find((event) => event.id === 'oncovit::current')

    expect(marker).toBeDefined()
    expect(marker?.branch).toBe('career')
    expect(marker?.sortDate.startsWith('2026')).toBe(true)
  })

  it('gives the SENAI CIVIT-ES technical course a "start" marker in 2019', () => {
    const layouted = withTimelineMarkers(layoutCareerEvents(careerEvents))
    const marker = layouted.find((event) => event.id === 'senai-civit::start')

    expect(marker).toBeDefined()
    expect(marker?.branch).toBe('education')
    expect(marker?.sortDate).toBe('2019-01')
  })
})

describe('resolveRootEventId', () => {
  const now = new Date('2026-06-15')

  it('returns the event\'s own id for a real commit', () => {
    const layouted = withTimelineMarkers(layoutCareerEvents(events), now)
    const real = layouted.find((event) => event.id === 'oncovit')
    expect(real && resolveRootEventId(real)).toBe('oncovit')
  })

  it('returns the source event id for a marker', () => {
    const layouted = withTimelineMarkers(layoutCareerEvents(events), now)
    const marker = layouted.find((event) => event.id === 'oncovit::current')
    expect(marker && resolveRootEventId(marker)).toBe('oncovit')
  })
})
