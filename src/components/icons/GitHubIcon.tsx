/**
 * Glifo "</>" em pixel art (grid 8x8, crispEdges) — mesmo padrão visual do
 * WhatsAppIcon, usado no CTA de GitHub (Projetos, Quick Mode). Símbolo
 * genérico de código-fonte, não o logo oficial do GitHub.
 */
export function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 8 8"
      shapeRendering="crispEdges"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <g fill="currentColor">
        {/* < */}
        <rect x="2" y="2" width="1" height="1" />
        <rect x="1" y="3" width="1" height="2" />
        <rect x="2" y="5" width="1" height="1" />
        {/* / */}
        <rect x="4" y="5" width="1" height="1" />
        <rect x="4" y="4" width="1" height="1" />
        <rect x="3" y="3" width="1" height="1" />
        {/* > */}
        <rect x="5" y="2" width="1" height="1" />
        <rect x="6" y="3" width="1" height="2" />
        <rect x="5" y="5" width="1" height="1" />
      </g>
    </svg>
  )
}
