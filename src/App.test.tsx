import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it } from 'vitest'
import App from './App'

// Cada página é um chunk lazy — dar mais margem que o timeout padrão do
// findBy (1000ms) evita flakiness em máquinas/CI mais lentas.
const LAZY_TIMEOUT = { timeout: 5000 }

describe('App', () => {
  // HashRouter lê de window.location de verdade — sem isso, o hash deixado
  // por um teste vaza pro próximo.
  beforeEach(() => {
    window.location.hash = ''
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
})
