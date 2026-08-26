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

function renderGraph() {
  return render(
    <LanguageProvider>
      <CareerGraph events={events} />
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
})
