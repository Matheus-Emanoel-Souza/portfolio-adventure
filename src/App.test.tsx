import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it } from 'vitest'
import App from './App'

// Cada página é um chunk lazy — dar mais margem que o timeout padrão do
// findBy (1000ms) evita flakiness em máquinas/CI mais lentas.
const LAZY_TIMEOUT = { timeout: 5000 }

describe('App', () => {
  // HashRouter lê de window.location de verdade, e o idioma/progresso
  // persistem em localStorage — sem resetar os dois, um teste vaza pro
  // próximo.
  beforeEach(() => {
    window.location.hash = ''
    window.localStorage.clear()
  })

  it('renders the Home hero with the main calls to action', async () => {
    render(<App />)

    expect(
      await screen.findByRole('heading', { name: 'MATHEUS.DEV' }, LAZY_TIMEOUT),
    ).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /iniciar aventura/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /quick mode/i })).toBeInTheDocument()
  })

  it('navigates to the Adventure hub', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(await screen.findByRole('link', { name: /iniciar aventura/i }, LAZY_TIMEOUT))

    expect(
      await screen.findByRole('heading', { name: /mapa da aventura/i }, LAZY_TIMEOUT),
    ).toBeInTheDocument()
  })

  it('navigates to Quick Mode', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(await screen.findByRole('link', { name: /quick mode/i }, LAZY_TIMEOUT))

    expect(
      await screen.findByRole('heading', { name: /matheus emanoel souza/i, level: 1 }, LAZY_TIMEOUT),
    ).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /ver modo aventura/i })).toBeInTheDocument()
  })

  it('switches the UI language to English', async () => {
    const user = userEvent.setup()
    render(<App />)

    await screen.findByRole('heading', { name: 'MATHEUS.DEV' }, LAZY_TIMEOUT)
    await user.click(screen.getByRole('button', { name: 'EN' }))

    expect(screen.getByRole('link', { name: '[ START ADVENTURE ]' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: '[ QUICK MODE ]' })).toBeInTheDocument()
  })

  it('copies the e-mail to the clipboard from the Contact section', async () => {
    const user = userEvent.setup()
    window.location.hash = '#/adventure/contact'
    render(<App />)

    const copyButton = await screen.findByRole(
      'button',
      { name: /copiar e-mail/i },
      LAZY_TIMEOUT,
    )
    await user.click(copyButton)

    // A cópia em si passa pela Clipboard API do navegador (userEvent tem seu
    // próprio stub em teste) — o que importa verificar é o feedback visual.
    expect(await screen.findByRole('button', { name: /e-mail copiado/i })).toBeInTheDocument()
  })
})
