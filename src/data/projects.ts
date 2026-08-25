import type { Project } from '@/types'

/**
 * Quests reais, puxadas do GitHub (Matheus-Emanoel-Souza). Descrição,
 * problema/solução e status vêm do README de cada repo — nada inventado.
 *
 * Pendente: invaders-engine — ainda privado/não encontrado como repositório
 * público. Entra assim que existir/for confirmado.
 */
export const projects: Project[] = [
  {
    id: 'smart-taskbar',
    name: 'Smart Taskbar',
    status: 'in-progress',
    description:
      'Barra de tarefas inteligente pra Windows: agrupa janelas por contexto de uso (Trabalho, Desenvolvimento, Internet...), não só por aplicativo.',
    problem:
      'A barra de tarefas nativa do Windows agrupa por processo. Com dezenas de janelas abertas — várias abas do Chrome com propósitos diferentes, múltiplas instâncias do VS Code, terminais — fica difícil achar a janela certa rápido.',
    solution:
      'App portátil (sem instalador, sem privilégios de admin) que deixa o usuário definir contextos e regras, classificando cada janela por processo e por título. Arquitetura em camadas: um Core sem dependência de Windows/WPF, testável isoladamente, e eventos nativos do Win32 em vez de polling.',
    skillIds: ['csharp', 'dotnet'],
    links: { github: 'https://github.com/Matheus-Emanoel-Souza/Smart-Taskbar' },
    isPublicRepo: true,
  },
  {
    id: 'faturamento-analytics',
    name: 'FaturamentoAnalytics',
    status: 'in-progress',
    description:
      'Controle financeiro pessoal que roda no navegador e instala como app no celular — sem cadastro, sem servidor, sem backend.',
    problem:
      'Fork de um app de finanças pessoais (projeto original de @lucasmarx10) que já usava no dia a dia — sentia falta de categorização, análise de gastos e importação/exportação mais robusta.',
    solution:
      'Evolução pontual do projeto original, preservando a filosofia (HTML/CSS/JS puro, sem dependências, dados em localStorage): categorias e flags nos lançamentos, dashboard com gráficos de gastos, backup versionado e import/export em CSV com pré-visualização antes de gravar.',
    skillIds: ['javascript', 'css'],
    links: {
      demo: 'https://matheus-emanoel-souza.github.io/FaturamentoAnalyticsWebApp/',
      github: 'https://github.com/Matheus-Emanoel-Souza/FaturamentoAnalyticsWebApp',
    },
    isPublicRepo: true,
  },
  {
    id: 'learndeck',
    name: 'LearnDeck',
    status: 'completed',
    description:
      'App desktop (e também PWA) pra gerenciar estudos com cards, Kanban customizável, Pomodoro e dashboard de progresso.',
    problem:
      'Organizar estudos por assunto, acompanhar quanto tempo é investido em cada um e visualizar a evolução com métricas — tudo local, sem depender de servidor.',
    solution:
      'Quadro Kanban com grupos hierárquicos (ex.: Faculdade > Cálculo > Integrais), colunas customizáveis, cronômetro e Pomodoro configurável, cards relacionáveis entre si (pré-requisitos), anexos, prazos e subtarefas — dados salvos localmente (SQLite).',
    skillIds: ['typescript', 'react', 'electron', 'databases'],
    links: {
      demo: 'https://matheus-emanoel-souza.github.io/LearnDeck/',
      github: 'https://github.com/Matheus-Emanoel-Souza/LearnDeck',
    },
    isPublicRepo: true,
  },
  {
    id: 'radar-torres',
    name: 'RadarTorres',
    status: 'completed',
    description:
      'Sistema de detecção e seleção de torres — TCC em Engenharia da Computação. App desktop em C#/WPF que recebe leituras de sensores via Arduino (serial) e localiza alvos em um radar gráfico.',
    problem:
      'O TCC precisava demonstrar, de ponta a ponta, a localização de alvos ao redor de uma base e a seleção automática da torre demonstrativa mais adequada pra cada um — inclusive sem hardware conectado, pra viabilizar desenvolvimento contínuo e as apresentações.',
    solution:
      'App desktop em C#/WPF que recebe leituras (ângulo + distância) de um Arduino via serial, converte pra posição cartesiana num radar circular de quatro quadrantes, seleciona automaticamente a torre mais próxima/adequada e aciona um indicador demonstrativo (laser de baixa potência, LED ou simulação — nunca armamento real). Tem modo de simulação embutido, funcionando mesmo sem Arduino conectado.',
    skillIds: ['csharp', 'dotnet', 'cpp', 'arduino'],
    links: {
      demo: 'https://github.com/Matheus-Emanoel-Souza/Sistema_Rastreamento_Alvos_Arduino/releases/latest',
      github: 'https://github.com/Matheus-Emanoel-Souza/Sistema_Rastreamento_Alvos_Arduino',
    },
    isPublicRepo: true,
  },
]

export function getProjectsBySkillId(skillId: string): Project[] {
  return projects.filter((project) => project.skillIds.includes(skillId))
}
