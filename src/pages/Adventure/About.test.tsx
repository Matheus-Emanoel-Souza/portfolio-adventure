import { render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it } from 'vitest'
import { profile, RESUME_FILE_NAME } from '@/data/profile'
import { GameProgressProvider } from '@/features/game-progress/GameProgressContext'
import { LanguageProvider } from '@/i18n/LanguageContext'
import About from './About'

function renderPage() {
  return render(
    <LanguageProvider>
      <GameProgressProvider>
        <About />
      </GameProgressProvider>
    </LanguageProvider>,
  )
}

describe('About', () => {
  beforeEach(() => {
    window.localStorage.clear()
  })

  it('shows a résumé download button pointing at the same profile.resumeUrl as Quick Mode', () => {
    renderPage()
    const link = screen.getByRole('link', { name: /baixar currículo/i })
    expect(link).toHaveAttribute('href', profile.resumeUrl)
    expect(link).toHaveAttribute('download', RESUME_FILE_NAME)
  })

  it('shows the English text when the language is English', () => {
    window.localStorage.setItem('portfolio-adventure:lang', JSON.stringify('en'))
    renderPage()
    expect(screen.getByRole('link', { name: /download cv/i })).toHaveAttribute(
      'href',
      profile.resumeUrl,
    )
  })

  it('still renders name and role (no regression from the new button)', () => {
    renderPage()
    expect(screen.getByRole('heading', { name: profile.name })).toBeInTheDocument()
    expect(screen.getByText(profile.role)).toBeInTheDocument()
  })
})
