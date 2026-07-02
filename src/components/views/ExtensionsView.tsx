import { BRAND } from '../../theme/palette'

// "Extensions" = my real toolbox, styled like the marketplace list.
// "Install count" = years of experience with the tool.
// TODO: NIRUPAM — adjust years to taste.
const tools = [
  { name: 'React', publisher: 'facebook', desc: 'Component-based UIs. My home turf.', years: 2, initial: '⚛', color: BRAND.react },
  { name: 'TypeScript', publisher: 'microsoft', desc: 'JavaScript that scales (and argues back).', years: 2, initial: 'TS', color: BRAND.typescript },
  { name: 'Next.js', publisher: 'vercel', desc: 'React with batteries and opinions included.', years: 2, initial: 'N▲', color: BRAND.nextjs },
  { name: 'Node.js', publisher: 'openjs', desc: 'Server-side JS for APIs and tooling.', years: 2, initial: 'N', color: BRAND.nodejs },
  { name: 'Python', publisher: 'psf', desc: 'For scripts, backends and ML homework.', years: 2, initial: 'Py', color: BRAND.python },
  { name: 'LLM APIs', publisher: 'openai · anthropic · google', desc: 'Function calling, RAG, structured output.', years: 2, initial: '✦', color: BRAND.llm },
  { name: 'GraphQL', publisher: 'graphql', desc: 'Ask for exactly what you need.', years: 2, initial: 'GQ', color: BRAND.graphql },
  { name: 'Tailwind CSS', publisher: 'tailwindlabs', desc: 'Utility-first styling at speed.', years: 2, initial: 'TW', color: BRAND.tailwind },
  { name: 'Three.js', publisher: 'mrdoob', desc: 'WebGL without tears. Mostly.', years: 1, initial: '3', color: BRAND.threejs },
  { name: 'Photoshop', publisher: 'adobe', desc: 'Where the color separations happen.', years: 4, initial: 'Ps', color: BRAND.photoshop },
  { name: 'Docker', publisher: 'docker', desc: 'Works on my machine — and yours.', years: 1, initial: 'D', color: BRAND.docker },
  { name: 'GitHub Actions', publisher: 'github', desc: 'CI/CD that saves 4 hours a release.', years: 2, initial: 'GA', color: BRAND.githubActions },
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
          Search Extensions in Marketplace
        </div>
      </div>
      <div
        className="flex h-[22px] items-center gap-1 px-2 text-[11px] font-bold uppercase tracking-wide"
        style={{ color: 'var(--vscode-sideBarSectionHeader-foreground)' }}
      >
        <span className="codicon codicon-chevron-down !text-[14px]" aria-hidden />
        Installed — my stack
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
                <span className="flex items-center gap-0.5 text-[11px]" style={{ color: 'var(--vscode-descriptionForeground)' }}>
                  <span className="codicon codicon-cloud-download !text-[11px]" aria-hidden />
                  {t.years}y
                </span>
              </div>
              <div className="truncate text-[12px]" style={{ color: 'var(--vscode-descriptionForeground)' }}>
                {t.desc}
              </div>
              <div className="flex items-center justify-between text-[12px]" style={{ color: 'var(--vscode-descriptionForeground)' }}>
                <span>{t.publisher}</span>
                <span
                  className="rounded-[2px] px-1.5 text-[11px]"
                  style={{
                    background: 'var(--vscode-button-background)',
                    color: 'var(--vscode-button-foreground)',
                  }}
                >
                  Installed
                </span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
