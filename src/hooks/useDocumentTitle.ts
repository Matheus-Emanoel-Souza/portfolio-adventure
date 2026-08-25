import { useEffect } from 'react'

const SUFFIX = 'MATHEUS.DEV'

/** Atualiza `document.title` por rota sem precisar de uma lib de Head. */
export function useDocumentTitle(title: string) {
  useEffect(() => {
    const previous = document.title
    document.title = title ? `${title} · ${SUFFIX}` : SUFFIX
    return () => {
      document.title = previous
    }
  }, [title])
}
