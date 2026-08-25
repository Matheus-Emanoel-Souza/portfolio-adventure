import type { TimelineEntry } from '@/types'

/** Trajetória real, mais recente primeiro. */
export const timeline: TimelineEntry[] = [
  {
    id: 'ucl',
    type: 'education',
    title: 'Engenharia da Computação',
    organization: 'UCL',
    period: '9º período — 2026',
    description: 'Graduação em andamento.',
  },
  {
    id: 'oncovit',
    type: 'experience',
    title: 'Estagiário de TI',
    organization: 'Oncovit',
    period: 'Julho de 2025 — atual',
    description:
      'Desenvolvimento de melhorias e implementações para o ERP Sankhya, voltado ao ramo de medicamentos.',
  },
  {
    id: 'ogmo-es',
    type: 'experience',
    title: 'Estagiário de TI',
    organization: 'OGMO-ES',
    period: 'Novembro de 2023 — Novembro de 2024',
    description:
      'Manutenção preventiva e corretiva de hardware, instalação e configuração de software, suporte técnico via Service Desk e apoio no desenvolvimento e manutenção de sistemas internos.',
  },
  {
    id: 'fibrasa',
    type: 'experience',
    title: 'Estagiário de Engenharia de Processos',
    organization: 'FIBRASA S.A.',
    period: 'Junho de 2022 — Junho de 2023',
    description:
      'Procedimentos operacionais, monitoramento de indicadores de desempenho e apoio em auditorias de conformidade (ISO 22000, TPM) na área industrial.',
  },
  {
    id: 'technipfmc',
    type: 'experience',
    title: 'Jovem Aprendiz em Mecânica Industrial',
    organization: 'TechnipFMC',
    period: 'Fevereiro de 2019 — Dezembro de 2023',
    description:
      'Formação técnica em Mecânica Industrial, com base em hidráulica, desenho técnico e manutenção industrial — o ponto de partida da minha trajetória profissional.',
  },
]
