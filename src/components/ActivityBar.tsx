import { useStore, type SidebarView } from '../store/useStore'
import { OWNER } from '../content/meta'

const items: { view: SidebarView; icon: string; label: string }[] = [
  { view: 'explorer', icon: 'files', label: 'Explorer (Ctrl+Shift+E)' },
  { view: 'search', icon: 'search', label: 'Search (Ctrl+P)' },
  { view: 'source-control', icon: 'source-control', label: 'Source Control' },
  { view: 'projects', icon: 'beaker', label: 'Projects' },
  { view: 'extensions', icon: 'extensions', label: 'Extensions (my tools)' },
]

export default function ActivityBar() {
  const sidebarView = useStore((s) => s.sidebarView)
  const sidebarVisible = useStore((s) => s.sidebarVisible)
  const setSidebarView = useStore((s) => s.setSidebarView)

  const Item = ({ view, icon, label }: (typeof items)[number]) => {
    const active = sidebarVisible && sidebarView === view
    return (
      <button
        onClick={() => setSidebarView(view)}
        aria-label={label}
        title={label}
        className="relative flex h-12 w-12 items-center justify-center"
        style={{
          color: active
            ? 'var(--vscode-activityBar-foreground)'
            : 'var(--vscode-activityBar-inactiveForeground)',
          borderLeft: active
            ? '2px solid var(--vscode-activityBar-activeBorder)'
            : '2px solid transparent',
        }}
      >
        <span className={`codicon codicon-${icon} !text-[24px]`} aria-hidden />
      </button>
    )
  }

  return (
    <nav
      className="flex h-full w-12 flex-col bg-vsc-activitybar"
      aria-label="Primary"
    >
      {items.map((it) => (
        <Item key={it.view} {...it} />
      ))}
      <div className="mt-auto">
        <a
          href={OWNER.github}
          target="_blank"
          rel="noreferrer"
          aria-label="GitHub profile"
          title={`${OWNER.name} — GitHub`}
          className="flex h-12 w-12 items-center justify-center border-l-2 border-transparent"
          style={{ color: 'var(--vscode-activityBar-inactiveForeground)' }}
        >
          <span className="codicon codicon-github !text-[24px]" aria-hidden />
        </a>
        <Item view="contact" icon="account" label="Contact" />
        <button
          className="flex h-12 w-12 items-center justify-center border-l-2 border-transparent"
          style={{ color: 'var(--vscode-activityBar-inactiveForeground)' }}
          aria-label="Manage (decorative)"
          title="Manage"
        >
          <span className="codicon codicon-settings-gear !text-[24px]" aria-hidden />
        </button>
      </div>
    </nav>
  )
}
