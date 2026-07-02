import { useMemo, useRef, useState } from 'react'
import { tree, fileById } from '../content/files'
import type { TreeNode } from '../content/types'
import { useStore } from '../store/useStore'
import FileIcon from './FileIcon'
import FolderIcon from './FolderIcon'

interface Row {
  key: string
  depth: number
  label: string
  isFolder: boolean
  expanded?: boolean
  fileId?: string
}

/** Flattens the tree into visible rows given the expanded-folder set. */
function flatten(nodes: TreeNode[], expanded: Set<string>, depth = 0, prefix = ''): Row[] {
  const rows: Row[] = []
  for (const node of nodes) {
    if (node.kind === 'folder') {
      const key = prefix + node.name
      const isOpen = expanded.has(key)
      rows.push({ key, depth, label: node.name, isFolder: true, expanded: isOpen })
      if (isOpen) rows.push(...flatten(node.children, expanded, depth + 1, key + '/'))
    } else {
      const f = fileById.get(node.fileId)
      if (f) {
        rows.push({
          key: 'file:' + f.id,
          depth,
          label: f.name,
          isFolder: false,
          fileId: f.id,
        })
      }
    }
  }
  return rows
}

export default function FileTree() {
  const [expanded, setExpanded] = useState<Set<string>>(
    () => new Set(['about', 'experience', 'education', 'projects']),
  )
  const [focusIdx, setFocusIdx] = useState(0)
  const activeTab = useStore((s) => s.activeTab)
  const openFile = useStore((s) => s.openFile)
  const listRef = useRef<HTMLUListElement>(null)

  const rows = useMemo(() => flatten(tree, expanded), [expanded])

  const toggleFolder = (key: string) => {
    setExpanded((prev) => {
      const next = new Set(prev)
      if (next.has(key)) next.delete(key)
      else next.add(key)
      return next
    })
  }

  const activate = (row: Row, preview: boolean) => {
    if (row.isFolder) toggleFolder(row.key)
    else if (row.fileId) openFile(row.fileId, { preview })
  }

  const onKeyDown = (e: React.KeyboardEvent) => {
    const max = rows.length - 1
    const row = rows[focusIdx]
    let next = focusIdx
    switch (e.key) {
      case 'ArrowDown':
        next = Math.min(max, focusIdx + 1)
        break
      case 'ArrowUp':
        next = Math.max(0, focusIdx - 1)
        break
      case 'ArrowRight':
        if (row?.isFolder && !row.expanded) {
          toggleFolder(row.key)
          e.preventDefault()
          return
        }
        next = Math.min(max, focusIdx + 1)
        break
      case 'ArrowLeft':
        if (row?.isFolder && row.expanded) {
          toggleFolder(row.key)
          e.preventDefault()
          return
        }
        next = Math.max(0, focusIdx - 1)
        break
      case 'Home':
        next = 0
        break
      case 'End':
        next = max
        break
      case 'Enter':
      case ' ':
        if (row) activate(row, false)
        e.preventDefault()
        return
      default:
        return
    }
    e.preventDefault()
    setFocusIdx(next)
    const el = listRef.current?.children[next] as HTMLElement | undefined
    el?.focus()
  }

  return (
    <ul
      ref={listRef}
      role="tree"
      aria-label="Portfolio files"
      className="py-0.5 font-ui text-[13px] leading-[22px]"
      onKeyDown={onKeyDown}
    >
      {rows.map((row, i) => {
        const isActive = !row.isFolder && row.fileId === activeTab
        return (
          <li
            key={row.key}
            role="treeitem"
            aria-expanded={row.isFolder ? row.expanded : undefined}
            aria-selected={isActive}
            aria-level={row.depth + 1}
            tabIndex={i === focusIdx ? 0 : -1}
            onFocus={() => setFocusIdx(i)}
            onClick={() => activate(row, true)}
            onDoubleClick={() => activate(row, false)}
            className="relative flex cursor-pointer items-center whitespace-nowrap [outline:none] focus-visible:[outline:1px_solid_var(--vscode-list-focusOutline)] focus-visible:-outline-offset-1"
            style={{
              paddingLeft: 12 + row.depth * 8,
              height: 22,
              background: isActive
                ? 'var(--vscode-list-activeSelectionBackground)'
                : undefined,
              color: isActive ? 'var(--vscode-list-activeSelectionForeground)' : undefined,
            }}
            onMouseEnter={(e) => {
              if (!isActive)
                e.currentTarget.style.background = 'var(--vscode-list-hoverBackground)'
            }}
            onMouseLeave={(e) => {
              if (!isActive) e.currentTarget.style.background = ''
            }}
          >
            {/* indent guides: 1px, subtle */}
            {Array.from({ length: row.depth }, (_, g) => (
              <span
                key={g}
                aria-hidden
                className="absolute bottom-0 top-0 w-px"
                style={{
                  left: 19 + g * 8,
                  background: 'var(--vscode-editorIndentGuide-background)',
                  opacity: 0.25,
                }}
              />
            ))}
            {row.isFolder ? (
              <>
                <span
                  className={`codicon codicon-chevron-${row.expanded ? 'down' : 'right'} mr-0.5 !text-[16px] opacity-80`}
                  aria-hidden
                />
                <FolderIcon name={row.label} open={row.expanded} />
                <span>{row.label}</span>
              </>
            ) : (
              <>
                <span className="w-[16px] shrink-0" />
                {row.fileId && <FileIcon name={fileById.get(row.fileId)!.name} />}
                <span className="truncate">{row.label}</span>
              </>
            )}
          </li>
        )
      })}
    </ul>
  )
}
