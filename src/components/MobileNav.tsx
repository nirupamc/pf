import { useStore } from '../store/useStore'

/** Bottom navigation on <768px — replaces activity bar / panel / Claude toggles. */
export default function MobileNav() {
  const mobileOverlay = useStore((s) => s.mobileOverlay)
  const setMobileOverlay = useStore((s) => s.setMobileOverlay)
  const setQuickOpen = useStore((s) => s.setQuickOpen)

  const Item = ({
    icon,
    label,
    active,
    onClick,
  }: {
    icon: string
    label: string
    active?: boolean
    onClick: () => void
  }) => (
    <button
      onClick={onClick}
      aria-label={label}
      className="flex h-full flex-1 flex-col items-center justify-center"
      style={{
        color: active
          ? 'var(--vscode-activityBar-foreground)'
          : 'var(--vscode-activityBar-inactiveForeground)',
      }}
    >
      <span className={`codicon codicon-${icon} !text-[22px]`} aria-hidden />
    </button>
  )

  return (
    <nav
      className="flex h-12 shrink-0 border-t bg-vsc-activitybar md:hidden"
      style={{ borderColor: 'var(--vscode-panel-border)' }}
      aria-label="Mobile navigation"
    >
      <Item
        icon="files"
        label="Files"
        active={mobileOverlay === 'sidebar'}
        onClick={() => setMobileOverlay(mobileOverlay === 'sidebar' ? null : 'sidebar')}
      />
      <Item icon="search" label="Search" onClick={() => setQuickOpen(true)} />
      <Item
        icon="terminal"
        label="Terminal"
        active={mobileOverlay === 'terminal'}
        onClick={() => setMobileOverlay(mobileOverlay === 'terminal' ? null : 'terminal')}
      />
      <Item
        icon="sparkle"
        label="Claude"
        active={mobileOverlay === 'claude'}
        onClick={() => setMobileOverlay(mobileOverlay === 'claude' ? null : 'claude')}
      />
    </nav>
  )
}
