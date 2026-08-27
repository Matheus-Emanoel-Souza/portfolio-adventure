import { describe, expect, it } from 'vitest'
import type { CareerEvent } from '@/types'
import { buildCareerTimeline } from './careerTimeline.utils'

const events: CareerEvent[] = [
  {
    id: 'ucl',
    branch: 'education',
    commitType: 'feat',
    title: 'Engenharia da Computação',
    organization: 'UCL',
    sortDate: '2026-01',
    period: '2021 — atual',
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
    id: 'fibrasa',
    branch: 'career',
    commitType: 'feat',
    title: 'Estagiário de Engenharia de Processos',
    organization: 'FIBRASA S.A.',
    sortDate: '2022-06',
    period: 'Junho de 2022 — Junho de 2023',
    description: 'Procedimentos operacionais.',
  },
  {
    id: 'technipfmc',
    branch: 'career',
    commitType: 'init',
    title: 'Jovem Aprendiz em Mecânica Industrial',
    organization: 'TechnipFMC',
    sortDate: '2019-02',
    period: 'Fevereiro de 2019 — Dezembro de 2023',
    description: 'Formação técnica.',
  },
]

describe('buildCareerTimeline', () => {
  const now = new Date('2026-06-15')

  it('only includes the career branch, leaving education out', () => {
    const points = buildCareerTimeline(events, now)
    expect(points.every((point) => point.event.branch === 'career')).toBe(true)
    expect(points.some((point) => point.event.id === 'ucl')).toBe(false)
  })

  it('orders oldest to newest, left to right', () => {
    const points = buildCareerTimeline(events, now)
    expect(points.map((point) => point.event.organization ?? point.event.title)).toEqual([
      'TechnipFMC',
      'FIBRASA S.A.',
      'Oncovit',
      'Oncovit', // marcador "atual" — mesma experiência, ponto HEAD no ano vigente
    ])
  })

  it('positions the oldest point at 0 and the most recent at 1', () => {
    const points = buildCareerTimeline(events, now)
    expect(points[0].position).toBe(0)
    expect(points[points.length - 1].position).toBe(1)
  })

  it('marks the ongoing experience as HEAD via a "now" marker when its commit year is behind', () => {
    const points = buildCareerTimeline(events, now)
    const head = points[points.length - 1]
    expect(head.isHead).toBe(true)
    expect(head.event.id).toBe('oncovit::current')
    expect(head.event.sourceEventId).toBe('oncovit')
    expect(points.filter((point) => point.isHead)).toHaveLength(1)
  })

  it('falls back to the last real commit as HEAD when nothing needs a marker', () => {
    const closeNow = new Date('2025-08-01') // mesmo ano do sortDate do Oncovit — sem marcador
    const points = buildCareerTimeline(events, closeNow)
    expect(points).toHaveLength(3)
    expect(points[points.length - 1].isHead).toBe(true)
    expect(points[points.length - 1].event.id).toBe('oncovit')
  })

  it('shows the year on every point when each falls in a different year', () => {
    const points = buildCareerTimeline(events, now)
    // technipfmc(2019), fibrasa(2022), oncovit(2025), marcador atual(2026) — 4 anos distintos.
    expect(points.map((point) => point.showYear)).toEqual([true, true, true, true])
  })

  it('does not repeat the year label for two points in the same year', () => {
    const sameYearEvents: CareerEvent[] = [
      ...events,
      {
        id: 'extra-2022',
        branch: 'career',
        commitType: 'feat',
        title: 'Curso extra',
        organization: 'X',
        sortDate: '2022-11',
        period: '2022',
        description: 'Evento extra no mesmo ano da FIBRASA, só pra testar o gutter de ano.',
      },
    ]
    const points = buildCareerTimeline(sameYearEvents, now)
    const year2022Points = points.filter((point) => point.event.sortDate.startsWith('2022'))
    expect(year2022Points).toHaveLength(2)
    expect(year2022Points.map((point) => point.showYear)).toEqual([true, false])
  })

  it('returns an empty array when there is no career event', () => {
    const educationOnly = events.filter((event) => event.branch === 'education')
    expect(buildCareerTimeline(educationOnly, now)).toEqual([])
  })
})
