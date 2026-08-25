import { Link } from 'react-router-dom'
import { PixelButton } from '@/components/PixelButton/PixelButton'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'

export default function NotFound() {
  useDocumentTitle('404')

  return (
    <div style={{ textAlign: 'center', padding: '4rem 1rem' }}>
      <h1>404</h1>
      <p>Essa área do mapa ainda não foi descoberta.</p>
      <PixelButton as={Link} to="/" variant="primary">
        [ VOLTAR AO INÍCIO ]
      </PixelButton>
    </div>
  )
}
