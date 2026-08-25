export type Lang = 'pt' | 'en'

/**
 * Formato de todo o texto de interface (não o conteúdo de src/data/*.ts —
 * esse fica como for escrito, numa língua só, por decisão de escopo).
 * `en.ts` é checado contra este tipo, então nenhuma chave pode faltar.
 */
export interface Dictionary {
  skipLink: string
  languageSwitcher: { label: string }
  common: {
    loading: string
    copy: string
    copied: string
    send: string
    open: string
    viewProject: string
    github: string
    problem: string
    solution: string
    technologies: string
    screenshotOf: string
  }
  nav: {
    ariaLabel: string
    map: string
    character: string
    quests: string
    skillTree: string
    achievements: string
    questLog: string
    contact: string
  }
  hud: { sectionsExplored: string }
  home: { startAdventure: string; quickMode: string; hint: string }
  quickMode: {
    viewAdventure: string
    skillsHeading: string
    projectsHeading: string
    contactHeading: string
    projectsEmptyTitle: string
    projectsEmptyDescription: string
  }
  adventureMap: {
    title: string
    subtitle: string
    locations: {
      about: { title: string; description: string }
      projects: { title: string; description: string }
      skills: { title: string; description: string }
      achievements: { title: string; description: string }
      questLog: { title: string; description: string }
      contact: { title: string; description: string }
    }
  }
  about: {
    playerStats: string
    bioEmptyTitle: string
    bioEmptyDescription: string
    statsEmptyTitle: string
    statsEmptyDescription: string
  }
  projects: {
    heading: string
    subtitle: string
    emptyTitle: string
    emptyDescription: string
  }
  skillTree: {
    heading: string
    subtitle: string
    constructionNote: string
    emptyProjectsTitle: string
    emptyProjectsDescription: string
  }
  achievements: {
    heading: string
    unlockedOf: string
    explanation: string
    unlockedLabel: string
    lockedLabel: string
  }
  questLog: {
    heading: string
    subtitle: string
    emptyTitle: string
    emptyDescription: string
  }
  contact: {
    heading: string
    subtitle: string
    terminalHeader: string
    githubLabel: string
    emailLabel: string
    linkedinLabel: string
    linkedinEmptyNote: string
    openAria: string
    sendAria: string
    copyEmailAria: string
    copyEmailCopiedAria: string
  }
  notFound: { title: string; message: string; backHome: string }
  projectStatus: { completed: string; 'in-progress': string; planned: string }
  skillCategory: {
    frontend: string
    backend: string
    database: string
    devops: string
    tools: string
    architecture: string
  }
  timelineType: {
    education: string
    experience: string
    project: string
    milestone: string
  }
}
