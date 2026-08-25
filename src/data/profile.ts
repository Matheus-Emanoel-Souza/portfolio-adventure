import type { Profile } from '@/types'

/**
 * Dados reais confirmados: nome, handle, headline, bio, GitHub, LinkedIn e
 * e-mail. Localização e alguns Player Stats seguem em aberto — nunca
 * inventar aqui. Enquanto vazio, a UI mostra estado "a preencher".
 */
export const profile: Profile = {
  name: 'Matheus Emanoel Souza',
  handle: 'MATHEUS.DEV',
  role: 'Desenvolvedor em Formação | Engenharia da Computação',
  tagline: 'Da mecânica industrial pro código — hoje construindo a ponte entre os dois.',
  bio: 'Comecei no chão de fábrica, mexendo com mecânica industrial — entender como as coisas funcionam por dentro sempre me atraiu. Migrei pra Engenharia da Computação buscando essa mesma lógica, só que aplicada a software, e hoje é isso que mais me empolga: pegar um problema real (às vezes um problema que já vi de perto na indústria) e resolver com código. Meu foco agora é unir as duas bagagens — mecânica e tecnologia — em projetos que conectem automação, dados e sistemas.',
  // TODO: cidade/país, se quiser exibir.
  location: undefined,
  stats: [
    { label: 'Formação', value: 'Mecânica Industrial → Engenharia da Computação' },
    { label: 'Foco atual', value: 'Desenvolvimento de software' },
    { label: 'Diferencial', value: 'Ponte entre indústria e tecnologia' },
  ],
  social: {
    github: 'https://github.com/Matheus-Emanoel-Souza',
    linkedin: 'https://www.linkedin.com/in/matheus-emanoel-821241184',
    email: 'matheusemanoelgomessouza@gmail.com',
  },
}
