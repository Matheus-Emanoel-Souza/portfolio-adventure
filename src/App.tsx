import { HashRouter } from 'react-router-dom'
import { SkipLink } from '@/components/SkipLink'
import { GameProgressProvider } from '@/features/game-progress/GameProgressContext'
import { LanguageProvider } from '@/i18n/LanguageContext'
import { AppRoutes } from '@/routes'

/**
 * HashRouter (não BrowserRouter): GitHub Pages não faz rewrite de servidor,
 * então refresh numa rota como /adventure/projects quebraria com histórico
 * normal. Com hash (#/adventure/projects) o navegador sempre serve
 * index.html e o roteamento fica 100% client-side.
 */
export default function App() {
  return (
    <HashRouter>
      <LanguageProvider>
        <GameProgressProvider>
          <SkipLink />
          <AppRoutes />
        </GameProgressProvider>
      </LanguageProvider>
    </HashRouter>
  )
}
