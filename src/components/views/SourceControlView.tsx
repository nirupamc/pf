import { OWNER } from '../../content/meta'

// Fake "changes" list — each row links to a real GitHub repo.
const changes = [
  { file: 'evangalion-typeish', status: 'M', color: 'var(--vscode-gitDecoration-modifiedResourceForeground)', url: OWNER.github + '/evangalion-typeish' },
  { file: 'pwa-attendance', status: 'M', color: 'var(--vscode-gitDecoration-modifiedResourceForeground)', url: OWNER.github + '/pwa-attendance' },
  { file: 'auto-apply-', status: 'U', color: 'var(--vscode-gitDecoration-untrackedResourceForeground)', url: OWNER.github + '/auto-apply-' },
  { file: 'database-t_t', status: 'M', color: 'var(--vscode-gitDecoration-modifiedResourceForeground)', url: OWNER.github + '/database-t_t' },
  { file: 'imposter-syndrome', status: 'D', color: 'var(--vscode-gitDecoration-deletedResourceForeground)', url: OWNER.github },
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
          Message (Ctrl+Enter to hire {OWNER.name})
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
        Changes
        <span
          className="ml-auto rounded-full px-1.5 text-[11px] font-normal normal-case"
          style={{ background: 'var(--vscode-badge-background)', color: 'var(--vscode-badge-foreground)' }}
        >
          {changes.length}
        </span>
      </div>
      <ul>
        {changes.map((c) => (
          <li key={c.file}>
            <a
              href={c.url}
              target="_blank"
              rel="noreferrer"
              className="flex h-[22px] items-center px-3 hover:bg-[color:var(--vscode-list-hoverBackground)]"
              title={`Open ${c.file} on GitHub`}
            >
              <span className="codicon codicon-repo mr-1.5 !text-[14px] opacity-80" aria-hidden />
              <span className="truncate">{c.file}</span>
              <span className="ml-auto pl-2 font-mono text-[12px]" style={{ color: c.color }}>
                {c.status}
              </span>
            </a>
          </li>
        ))}
      </ul>
      <p className="px-3 pt-3 text-[11px]" style={{ color: 'var(--vscode-descriptionForeground)' }}>
        Always shipping. The working tree is never clean.
      </p>
    </div>
  )
}
