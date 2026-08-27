/**
 * Glifo "in" em pixel art (grid 8x8, crispEdges) — mesmo padrão visual do
 * WhatsAppIcon, usado no canal de LinkedIn do Contato (Quick Mode). Não
 * reproduz o logo oficial, só uma marca monocromática abstrata.
 */
export function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 8 8"
      shapeRendering="crispEdges"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <g fill="currentColor">
        {/* i */}
        <rect x="1" y="1" width="1" height="1" />
        <rect x="1" y="3" width="1" height="4" />
        {/* n */}
        <rect x="3" y="3" width="1" height="4" />
        <rect x="3" y="3" width="4" height="1" />
        <rect x="6" y="3" width="1" height="4" />
      </g>
    </svg>
  )
}
