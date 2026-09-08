import { BRAND } from '../../theme/palette'

// "Extensions" = the verified toolbox, presented as a static capability view.
const tools = [
  { group: 'Applied AI', name: 'LLM systems', desc: 'Agents, RAG, retrieval, evaluation, and local inference.', initial: '✦', color: BRAND.llm },
  { group: 'Backend', name: 'Python / FastAPI', desc: 'APIs, streaming, authentication, and backend workflows.', initial: 'Py', color: BRAND.python },
  { group: 'Retrieval / Data', name: 'ChromaDB / BM25', desc: 'Dense, lexical, fused, and reranked retrieval.', initial: 'DB', color: BRAND.graphql },
  { group: 'Full Stack', name: 'TypeScript / React', desc: 'Product interfaces, Next.js applications, and browser APIs.', initial: 'TS', color: BRAND.typescript },
  { group: 'Full Stack', name: 'Node.js / GraphQL', desc: 'Server-side JavaScript and typed product APIs.', initial: 'N', color: BRAND.nodejs },
  { group: 'Tools', name: 'Playwright / Vite', desc: 'Browser automation, development tooling, and testing workflows.', initial: 'PW', color: BRAND.nextjs },
  { group: 'Creative Technology', name: 'Three.js / WebGL', desc: 'Interactive 3D experiments and visual interfaces.', initial: '3', color: BRAND.threejs },
  { group: 'Creative Technology', name: 'Screen printing', desc: 'Color separation, production plates, and physical work.', initial: 'Ps', color: BRAND.photoshop },
]

export default function ExtensionsView() {
  return (
    <div className="text-[13px]">
      <div className="px-3 py-1">
        <div
          className="rounded-[2px] px-2 py-[5px] text-[13px]"
          style={{
            background: 'var(--vscode-input-background)',
            color: 'var(--vscode-input-placeholderForeground)',
          }}
        >
        Verified capabilities from the portfolio
        </div>
      </div>
      <div
        className="flex h-[22px] items-center gap-1 px-2 text-[11px] font-bold uppercase tracking-wide"
        style={{ color: 'var(--vscode-sideBarSectionHeader-foreground)' }}
      >
        <span className="codicon codicon-chevron-down !text-[14px]" aria-hidden />
        My toolbox
      </div>
      <ul role="list">
        {tools.map((t) => (
          <li
            key={t.name}
            className="flex gap-2 px-3 py-[6px] hover:bg-[color:var(--vscode-list-hoverBackground)]"
          >
            <div
              className="mt-0.5 flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded font-mono text-[15px] font-bold"
              style={{ background: BRAND.tile, color: t.color }}
              aria-hidden
            >
              {t.initial}
            </div>
            <div className="min-w-0">
              <div className="flex items-baseline gap-1.5">
                <span className="truncate font-semibold">{t.name}</span>
              </div>
              <div className="truncate text-[12px]" style={{ color: 'var(--vscode-descriptionForeground)' }}>
                {t.desc}
              </div>
              <div className="flex items-center justify-between text-[12px]" style={{ color: 'var(--vscode-descriptionForeground)' }}>
                <span>{t.group}</span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
