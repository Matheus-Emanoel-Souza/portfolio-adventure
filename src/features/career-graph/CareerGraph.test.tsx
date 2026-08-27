import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it } from 'vitest'
import { LanguageProvider } from '@/i18n/LanguageContext'
import type { CareerEvent } from '@/types'
import { CareerGraph } from './CareerGraph'

// Fixture isolada — não usa src/data/career.ts, então esse teste continua
// válido mesmo antes de existir qualquer curso real cadastrado.
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
    id: 'react-track',
    branch: 'courses',
    commitType: 'course',
    title: 'Trilha React',
    organization: 'Plataforma X',
    sortDate: '2024-01',
    period: '2024',
    description: 'Trilha de cursos curtos.',
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

// "now" fixo, anterior a qualquer sortDate em andamento na fixture — nenhum
// evento aqui dispara marcador "atual" com essa data, então os testes abaixo
// (herdados de antes dos marcadores existirem) continuam válidos sem
// depender do relógio real do ambiente de teste.
const NO_MARKERS_NOW = new Date('2025-01-01')

function renderGraph(now: Date = NO_MARKERS_NOW) {
  return render(
    <LanguageProvider>
      <CareerGraph events={events} now={now} />
    </LanguageProvider>,
  )
}

describe('CareerGraph', () => {
  beforeEach(() => {
    window.localStorage.clear()
  })

  it('shows all three branches in the legend and as filters', () => {
    renderGraph()

    expect(screen.getByRole('button', { name: 'CAREER' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'EDUCATION' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'COURSES' })).toBeInTheDocument()
  })

  it('renders a courses commit and lets it be selected', async () => {
    const user = userEvent.setup()
    renderGraph()

    const trackCommit = screen.getByRole('button', { name: /trilha react/i })
    expect(trackCommit).toBeInTheDocument()

    await user.click(trackCommit)

    const detailCard = screen.getByRole('complementary')
    expect(detailCard).toHaveTextContent('Plataforma X')
    expect(detailCard).toHaveTextContent('React Fundamentals')
    expect(detailCard).toHaveTextContent('React Hooks')
  })

  it('keeps the chronological order across all three branches', () => {
    renderGraph()

    const rows = screen.getAllByRole('button', { name: /Ver detalhes do commit/i })
    const titles = rows.map((row) => row.textContent)
    // ucl (2026) > oncovit (2025) > react-track (2024) > fibrasa (2022)
    expect(titles[0]).toMatch(/Engenharia da Computação/)
    expect(titles[1]).toMatch(/Estagiário de TI/)
    expect(titles[2]).toMatch(/Trilha React/)
    expect(titles[3]).toMatch(/Engenharia de Processos/)
  })

  it('toggling the Courses filter keeps other branches in the DOM (dimming, not removal)', async () => {
    const user = userEvent.setup()
    renderGraph()

    const coursesFilter = screen.getByRole('button', { name: 'COURSES' })
    await user.click(coursesFilter)

    expect(coursesFilter).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getByRole('button', { name: /trilha react/i })).toBeInTheDocument()
    // career/education continuam no DOM, só com destaque reduzido via CSS.
    expect(screen.getByRole('button', { name: /engenharia da computação/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /estagiário de ti.*oncovit/is })).toBeInTheDocument()
  })

  it('shows a "current" marker for career when the commit year is behind the current year', async () => {
    const user = userEvent.setup()
    // "now" em 2026: sortDate do Oncovit (2025-07) já ficou pra trás.
    renderGraph(new Date('2026-06-01'))

    const marker = screen.getByRole('button', { name: /ATUAL.*Oncovit|ATUAL.*Estagiário de TI/is })
    expect(marker).toBeInTheDocument()

    await user.click(marker)
    const detailCard = screen.getByRole('complementary')
    expect(detailCard).toHaveTextContent('Oncovit')
  })

  it('does not add a marker for a branch already positioned in the current year (ucl)', () => {
    renderGraph(new Date('2026-06-01'))
    // Só um botão de "Engenharia da Computação" — nenhum marcador extra pra ucl.
    expect(screen.getAllByRole('button', { name: /engenharia da computação/i })).toHaveLength(1)
  })

  it('shows a "start" marker for a long education event whose real start differs from sortDate', async () => {
    const user = userEvent.setup()
    const withEducationStart = [
      ...events,
      {
        id: 'senai-civit',
        branch: 'education' as const,
        commitType: 'init' as const,
        title: 'Curso Técnico em Mecânica Industrial',
        organization: 'SENAI CIVIT-ES',
        sortDate: '2021-01',
        startSortDate: '2019-01',
        period: '2019 — 2021',
        description: 'Formação técnica.',
      },
    ]
    render(
      <LanguageProvider>
        <CareerGraph events={withEducationStart} now={NO_MARKERS_NOW} />
      </LanguageProvider>,
    )

    const marker = screen.getByRole('button', { name: /INÍCIO.*Mecânica Industrial/is })
    expect(marker).toBeInTheDocument()

    await user.click(marker)
    const detailCard = screen.getByRole('complementary')
    expect(detailCard).toHaveTextContent('SENAI CIVIT-ES')
  })

  it('keeps selection and keyboard navigation working across real commits and markers', async () => {
    const user = userEvent.setup()
    renderGraph(new Date('2026-06-01'))

    const marker = screen.getByRole('button', { name: /ATUAL.*Oncovit|ATUAL.*Estagiário de TI/is })
    marker.focus()
    await user.keyboard('{ArrowDown}')
    expect(document.activeElement).not.toBe(marker)
  })
})
