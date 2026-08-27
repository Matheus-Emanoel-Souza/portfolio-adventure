/**
 * Ícone de seta pra baixo + bandeja em pixel art (grid 8x8, crispEdges) —
 * mesmo padrão visual do WhatsAppIcon, usado no botão de download do
 * currículo (Quick Mode e About).
 */
export function DownloadIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 8 8"
      shapeRendering="crispEdges"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <g fill="currentColor">
        {/* seta */}
        <rect x="3" y="0" width="2" height="4" />
        <rect x="2" y="3" width="1" height="1" />
        <rect x="5" y="3" width="1" height="1" />
        <rect x="1" y="4" width="1" height="1" />
        <rect x="6" y="4" width="1" height="1" />
        <rect x="3" y="5" width="2" height="1" />
        {/* bandeja */}
        <rect x="1" y="7" width="6" height="1" />
      </g>
    </svg>
  )
}
