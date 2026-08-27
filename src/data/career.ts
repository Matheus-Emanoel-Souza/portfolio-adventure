import type { CareerEvent } from '@/types'

/**
 * Trajetória real — cada entrada é um "commit" no Career Graph
 * (src/features/career-graph). `branch` separa profissional (`career`), de
 * formação acadêmica formal e longa (`education`) e de cursos/treinamentos/
 * certificações menores (`courses`); `sortDate` ("YYYY-MM") é só pra ordenar
 * no eixo temporal compartilhado entre as três branches — o texto exibido é
 * sempre `period`, como já escrito abaixo. Nunca inventar entradas aqui.
 *
 * Curso individual (branch `courses`, quando for relevante o bastante pra
 * ter commit próprio):
 * { id: 'curso-x', branch: 'courses', commitType: 'course', title: 'Nome do curso',
 *   organization: 'Plataforma/Instituição', sortDate: 'YYYY-MM', period: '...',
 *   description: '...' }
 *
 * Trilha agrupada (vários cursos pequenos relacionados num único commit, pra
 * não poluir o graph): mesma forma acima + `items: ['Curso 1', 'Curso 2', ...]`.
 *
 * Evento de duração longa cujo `sortDate` aponta pro fim (ordenar pela
 * conclusão) mas cujo início real também importa mostrar: some `startSortDate:
 * 'YYYY-MM'` — o Career Graph acrescenta um marcador de início nesse ano, sem
 * precisar de outro commit. Evento em andamento (`current: true`) já ganha
 * sozinho um marcador "atual" no ano vigente quando `sortDate` ficou pra trás
 * — não precisa de campo extra pra isso.
 *
 * Nenhum evento de `courses` foi adicionado ainda — a branch existe na
 * arquitetura (tipos, cores, filtro, legenda), pronta pra receber cursos
 * reais quando você quiser cadastrar.
 */
export const careerEvents: CareerEvent[] = [
  {
    id: 'ucl',
    branch: 'education',
    commitType: 'feat',
    title: 'Engenharia da Computação',
    organization: 'UCL',
    // sortDate = presente (não 2021, quando começou) de propósito: cursado
    // em paralelo aos estágios, o commit fica no topo — junto do estágio
    // atual — pra deixar visível que os dois aconteceram ao mesmo tempo.
    sortDate: '2026-01',
    period: '2021 — atual · 9º período em 2026',
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
    description:
      'Desenvolvimento de melhorias e implementações para o ERP Sankhya, voltado ao ramo de medicamentos.',
  },
  {
    id: 'ogmo-es',
    branch: 'career',
    commitType: 'feat',
    title: 'Estagiário de TI',
    organization: 'OGMO-ES',
    sortDate: '2023-11',
    period: 'Novembro de 2023 — Novembro de 2024',
    description:
      'Manutenção preventiva e corretiva de hardware, instalação e configuração de software, suporte técnico via Service Desk e apoio no desenvolvimento e manutenção de sistemas internos.',
  },
  {
    id: 'fibrasa',
    branch: 'career',
    commitType: 'feat',
    title: 'Estagiário de Engenharia de Processos',
    organization: 'FIBRASA S.A.',
    sortDate: '2022-06',
    period: 'Junho de 2022 — Junho de 2023',
    description:
      'Procedimentos operacionais, monitoramento de indicadores de desempenho e apoio em auditorias de conformidade (ISO 22000, TPM) na área industrial.',
  },
  {
    id: 'technipfmc',
    branch: 'career',
    commitType: 'init',
    title: 'Jovem Aprendiz em Mecânica Industrial',
    organization: 'TechnipFMC',
    sortDate: '2019-02',
    period: 'Fevereiro de 2019 — Dezembro de 2023',
    description:
      'Formação técnica em Mecânica Industrial, com base em hidráulica, desenho técnico e manutenção industrial — o ponto de partida da minha trajetória profissional.',
  },
  {
    id: 'senai-civit',
    branch: 'education',
    commitType: 'init',
    title: 'Curso Técnico em Mecânica Industrial',
    organization: 'SENAI CIVIT-ES',
    // sortDate = 2021, ano em que o curso terminou; startSortDate = 2019,
    // início real — o Career Graph acrescenta um marcador visual nesse ano.
    sortDate: '2021-01',
    startSortDate: '2019-01',
    period: '2019 — 2021',
    description: 'Formação técnica em Mecânica Industrial — base pra tudo que veio depois.',
  },
]
