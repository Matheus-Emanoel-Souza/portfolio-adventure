/**
 * Ícone de envelope em pixel art (grid 8x8, crispEdges) — mesmo padrão visual
 * do WhatsAppIcon, usado no canal de e-mail do Contato (Quick Mode).
 */
export function EmailIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 8 8"
      shapeRendering="crispEdges"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <g fill="currentColor">
        <rect x="1" y="1" width="6" height="1" />
        <rect x="1" y="1" width="1" height="5" />
        <rect x="6" y="1" width="1" height="5" />
        <rect x="1" y="5" width="6" height="1" />
        <rect x="2" y="2" width="1" height="1" />
        <rect x="5" y="2" width="1" height="1" />
        <rect x="3" y="3" width="2" height="1" />
      </g>
    </svg>
  )
}
