import { Link } from 'react-router-dom'
import { PixelButton } from '@/components/PixelButton/PixelButton'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { useLanguage } from '@/i18n/useLanguage'

export default function NotFound() {
  useDocumentTitle('404')
  const { t } = useLanguage()

  return (
    <div style={{ textAlign: 'center', padding: '4rem 1rem' }}>
      <h1>{t.notFound.title}</h1>
      <p>{t.notFound.message}</p>
      <PixelButton as={Link} to="/" variant="primary">
        {t.notFound.backHome}
      </PixelButton>
    </div>
  )
}
