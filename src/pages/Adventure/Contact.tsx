import { PixelButton } from '@/components/PixelButton/PixelButton'
import { PixelPanel } from '@/components/PixelPanel/PixelPanel'
import { profile } from '@/data/profile'
import { useMarkSectionVisited } from '@/features/game-progress/useMarkSectionVisited'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import styles from './Contact.module.css'

export default function Contact() {
  useDocumentTitle('Contato')
  useMarkSectionVisited('contact')

  return (
    <div>
      <h2>Contato</h2>
      <p>Communication Center — canais diretos.</p>

      <PixelPanel bordered className={styles.terminal}>
        <p className={styles.terminalHeader}>&gt;&gt; TRANSMISSÃO ABERTA_</p>

        <div className={styles.channels}>
          <div className={styles.channel}>
            <div className={styles.channelLabel}>
              <span className={styles.channelName}>GITHUB</span>
              <span className={styles.channelValue}>{profile.social.github}</span>
            </div>
            <PixelButton
              as="a"
              href={profile.social.github}
              target="_blank"
              rel="noreferrer"
              aria-label="Abrir perfil do GitHub em nova aba"
            >
              ABRIR
            </PixelButton>
          </div>

          <div className={styles.channel}>
            <div className={styles.channelLabel}>
              <span className={styles.channelName}>E-MAIL</span>
              <span className={styles.channelValue}>{profile.social.email}</span>
            </div>
            <PixelButton
              as="a"
              href={`mailto:${profile.social.email}`}
              aria-label={`Enviar e-mail para ${profile.social.email}`}
            >
              ENVIAR
            </PixelButton>
          </div>

          <div className={styles.channel}>
            <div className={styles.channelLabel}>
              <span className={styles.channelName}>LINKEDIN</span>
              <span className={styles.channelValue}>
                {profile.social.linkedin ?? 'A preencher em src/data/profile.ts'}
              </span>
            </div>
            {profile.social.linkedin && (
              <PixelButton
                as="a"
                href={profile.social.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="Abrir perfil do LinkedIn em nova aba"
              >
                ABRIR
              </PixelButton>
            )}
          </div>
        </div>
      </PixelPanel>
    </div>
  )
}
