import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { useReducedMotion } from '@/hooks/useReducedMotion'

const variants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
}

/** Envolve cada página com um fade/slide sutil — vira instantâneo com reduced motion. */
export function PageTransition({ children }: { children: ReactNode }) {
  const reducedMotion = useReducedMotion()

  if (reducedMotion) return <>{children}</>

  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={variants}
      transition={{ duration: 0.25, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}
