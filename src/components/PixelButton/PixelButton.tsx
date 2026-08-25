import type { ElementType, ComponentPropsWithoutRef, ReactNode } from 'react'
import styles from './PixelButton.module.css'

type Variant = 'primary' | 'secondary' | 'ghost'

interface OwnProps {
  variant?: Variant
  children: ReactNode
}

type PixelButtonProps<T extends ElementType> = OwnProps & {
  as?: T
} & Omit<ComponentPropsWithoutRef<T>, keyof OwnProps | 'as'>

/**
 * Botão com identidade pixel art. Polimórfico via `as` (ex.: `as={Link}` do
 * react-router) pra continuar semanticamente correto quando navega em vez de
 * executar uma ação — importante pra leitores de tela e SEO.
 */
export function PixelButton<T extends ElementType = 'button'>({
  as,
  variant = 'secondary',
  className,
  children,
  ...rest
}: PixelButtonProps<T>) {
  const Component = as || 'button'
  const variantClass = variant === 'primary' ? styles.primary : variant === 'ghost' ? styles.ghost : ''

  return (
    <Component
      className={[styles.button, variantClass, className].filter(Boolean).join(' ')}
      {...rest}
    >
      {children}
    </Component>
  )
}
