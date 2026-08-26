import { describe, expect, it } from 'vitest'
import type { CareerEvent } from '@/types'
import {
  buildBranchLanes,
  buildYearGutter,
  findHeadEvent,
  layoutCareerEvents,
  shortHash,
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
