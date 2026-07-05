import { lazy, Suspense, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useStore } from './store/useStore'
import { fileById } from './content/files'
import TitleBar from './components/TitleBar'
import ActivityBar from './components/ActivityBar'
import Sidebar from './components/Sidebar'
import TabBar from './components/TabBar'
import EditorArea from './components/EditorArea'
import StatusBar from './components/StatusBar'
import Terminal from './components/Terminal'
import QuickOpen from './components/QuickOpen'
import MobileNav from './components/MobileNav'
import Wallpaper from './components/Wallpaper'

const ClaudePanel = lazy(() => import('./components/claude/ClaudePanel'))
const ImageViewer = lazy(() => import('./components/ImageViewer'))

/** Keeps URL ↔ active tab in sync (deep links + refresh restore). */
function useRouteSync() {
  const location = useLocation()
  const navigate = useNavigate()
  const activeTab = useStore((s) => s.activeTab)
  const openFile = useStore((s) => s.openFile)
  const setNotFound = useStore((s) => s.setNotFound)

  // URL → store
  useEffect(() => {
    const id = decodeURIComponent(location.pathname.replace(/^\/+|\/+$/g, ''))
    if (!id) {
      setNotFound(null)
      openFile('readme', { preview: true })
      return
    }
    if (fileById.has(id)) {
      setNotFound(null)
      // don't re-open (and thereby promote) a tab that's already active —
      // this fires on every store→URL navigation too
      if (useStore.getState().activeTab !== id) openFile(id)
    } else {
      // unknown path: VS Code-style "file not found" tab (URL preserved)
      setNotFound('/' + id)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname])

  // store → URL (also runs when a file open clears the not-found state)
  const notFound = useStore((s) => s.notFound)
  useEffect(() => {
    if (!activeTab || notFound) return
    const want = '/' + activeTab
    if (location.pathname !== want) navigate(want)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab, notFound])
}

function useKeyboardShortcuts() {
  const s = useStore
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const mod = e.ctrlKey || e.metaKey
      if (!mod) return
      const k = e.key.toLowerCase()
      if (k === 'p' && !e.shiftKey) {
        e.preventDefault()
        s.getState().setQuickOpen(!s.getState().quickOpenVisible)
      } else if (k === '`') {
        e.preventDefault()
        s.getState().togglePanel()
      } else if (k === 'b' && !e.shiftKey) {
        e.preventDefault()
        s.getState().toggleSidebar()
      } else if (k === 'w') {
        const { activeTab, closeTab } = s.getState()
        if (activeTab) {
          e.preventDefault()
          closeTab(activeTab)
        }
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [s])
}

export default function App() {
  useRouteSync()
  useKeyboardShortcuts()
  const sidebarVisible = useStore((s) => s.sidebarVisible)
  const panelVisible = useStore((s) => s.panelVisible)
  const claudeVisible = useStore((s) => s.claudeVisible)
  const mobileOverlay = useStore((s) => s.mobileOverlay)

  return (
    <div className="flex h-full flex-col">
      <TitleBar />
      <div className="flex min-h-0 flex-1">
        <div className="hidden md:block">
          <ActivityBar />
        </div>
        {sidebarVisible && (
          <div className="hidden md:block">
            <Sidebar />
          </div>
        )}
        {/* Wallpaper lives at the COLUMN level (sibling of the scroll containers,
            behind TabBar/Terminal which have opaque backgrounds) so scrolling,
            tab switches and panel toggles never move it. */}
        <div className="relative flex min-w-0 flex-1 flex-col bg-vsc-editor">
          <Wallpaper />
          <div className="relative z-10 flex min-h-0 flex-1 flex-col">
            <TabBar />
            <div className="min-h-0 flex-1">
              <EditorArea />
            </div>
            {panelVisible && (
              <div className="hidden h-[230px] shrink-0 md:block">
                <Terminal />
              </div>
            )}
          </div>
        </div>
        {claudeVisible && (
          <div className="hidden w-[310px] shrink-0 border-l border-vsc-border xl:block">
            <Suspense fallback={<div className="h-full bg-vsc-sidebar" />}>
              <ClaudePanel />
            </Suspense>
          </div>
        )}
      </div>
      <div className="hidden md:block">
        <StatusBar />
      </div>
      <MobileNav />

      {/* Mobile overlays */}
      {mobileOverlay === 'sidebar' && (
        <MobileSheet side="left">
          <Sidebar mobile />
        </MobileSheet>
      )}
      {mobileOverlay === 'terminal' && (
        <MobileSheet side="bottom">
          <Terminal />
        </MobileSheet>
      )}
      {mobileOverlay === 'claude' && (
        <MobileSheet side="full">
          <Suspense fallback={<div className="h-full bg-vsc-sidebar" />}>
            <ClaudePanel mobile />
          </Suspense>
        </MobileSheet>
      )}
      <QuickOpen />
      <ImageViewerMount />
    </div>
  )
}

function ImageViewerMount() {
  const imageView = useStore((s) => s.imageView)
  if (!imageView) return null
  return (
    <Suspense fallback={null}>
      <ImageViewer />
    </Suspense>
  )
}

function MobileSheet({
  side,
  children,
}: {
  side: 'left' | 'bottom' | 'full'
  children: React.ReactNode
}) {
  const setMobileOverlay = useStore((s) => s.setMobileOverlay)
  return (
    <div className="fixed inset-0 z-40 md:hidden" role="dialog" aria-modal="true">
      <div
        className="absolute inset-0 bg-black/50"
        onClick={() => setMobileOverlay(null)}
      />
      <div
        className={
          side === 'left'
            ? 'absolute bottom-12 left-0 top-0 w-[280px] max-w-[85vw] shadow-xl'
            : side === 'bottom'
              ? 'absolute bottom-12 left-0 right-0 h-[45vh] shadow-xl'
              : 'absolute bottom-12 left-0 right-0 top-0'
        }
      >
        {children}
      </div>
    </div>
  )
}
