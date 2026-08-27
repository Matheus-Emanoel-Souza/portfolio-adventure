export interface ProfileStat {
  label: string
  value: string
}

export interface SocialLinks {
  github: string
  /** TODO: preencher com a URL real do LinkedIn. */
  linkedin?: string
  email: string
  /** Número de WhatsApp em formato E.164 sem "+" (ex.: 5527995038630). */
  whatsapp?: string
}

export interface Profile {
  name: string
  handle: string
  role: string
  tagline: string
  bio: string
  location?: string
  stats: ProfileStat[]
  social: SocialLinks
  /**
   * URL do currículo em PDF, já com o `base` do Vite aplicado (funciona em
   * dev e em produção sob `/portfolio-adventure/`) — única fonte pro botão
   * de download, usada tanto no Quick Mode quanto no About. Ver
   * `RESUME_FILE_NAME` em `data/profile.ts` pra trocar o arquivo.
   */
  resumeUrl: string
}
