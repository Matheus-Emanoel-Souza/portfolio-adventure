import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { beforeEach, describe, expect, it } from 'vitest'
import { profile, RESUME_FILE_NAME } from '@/data/profile'
import { LanguageProvider } from '@/i18n/LanguageContext'
import QuickMode from './QuickMode'

function renderPage() {
  return render(
    <MemoryRouter>
      <LanguageProvider>
        <QuickMode />
      </LanguageProvider>
    </MemoryRouter>,
  )
}

describe('QuickMode', () => {
  beforeEach(() => {
    window.localStorage.clear()
  })

  describe('Currículo', () => {
    it('shows a download button in the Hero, pointing at profile.resumeUrl', () => {
      renderPage()
      const link = screen.getByRole('link', { name: 'Baixar currículo' })
      expect(link).toHaveAttribute('href', profile.resumeUrl)
      expect(link).toHaveAttribute('download', RESUME_FILE_NAME)
    })

    it('shows the English text when the language is English', () => {
      window.localStorage.setItem('portfolio-adventure:lang', JSON.stringify('en'))
      renderPage()
      const link = screen.getByRole('link', { name: 'Download résumé' })
      expect(link).toHaveAttribute('href', profile.resumeUrl)
    })
  })

  describe('Projetos', () => {
    it('renders every project as a panel', () => {
      renderPage()
      expect(screen.getByRole('heading', { name: 'Smart Taskbar', level: 3 })).toBeInTheDocument()
      expect(
        screen.getByRole('heading', { name: 'FaturamentoAnalytics', level: 3 }),
      ).toBeInTheDocument()
      expect(screen.getByRole('heading', { name: 'LearnDeck', level: 3 })).toBeInTheDocument()
      expect(screen.getByRole('heading', { name: 'RadarTorres', level: 3 })).toBeInTheDocument()
    })

    it('navigates with the next/previous arrows, updating disabled state at the edges', async () => {
      const user = userEvent.setup()
      renderPage()

      const prev = screen.getByRole('button', { name: 'Projeto anterior' })
      const next = screen.getByRole('button', { name: 'Próximo projeto' })
      expect(prev).toBeDisabled()
      expect(next).not.toBeDisabled()

      await user.click(next)
      await user.click(next)
      await user.click(next)

      expect(next).toBeDisabled()
      expect(prev).not.toBeDisabled()
    })

    it('updates the position indicator when jumping via a dot', async () => {
      const user = userEvent.setup()
      renderPage()

      const dot = screen.getByRole('button', { name: 'Ir para o projeto: RadarTorres' })
      await user.click(dot)

      expect(dot).toHaveAttribute('aria-current', 'true')
      expect(screen.getByText('04 / 04')).toBeInTheDocument()
      expect(screen.getByRole('button', { name: 'Próximo projeto' })).toBeDisabled()
    })

    it('shows an individual GitHub link for a project that has one', () => {
      renderPage()
      expect(screen.getByRole('link', { name: /GITHUB: Smart Taskbar/i })).toHaveAttribute(
        'href',
        'https://github.com/Matheus-Emanoel-Souza/Smart-Taskbar',
      )
    })

    it('shows the general GitHub CTA below the showcase, pointing at the profile', () => {
      renderPage()
      expect(screen.getByText('Para ver mais projetos, verifique em:')).toBeInTheDocument()
      expect(screen.getByRole('link', { name: 'GITHUB (Abrir em nova aba)' })).toHaveAttribute(
        'href',
        'https://github.com/Matheus-Emanoel-Souza',
      )
    })
  })

  describe('Trajetória', () => {
    it('shows career (professional) experiences, not education, as timeline points', () => {
      renderPage()
      expect(
        screen.getByRole('button', { name: /Ver detalhes da experiência.*Oncovit/is }),
      ).toBeInTheDocument()
      expect(
        screen.getByRole('button', { name: /Ver detalhes da experiência.*FIBRASA/is }),
      ).toBeInTheDocument()
      // UCL (education) não vira ponto principal da timeline — some numa lista secundária.
      expect(
        screen.queryByRole('button', { name: /Ver detalhes da experiência.*UCL/is }),
      ).not.toBeInTheDocument()
    })

    it('orders experiences oldest to newest, left to right', () => {
      renderPage()
      const names = screen
        .getAllByRole('button', { name: /Ver detalhes da experiência/i })
        .map((button) => button.getAttribute('aria-label') ?? '')

      const indexOf = (needle: string) => names.findIndex((name) => name.includes(needle))
      expect(indexOf('TechnipFMC')).toBeGreaterThanOrEqual(0)
      expect(indexOf('TechnipFMC')).toBeLessThan(indexOf('FIBRASA'))
      expect(indexOf('FIBRASA')).toBeLessThan(indexOf('OGMO-ES'))
      expect(indexOf('OGMO-ES')).toBeLessThan(indexOf('Oncovit'))
    })

    it('always shows exactly one HEAD point for the ongoing experience', () => {
      renderPage()
      const headPoints = screen.getAllByRole('button', { name: /Ver detalhes da experiência: HEAD/ })
      expect(headPoints).toHaveLength(1)
    })

    it('selecting an experience shows its details', async () => {
      const user = userEvent.setup()
      renderPage()

      const fibrasaPoint = screen.getByRole('button', {
        name: /Ver detalhes da experiência.*FIBRASA/is,
      })
      await user.click(fibrasaPoint)

      expect(screen.getByText(/Estagiário de Engenharia de Processos/)).toBeInTheDocument()
      expect(screen.getByText(/Procedimentos operacionais/)).toBeInTheDocument()
    })
  })

  describe('Contato', () => {
    it('shows Email, LinkedIn and WhatsApp', () => {
      renderPage()
      expect(screen.getByRole('link', { name: /Enviar e-mail para/i })).toBeInTheDocument()
      expect(screen.getByRole('link', { name: /LINKEDIN/i })).toBeInTheDocument()
      expect(screen.getByRole('link', { name: /WHATSAPP/i })).toBeInTheDocument()
    })

    it('does not show GitHub in the contact section', () => {
      renderPage()
      const contactHeading = screen.getByRole('heading', { name: 'Contato' })
      const section = contactHeading.closest('section')
      expect(section).not.toBeNull()
      expect(within(section!).queryByRole('link', { name: /github/i })).not.toBeInTheDocument()
    })

    it('links point to the correct destinations', () => {
      renderPage()
      expect(screen.getByRole('link', { name: /Enviar e-mail para/i })).toHaveAttribute(
        'href',
        'mailto:matheusemanoelgomessouza@gmail.com',
      )
      expect(screen.getByRole('link', { name: /LINKEDIN/i })).toHaveAttribute(
        'href',
        'https://www.linkedin.com/in/matheus-emanoel-821241184',
      )
      expect(screen.getByRole('link', { name: /WHATSAPP/i })).toHaveAttribute(
        'href',
        expect.stringContaining('https://wa.me/5527995038630'),
      )
    })
  })
})
