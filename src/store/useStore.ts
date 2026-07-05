import { create } from 'zustand'
import { fileById } from '../content/files'

export type ThemeId = 'dark-plus' | 'nirupam'

export type SidebarView =
  | 'explorer'
  | 'search'
  | 'source-control'
  | 'projects'
  | 'extensions'
  | 'contact'

interface AppState {
  openTabs: string[]
  activeTab: string | null
  /** tab opened in "preview" mode (italic, replaced by next preview open) */
  previewTab: string | null
  sidebarView: SidebarView
  sidebarVisible: boolean
  sidebarWidth: number
  panelVisible: boolean
  quickOpenVisible: boolean
  claudeVisible: boolean
  /** README raw-markdown vs preview toggle */
  markdownRaw: Record<string, boolean>
  /** mobile: which overlay is open */
  mobileOverlay: 'sidebar' | 'claude' | 'terminal' | null
  /** active color theme (persisted) */
  theme: ThemeId
  /** decorative editor wallpaper — explicit user pref overrides theme default */
  wallpaperOn: boolean
  /** image opened in the VS Code-style image viewer */
  imageView: { src: string; alt: string } | null
  /** unknown URL path currently shown as a "file not found" editor tab */
  notFound: string | null

  openFile: (id: string, opts?: { preview?: boolean }) => void
  closeTab: (id: string) => void
  setActiveTab: (id: string) => void
  setSidebarView: (v: SidebarView) => void
  toggleSidebar: () => void
  setSidebarWidth: (w: number) => void
  togglePanel: () => void
  setQuickOpen: (v: boolean) => void
  toggleClaude: () => void
  toggleMarkdownRaw: (id: string) => void
  setMobileOverlay: (v: 'sidebar' | 'claude' | 'terminal' | null) => void
  setTheme: (t: ThemeId) => void
  toggleWallpaper: () => void
  setImageView: (v: { src: string; alt: string } | null) => void
  setNotFound: (path: string | null) => void
}

const TABS_KEY = 'vsc-portfolio-tabs'
const WALLPAPER_KEY = 'vsc-portfolio-wallpaper'
const THEME_KEY = 'vsc-portfolio-theme'

function loadTheme(): ThemeId {
  const t = localStorage.getItem(THEME_KEY)
  return t === 'nirupam' ? 'nirupam' : 'dark-plus'
}

function applyThemeAttr(t: ThemeId) {
  if (t === 'nirupam') document.documentElement.dataset.theme = 'nirupam'
  else delete document.documentElement.dataset.theme
}

/** explicit user pref ('on'/'off') beats the theme default (Dark+: off, Nirupam: on) */
function wallpaperFor(theme: ThemeId): boolean {
  const pref = localStorage.getItem(WALLPAPER_KEY)
  if (pref === 'on') return true
  if (pref === 'off') return false
  return theme === 'nirupam'
}

const initialTheme = loadTheme()
applyThemeAttr(initialTheme)

function loadTabs(): string[] {
  try {
    const raw = localStorage.getItem(TABS_KEY)
    if (!raw) return []
    const arr: unknown = JSON.parse(raw)
    if (!Array.isArray(arr)) return []
    return arr.filter((id): id is string => typeof id === 'string' && fileById.has(id))
  } catch {
    return []
  }
}

function saveTabs(tabs: string[]) {
  try {
    localStorage.setItem(TABS_KEY, JSON.stringify(tabs))
  } catch {
    /* private mode etc. */
  }
}

export const useStore = create<AppState>((set, get) => ({
  openTabs: loadTabs(),
  activeTab: null,
  previewTab: null,
  sidebarView: 'explorer',
  sidebarVisible: window.innerWidth >= 768,
  sidebarWidth: 260,
  panelVisible: false,
  quickOpenVisible: false,
  claudeVisible: window.innerWidth >= 1200,
  markdownRaw: {},
  mobileOverlay: null,
  theme: initialTheme,
  wallpaperOn: wallpaperFor(initialTheme),
  imageView: null,
  notFound: null,

  openFile: (id, opts) => {
    if (!fileById.has(id)) return
    const { openTabs, previewTab } = get()
    let tabs = openTabs
    let preview = previewTab
    if (!tabs.includes(id)) {
      if (opts?.preview && preview && tabs.includes(preview)) {
        // replace existing preview tab in place
        tabs = tabs.map((t) => (t === preview ? id : t))
      } else {
        tabs = [...tabs, id]
      }
      preview = opts?.preview ? id : preview
    } else if (!opts?.preview && preview === id) {
      preview = null // promote to permanent
    }
    if (!opts?.preview && preview === id) preview = null
    saveTabs(tabs)
    set({
      openTabs: tabs,
      activeTab: id,
      previewTab: preview,
      mobileOverlay: null,
      notFound: null, // opening a real file always leaves the 404 view
    })
  },

  closeTab: (id) => {
    const { openTabs, activeTab, previewTab } = get()
    const idx = openTabs.indexOf(id)
    const tabs = openTabs.filter((t) => t !== id)
    saveTabs(tabs)
    let active = activeTab
    if (activeTab === id) {
      active = tabs[Math.min(idx, tabs.length - 1)] ?? null
    }
    set({
      openTabs: tabs,
      activeTab: active,
      previewTab: previewTab === id ? null : previewTab,
    })
  },

  setActiveTab: (id) => set({ activeTab: id }),
  setSidebarView: (v) => {
    const { sidebarView, sidebarVisible } = get()
    if (sidebarView === v && sidebarVisible) set({ sidebarVisible: false })
    else set({ sidebarView: v, sidebarVisible: true })
  },
  toggleSidebar: () => set((s) => ({ sidebarVisible: !s.sidebarVisible })),
  setSidebarWidth: (w) => set({ sidebarWidth: Math.min(400, Math.max(170, w)) }),
  togglePanel: () => set((s) => ({ panelVisible: !s.panelVisible })),
  setQuickOpen: (v) => set({ quickOpenVisible: v }),
  toggleClaude: () => set((s) => ({ claudeVisible: !s.claudeVisible })),
  toggleMarkdownRaw: (id) =>
    set((s) => ({ markdownRaw: { ...s.markdownRaw, [id]: !s.markdownRaw[id] } })),
  setMobileOverlay: (v) => set({ mobileOverlay: v }),
  setTheme: (t) => {
    try {
      localStorage.setItem(THEME_KEY, t)
    } catch {
      /* private mode etc. */
    }
    applyThemeAttr(t)
    set({ theme: t, wallpaperOn: wallpaperFor(t) })
  },
  toggleWallpaper: () =>
    set((s) => {
      const on = !s.wallpaperOn
      try {
        localStorage.setItem(WALLPAPER_KEY, on ? 'on' : 'off')
      } catch {
        /* private mode etc. */
      }
      return { wallpaperOn: on }
    }),
  setImageView: (v) => set({ imageView: v }),
  setNotFound: (path) => set({ notFound: path }),
}))
