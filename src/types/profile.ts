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
}
