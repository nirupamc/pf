import { lazy, Suspense, useCallback, useRef, useState } from 'react'
import { useStore, type SidebarView } from '../store/useStore'
import FileTree from './FileTree'
import SearchView from './views/SearchView'
import SourceControlView from './views/SourceControlView'
import ProjectsView from './views/ProjectsView'
import ExtensionsView from './views/ExtensionsView'
import ContactView from './views/ContactView'

const Pets = lazy(() => import('./Pets'))

const TITLES: Record<SidebarView, string> = {
  explorer: 'Explorer',
  search: 'Search',
  'source-control': 'Source Control',
  projects: 'Projects',
  extensions: 'Extensions',
  contact: 'Contact',
}

export default function Sidebar({ mobile }: { mobile?: boolean }) {
  const view = useStore((s) => s.sidebarView)
  const width = useStore((s) => s.sidebarWidth)
  const setSidebarWidth = useStore((s) => s.setSidebarWidth)
  const [explorerOpen, setExplorerOpen] = useState(true)
  const dragging = useRef(false)

  const onResizeStart = useCallback(
    (e: React.PointerEvent) => {
      dragging.current = true
      const target = e.currentTarget as HTMLElement
      target.setPointerCapture(e.pointerId)
      const move = (ev: PointerEvent) => {
        if (dragging.current) setSidebarWidth(ev.clientX - 48)
      }
      const up = () => {
        dragging.current = false
        window.removeEventListener('pointermove', move)
        window.removeEventListener('pointerup', up)
      }
      window.addEventListener('pointermove', move)
      window.addEventListener('pointerup', up)
    },
    [setSidebarWidth],
  )

  return (
    <aside
      className="relative flex h-full flex-col bg-vsc-sidebar"
      style={{
        width: mobile ? '100%' : width,
        borderRight: mobile ? 'none' : '1px solid var(--vscode-sideBar-border)',
      }}
      aria-label={TITLES[view]}
    >
      {/* pane title */}
      <div
        className="flex h-[35px] shrink-0 items-center justify-between px-5 text-[11px] uppercase tracking-wide"
        style={{ color: 'var(--vscode-sideBarTitle-foreground)' }}
      >
        <span>{TITLES[view]}</span>
        <span className="codicon codicon-ellipsis opacity-70" aria-hidden />
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden">
        {view === 'explorer' && (
          <>
            <button
              className="flex h-[22px] w-full items-center gap-0.5 px-1 text-[11px] font-bold uppercase tracking-wide"
              style={{ color: 'var(--vscode-sideBarSectionHeader-foreground)' }}
              onClick={() => setExplorerOpen((v) => !v)}
              aria-expanded={explorerOpen}
            >
              <span
                className={`codicon codicon-chevron-${explorerOpen ? 'down' : 'right'} !text-[16px]`}
                aria-hidden
              />
              Portfolio
            </button>
            {explorerOpen && <FileTree />}
          </>
        )}
        {view === 'search' && <SearchView />}
        {view === 'source-control' && <SourceControlView />}
        {view === 'projects' && <ProjectsView />}
        {view === 'extensions' && <ExtensionsView />}
        {view === 'contact' && <ContactView />}
      </div>

      {/* VS Code Pets section at the bottom of the sidebar */}
      <Suspense fallback={<div className="h-[112px] shrink-0" />}>
        <Pets />
      </Suspense>

      {/* resize handle */}
      {!mobile && (
        <div
          className="absolute -right-[2px] top-0 z-10 h-full w-[4px] cursor-ew-resize"
          onPointerDown={onResizeStart}
          role="separator"
          aria-orientation="vertical"
          aria-label="Resize sidebar"
        />
      )}
    </aside>
  )
}
