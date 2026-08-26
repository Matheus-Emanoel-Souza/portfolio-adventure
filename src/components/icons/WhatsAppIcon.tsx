/**
 * Ícone de balão de chat em pixel art (grid 8x8, crispEdges), no mesmo
 * padrão visual do favicon.svg — usado no canal de WhatsApp do Contato.
 */
export function WhatsAppIcon({ className }: { className?: string }) {
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
        <rect x="1" y="2" width="1" height="1" />
        <rect x="6" y="2" width="1" height="1" />
        <rect x="1" y="3" width="1" height="1" />
        <rect x="6" y="3" width="1" height="1" />
        <rect x="1" y="4" width="1" height="1" />
        <rect x="6" y="4" width="1" height="1" />
        <rect x="1" y="5" width="6" height="1" />
        <rect x="1" y="6" width="2" height="1" />
      </g>
    </svg>
  )
}
