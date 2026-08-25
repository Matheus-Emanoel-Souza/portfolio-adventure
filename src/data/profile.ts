import type { Profile } from '@/types'

/**
 * Dados reais confirmados: nome, handle, e-mail e GitHub.
 * TODO: preencher bio, localização, stats e LinkedIn com informação real —
 * nunca inventar aqui. Enquanto vazio, a UI mostra estado "a preencher".
 */
export const profile: Profile = {
  name: 'Matheus Emanoel Souza',
  handle: 'MATHEUS.DEV',
  role: 'Software Developer',
  tagline: 'Uma pequena aventura pelo meu trabalho como desenvolvedor.',
  // TODO: escrever bio real (2-4 frases sobre trajetória, foco e interesses).
  bio: '',
  // TODO: cidade/país, se quiser exibir.
  location: undefined,
  // TODO: Player Stats reais (ex.: "Foco", "Stack principal", "Formação").
  stats: [],
  social: {
    github: 'https://github.com/Matheus-Emanoel-Souza',
    // TODO: adicionar URL do LinkedIn.
    linkedin: undefined,
    email: 'matheusemanoel@ucl.br',
  },
}
