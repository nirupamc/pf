import { useEffect, useRef, useState } from 'react'
import { useStore, type ThemeId } from '../store/useStore'
import { fileById } from '../content/files'
import { OWNER } from '../content/meta'

const THEMES: { id: ThemeId; label: string; detail: string }[] = [
  { id: 'dark-plus', label: 'Dark+ (Visual Studio Code)', detail: 'stock — default' },
  { id: 'nirupam', label: "Nirupam's Theme", detail: 'red · pairs with the wallpaper' },
]

/** Small quick-pick styled like VS Code's command palette, anchored above the status bar. */
function ThemePicker() {
  const theme = useStore((s) => s.theme)
  const setTheme = useStore((s) => s.setTheme)
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const close = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false)
    }
    const esc = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('mousedown', close)
    window.addEventListener('keydown', esc)
    return () => {
      window.removeEventListener('mousedown', close)
      window.removeEventListener('keydown', esc)
    }
  }, [open])

  return (
    <div ref={ref} className="relative h-full">
      <button
        className="flex h-full items-center gap-1 px-2 text-[12px] hover:bg-[color:var(--vscode-statusBarItem-hoverBackground)]"
        onClick={() => setOpen((v) => !v)}
        title="Color Theme"
        aria-label="Select color theme"
        aria-expanded={open}
      >
        <span className="codicon codicon-symbol-color !text-[14px]" aria-hidden />
      </button>
      {open && (
        <div
          className="absolute bottom-[26px] right-0 z-50 w-[290px] overflow-hidden rounded-md border py-1 shadow-2xl"
          style={{
            background: 'var(--vscode-quickInput-background)',
            borderColor: 'var(--vscode-editorWidget-border)',
            boxShadow: '0 4px 20px var(--vscode-widget-shadow)',
            color: 'var(--vscode-foreground)',
          }}
          role="listbox"
          aria-label="Color themes"
        >
          <div
            className="px-3 pb-1 pt-0.5 text-[11px]"
            style={{ color: 'var(--vscode-descriptionForeground)' }}
          >
            Select Color Theme
          </div>
          {THEMES.map((t) => (
            <button
              key={t.id}
              role="option"
              aria-selected={theme === t.id}
              onClick={() => {
                setTheme(t.id)
                setOpen(false)
              }}
              className="flex w-full items-center gap-2 px-3 py-[5px] text-left text-[13px] hover:bg-[color:var(--vscode-list-hoverBackground)]"
              style={
                theme === t.id
                  ? {
                      background: 'var(--vscode-quickInputList-focusBackground)',
                      color: 'var(--vscode-list-activeSelectionForeground)',
                    }
                  : undefined
              }
            >
              <span
                className={`codicon codicon-check !text-[14px] ${theme === t.id ? '' : 'invisible'}`}
                aria-hidden
              />
              <span>{t.label}</span>
              <span className="ml-auto text-[11px] opacity-60">{t.detail}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

function Item({
  children,
  title,
  onClick,
  href,
  ariaLabel,
}: {
  children: React.ReactNode
  title: string
  onClick?: () => void
  href?: string
  ariaLabel?: string
}) {
  const cls =
    'flex h-full items-center gap-1 px-2 text-[12px] hover:bg-[color:var(--vscode-statusBarItem-hoverBackground)] whitespace-nowrap'
  if (href)
    return (
      <a className={cls} href={href} target="_blank" rel="noreferrer" title={title} aria-label={ariaLabel ?? title}>
        {children}
      </a>
    )
  return (
    <button className={cls} onClick={onClick} title={title} aria-label={ariaLabel ?? title}>
      {children}
    </button>
  )
}

export default function StatusBar() {
  const activeTab = useStore((s) => s.activeTab)
  const togglePanel = useStore((s) => s.togglePanel)
  const wallpaperOn = useStore((s) => s.wallpaperOn)
  const toggleWallpaper = useStore((s) => s.toggleWallpaper)
  const file = activeTab ? fileById.get(activeTab) : null

  const langLabel =
    file?.language === 'tsx'
      ? 'TypeScript React'
      : file?.language === 'typescript'
        ? 'TypeScript'
        : file?.language === 'javascript'
          ? 'JavaScript'
          : file?.language === 'json'
            ? 'JSON'
            : file?.language === 'yaml'
              ? 'YAML'
              : file?.language === 'markdown'
                ? 'Markdown'
                : file?.viewer === 'pdf'
                  ? 'PDF'
                  : 'Plain Text'

  return (
    <footer
      className="flex h-[22px] shrink-0 items-center bg-vsc-statusbar"
      style={{ color: 'var(--vscode-statusBar-foreground)' }}
      aria-label="Status bar"
    >
      <Item title={`${OWNER.name} on GitHub — branch: main`} href={OWNER.github}>
        <span className="codicon codicon-source-control !text-[14px]" aria-hidden />
        main
      </Item>
      <Item title="No problems. Ever. (citation needed)" onClick={togglePanel}>
        <span className="codicon codicon-check !text-[14px]" aria-hidden />0 errors
      </Item>
      <Item title="Cursor position (comfortingly static)">
        Ln 1, Col 1
      </Item>

      <div className="ml-auto flex h-full">
        <Item title="Encoding: UTF-8, like everything since 2005">UTF-8</Item>
        <Item title={`Language mode: ${langLabel}`}>{langLabel}</Item>
        <Item title="Formatter: Prettier — because arguments about semicolons are boring">
          <span className="codicon codicon-check !text-[14px]" aria-hidden />
          Prettier
        </Item>
        <Item
          title={`Editor wallpaper: ${wallpaperOn ? 'on' : 'off'} — click to toggle`}
          onClick={toggleWallpaper}
          ariaLabel="Toggle editor wallpaper"
        >
          <span
            className="codicon codicon-file-media !text-[14px]"
            style={{ opacity: wallpaperOn ? 1 : 0.55 }}
            aria-hidden
          />
        </Item>
        <ThemePicker />
        <Item title="Go Live — see my deployed projects" href={OWNER.deployedProjects}>
          <span className="codicon codicon-broadcast !text-[14px]" aria-hidden />
          Go Live
        </Item>
        <Item title="zero two last." ariaLabel="zero two last (decorative)">
          Zero Two <span aria-hidden>♡</span>
        </Item>
        <Item title="No new notifications (you can fix that — see contact.js)">
          <span className="codicon codicon-bell !text-[14px]" aria-hidden />
        </Item>
      </div>
    </footer>
  )
}
