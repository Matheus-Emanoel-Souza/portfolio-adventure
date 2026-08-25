import '@testing-library/jest-dom/vitest'
import { vi } from 'vitest'

// jsdom não implementa a Clipboard API — o CopyButton depende dela.
Object.defineProperty(navigator, 'clipboard', {
  value: { writeText: vi.fn().mockResolvedValue(undefined) },
  configurable: true,
})

// jsdom não implementa matchMedia — vários componentes (useReducedMotion,
// XPBar) dependem dele. Mock mínimo o suficiente pros testes.
if (typeof window !== 'undefined' && !window.matchMedia) {
  window.matchMedia = (query: string) =>
    ({
      matches: false,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    }) as unknown as MediaQueryList
}
