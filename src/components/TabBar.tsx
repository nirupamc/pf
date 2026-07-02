import { useStore } from '../store/useStore'
import { fileById } from '../content/files'
import FileIcon from './FileIcon'

export default function TabBar() {
  const openTabs = useStore((s) => s.openTabs)
  const activeTab = useStore((s) => s.activeTab)
  const previewTab = useStore((s) => s.previewTab)
  const setActiveTab = useStore((s) => s.setActiveTab)
  const openFile = useStore((s) => s.openFile)
  const closeTab = useStore((s) => s.closeTab)
  const file = activeTab ? fileById.get(activeTab) : null

  return (
    <div className="shrink-0">
      <div
        className="flex h-[35px] overflow-x-auto overflow-y-hidden [scrollbar-width:thin]"
        style={{ background: 'var(--vscode-editorGroupHeader-tabsBackground)' }}
        role="tablist"
        aria-label="Open files"
      >
        {openTabs.map((id) => {
          const f = fileById.get(id)
          if (!f) return null
          const active = id === activeTab
          const isPreview = id === previewTab
          return (
            <div
              key={id}
              role="tab"
              aria-selected={active}
              tabIndex={0}
              onClick={() => setActiveTab(id)}
              onDoubleClick={() => openFile(id)} // promote preview tab
              onKeyDown={(e) => e.key === 'Enter' && setActiveTab(id)}
              onAuxClick={(e) => e.button === 1 && closeTab(id)}
              className="group relative flex h-full min-w-fit cursor-pointer select-none items-center gap-1.5 border-r pl-2.5 pr-1 text-[13px]"
              style={{
                background: active
                  ? 'var(--vscode-tab-activeBackground)'
                  : 'var(--vscode-tab-inactiveBackground)',
                color: active
                  ? 'var(--vscode-tab-activeForeground)'
                  : 'var(--vscode-tab-inactiveForeground)',
                borderRightColor: 'var(--vscode-tab-border)',
                boxShadow: active
                  ? 'inset 0 1px 0 var(--vscode-tab-activeBorderTop)'
                  : undefined,
              }}
            >
              <FileIcon name={f.name} />
              <span className={isPreview ? 'italic' : ''}>{f.name}</span>
              <button
                aria-label={`Close ${f.name}`}
                onClick={(e) => {
                  e.stopPropagation()
                  closeTab(id)
                }}
                className={`ml-1 flex h-5 w-5 items-center justify-center rounded hover:bg-white/10 ${
                  active ? '' : 'opacity-0 group-hover:opacity-100 focus:opacity-100'
                }`}
              >
                <span className="codicon codicon-close !text-[14px]" aria-hidden />
              </button>
            </div>
          )
        })}
      </div>

      {/* breadcrumbs */}
      {file && (
        <div
          className="flex h-[22px] items-center gap-1 bg-vsc-editor px-3 text-[12px]"
          style={{ color: 'var(--vscode-breadcrumb-foreground)' }}
          aria-label="Breadcrumbs"
        >
          {file.path.split('/').map((seg, i, arr) => (
            <span key={i} className="flex items-center gap-1">
              {i > 0 && (
                <span className="codicon codicon-chevron-right !text-[12px] opacity-60" aria-hidden />
              )}
              <span className={i === arr.length - 1 ? '' : 'opacity-80'}>{seg}</span>
            </span>
          ))}
        </div>
      )}
    </div>
  )
}
