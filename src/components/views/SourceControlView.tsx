import { OWNER } from '../../content/meta'

const history = [
  'Flagship AI systems documented',
  'Technical writing summaries linked',
  'Full-stack and creative work preserved',
]

export default function SourceControlView() {
  return (
    <div className="text-[13px]">
      <div className="px-3 py-1">
        <div
          className="rounded-[2px] px-2 py-[5px]"
          style={{
            background: 'var(--vscode-input-background)',
            color: 'var(--vscode-input-placeholderForeground)',
          }}
        >
          Portfolio history
        </div>
        <a
          href={OWNER.github}
          target="_blank"
          rel="noreferrer"
          className="mt-2 flex w-full items-center justify-center gap-1.5 rounded-[2px] py-[5px] text-center"
          style={{ background: 'var(--vscode-button-background)', color: 'var(--vscode-button-foreground)' }}
        >
          <span className="codicon codicon-github !text-[14px]" aria-hidden />
          View my GitHub
        </a>
      </div>

      <div
        className="mt-2 flex h-[22px] items-center gap-1 px-2 text-[11px] font-bold uppercase tracking-wide"
        style={{ color: 'var(--vscode-sideBarSectionHeader-foreground)' }}
      >
        <span className="codicon codicon-chevron-down !text-[14px]" aria-hidden />
        Documented work
      </div>
      <ul>
        {history.map((item) => (
          <li key={item} className="flex h-[26px] items-center px-3 text-[12px]">
            <span className="codicon codicon-check mr-1.5 !text-[14px]" style={{ color: 'var(--vscode-charts-green)' }} aria-hidden />
            <span className="truncate">{item}</span>
          </li>
        ))}
      </ul>
      <p className="px-3 pt-3 text-[11px]" style={{ color: 'var(--vscode-descriptionForeground)' }}>
        This is a static portfolio view, not live repository state.
      </p>
    </div>
  )
}
