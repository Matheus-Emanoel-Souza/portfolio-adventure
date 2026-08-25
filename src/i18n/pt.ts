import type { Dictionary } from './types'

export const pt: Dictionary = {
  skipLink: 'Pular para o conteúdo',
  languageSwitcher: { label: 'Idioma' },
  common: {
    loading: 'CARREGANDO...',
    copy: 'COPIAR',
    copied: 'COPIADO!',
    send: 'ENVIAR',
    open: 'ABRIR',
    viewProject: 'VER PROJETO',
    github: 'GITHUB',
    problem: 'Problema',
    solution: 'Solução',
    technologies: 'Tecnologias',
    screenshotOf: 'Screenshot de',
  },
  nav: {
    ariaLabel: 'Navegação da aventura',
    map: 'MAPA',
    character: 'PERSONAGEM',
    quests: 'QUESTS',
    skillTree: 'SKILL TREE',
    achievements: 'CONQUISTAS',
    questLog: 'QUEST LOG',
    contact: 'CONTATO',
  },
  hud: { sectionsExplored: 'SEÇÕES EXPLORADAS' },
  home: {
    startAdventure: '[ INICIAR AVENTURA ]',
    quickMode: '[ QUICK MODE ]',
    hint: 'Quick Mode: versão tradicional e rápida, direto ao ponto.',
  },
  quickMode: {
    viewAdventure: 'Ver modo aventura →',
    skillsHeading: 'Skills',
    projectsHeading: 'Projetos',
    contactHeading: 'Contato',
    projectsEmptyTitle: 'Projetos em breve',
    projectsEmptyDescription: 'Lista completa em src/data/projects.ts.',
  },
  adventureMap: {
    title: 'Mapa da Aventura',
    subtitle: 'Escolha um destino pra explorar.',
    locations: {
      about: { title: 'PERSONAGEM', description: 'Character Card e Player Stats.' },
      projects: {
        title: 'QUESTS',
        description: 'Projetos, tratados como missões concluídas ou em andamento.',
      },
      skills: {
        title: 'SKILL TREE',
        description:
          'Tecnologias por área — clique numa skill pra ver os projetos ligados a ela.',
      },
      achievements: {
        title: 'CONQUISTAS',
        description: 'Achievements desbloqueados a partir do progresso real.',
      },
      questLog: {
        title: 'QUEST LOG',
        description: 'Trajetória acadêmica e profissional em ordem cronológica.',
      },
      contact: {
        title: 'CONTATO',
        description: 'Communication Center — GitHub, LinkedIn e e-mail.',
      },
    },
  },
  about: {
    playerStats: 'Player Stats',
    bioEmptyTitle: 'Bio a preencher',
    bioEmptyDescription: 'Adicione uma bio real em src/data/profile.ts.',
    statsEmptyTitle: 'Stats a preencher',
    statsEmptyDescription: 'Adicione Player Stats reais em src/data/profile.ts.',
  },
  projects: {
    heading: 'Quests',
    subtitle: 'Projetos, tratados como missões.',
    emptyTitle: 'Nenhuma quest cadastrada ainda',
    emptyDescription:
      'Os projetos aparecem aqui assim que forem adicionados em src/data/projects.ts.',
  },
  skillTree: {
    heading: 'Skill Tree',
    subtitle: 'Selecione uma skill pra ver em quais projetos ela foi usada.',
    constructionNote: 'Em construção — a preencher.',
    emptyProjectsTitle: 'Nenhum projeto vinculado ainda',
    emptyProjectsDescription: 'Associe projetos a esta skill via skillIds em src/data/projects.ts.',
  },
  achievements: {
    heading: 'Conquistas',
    unlockedOf: 'desbloqueadas',
    explanation:
      'desbloqueio é sempre baseado em dado real (projetos, skills, trajetória), nunca simulado.',
    unlockedLabel: 'DESBLOQUEADA',
    lockedLabel: 'BLOQUEADA',
  },
  questLog: {
    heading: 'Quest Log',
    subtitle: 'Trajetória acadêmica, profissional e marcos relevantes.',
    emptyTitle: 'Quest Log vazio por enquanto',
    emptyDescription: 'A trajetória aparece aqui assim que for adicionada em src/data/timeline.ts.',
  },
  contact: {
    heading: 'Contato',
    subtitle: 'Communication Center — canais diretos.',
    terminalHeader: '>> TRANSMISSÃO ABERTA_',
    githubLabel: 'GITHUB',
    emailLabel: 'E-MAIL',
    linkedinLabel: 'LINKEDIN',
    linkedinEmptyNote: 'A preencher em src/data/profile.ts',
    openAria: 'Abrir em nova aba',
    sendAria: 'Enviar e-mail para',
    copyEmailAria: 'Copiar e-mail',
    copyEmailCopiedAria: 'E-mail copiado',
  },
  notFound: {
    title: '404',
    message: 'Essa área do mapa ainda não foi descoberta.',
    backHome: '[ VOLTAR AO INÍCIO ]',
  },
  projectStatus: {
    completed: 'QUEST COMPLETED',
    'in-progress': 'QUEST IN PROGRESS',
    planned: 'QUEST PLANNED',
  },
  skillCategory: {
    frontend: 'Frontend',
    backend: 'Backend',
    database: 'Banco de Dados',
    devops: 'DevOps',
    tools: 'Ferramentas',
    architecture: 'Arquitetura',
  },
  timelineType: {
    education: 'Educação',
    experience: 'Experiência',
    project: 'Projeto',
    milestone: 'Marco',
  },
}
