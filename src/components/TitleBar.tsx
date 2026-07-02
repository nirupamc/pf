import { useStore } from '../store/useStore'
import { OWNER } from '../content/meta'

export default function TitleBar() {
  const toggleClaude = useStore((s) => s.toggleClaude)
  const setQuickOpen = useStore((s) => s.setQuickOpen)
  const togglePanel = useStore((s) => s.togglePanel)

  return (
    <div
      className="relative flex h-[30px] shrink-0 select-none items-center bg-vsc-titlebar text-[13px]"
      style={{ color: 'var(--vscode-titleBar-activeForeground)' }}
    >
      {/* left: monogram + menu (decorative) */}
      <div className="flex items-center gap-1 pl-2">
        <span
          className="mr-1 font-mono text-[13px] font-bold"
          style={{ color: 'var(--vscode-statusBar-background)' }}
          aria-hidden
        >
          &lt;N&gt;
        </span>
        <div className="hidden items-center lg:flex">
          {['File', 'Edit', 'Selection', 'View', 'Go', 'Run', 'Terminal', 'Help'].map(
            (m) =>
              m === 'Terminal' ? (
                <button
                  key={m}
                  onClick={togglePanel}
                  className="rounded px-[7px] py-[3px] hover:bg-white/10"
                  title="Toggle Terminal (Ctrl+`)"
                >
                  {m}
                </button>
              ) : (
                <span
                  key={m}
                  className="cursor-default rounded px-[7px] py-[3px] hover:bg-white/10"
                >
                  {m}
                </span>
              ),
          )}
        </div>
      </div>

      {/* center: command-center search box */}
      <div className="pointer-events-none absolute inset-x-0 flex justify-center">
        <button
          onClick={() => setQuickOpen(true)}
          className="pointer-events-auto flex h-[22px] w-[38vw] min-w-[120px] max-w-[600px] items-center justify-center gap-1.5 rounded-md border text-[12px]"
          style={{
            background: 'var(--vscode-commandCenter-background)',
            borderColor: 'var(--vscode-commandCenter-border)',
            color: 'var(--vscode-titleBar-inactiveForeground)',
          }}
          title="Go to File... (Ctrl+P)"
        >
          <span className="codicon codicon-search !text-[12px]" aria-hidden />
          <span className="truncate">
            {OWNER.name.toLowerCase()} — {OWNER.role.toLowerCase()}
          </span>
        </button>
      </div>

      {/* right: plain version + layout toggle + window controls */}
      <div className="ml-auto flex items-center">
        <a
          href="/plain.html"
          className="mr-1 hidden rounded px-2 py-[3px] text-[11px] hover:bg-white/10 sm:block"
          style={{ color: 'var(--vscode-titleBar-inactiveForeground)' }}
        >
          View plain version
        </a>
        <button
          onClick={toggleClaude}
          className="hidden h-[30px] w-9 items-center justify-center hover:bg-white/10 xl:flex"
          title="Toggle Claude Code Panel"
          aria-label="Toggle Claude Code panel"
        >
          <span className="codicon codicon-layout-sidebar-right !text-[16px]" aria-hidden />
        </button>
        {/* window controls — decorative */}
        <div className="hidden md:flex" aria-hidden>
          <span className="flex h-[30px] w-[46px] items-center justify-center hover:bg-white/10">
            <span className="codicon codicon-chrome-minimize !text-[16px]" />
          </span>
          <span className="flex h-[30px] w-[46px] items-center justify-center hover:bg-white/10">
            <span className="codicon codicon-chrome-maximize !text-[16px]" />
          </span>
          <span className="flex h-[30px] w-[46px] items-center justify-center hover:bg-[color:var(--portfolio-titleBar-closeHover)] hover:text-white">
            <span className="codicon codicon-chrome-close !text-[16px]" />
          </span>
        </div>
      </div>
    </div>
  )
}
