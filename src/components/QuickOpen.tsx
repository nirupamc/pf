import { useEffect, useMemo, useRef, useState } from 'react'
import { files } from '../content/files'
import { fuzzyMatch } from '../lib/fuzzy'
import { useStore } from '../store/useStore'
import FileIcon from './FileIcon'

function Highlighted({ text, indices }: { text: string; indices: number[] }) {
  const set = new Set(indices)
  return (
    <>
      {text.split('').map((ch, i) =>
        set.has(i) ? (
          <span key={i} className="font-semibold" style={{ color: 'var(--vscode-pickerGroup-foreground)' }}>
            {ch}
          </span>
        ) : (
          <span key={i}>{ch}</span>
        ),
      )}
    </>
  )
}

export default function QuickOpen() {
  const visible = useStore((s) => s.quickOpenVisible)
  const setQuickOpen = useStore((s) => s.setQuickOpen)
  const openFile = useStore((s) => s.openFile)
  const [query, setQuery] = useState('')
  const [sel, setSel] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (visible) {
      setQuery('')
      setSel(0)
      // focus after mount
      requestAnimationFrame(() => inputRef.current?.focus())
    }
  }, [visible])

  const results = useMemo(() => {
    const scored = files
      .map((f) => ({ f, m: fuzzyMatch(query, f.name + ' ' + f.path) }))
      .filter((r) => r.m !== null)
      .sort((a, b) => b.m!.score - a.m!.score)
    return scored
  }, [query])

  if (!visible) return null

  const pick = (id: string) => {
    openFile(id)
    setQuickOpen(false)
  }

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') setQuickOpen(false)
    else if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSel((s) => Math.min(results.length - 1, s + 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSel((s) => Math.max(0, s - 1))
    } else if (e.key === 'Enter') {
      const r = results[sel]
      if (r) pick(r.f.id)
    }
  }

  return (
    <div
      className="fixed inset-0 z-50"
      onClick={() => setQuickOpen(false)}
      role="dialog"
      aria-modal="true"
      aria-label="Go to file"
    >
      <div
        className="mx-auto mt-[8vh] w-[600px] max-w-[92vw] overflow-hidden rounded-md border shadow-2xl"
        style={{
          background: 'var(--vscode-quickInput-background)',
          borderColor: 'var(--vscode-editorWidget-border)',
          boxShadow: '0 4px 20px var(--vscode-widget-shadow)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-1.5">
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setSel(0)
            }}
            onKeyDown={onKeyDown}
            placeholder="Search files by name (append : to go to line — kidding, there's no line)"
            aria-label="Search files by name"
            className="w-full rounded-[2px] border px-2 py-[5px] text-[13px] outline-none"
            style={{
              background: 'var(--vscode-input-background)',
              borderColor: 'var(--vscode-focusBorder)',
              color: 'var(--vscode-input-foreground)',
            }}
          />
        </div>
        <ul className="max-h-[45vh] overflow-y-auto pb-1" role="listbox">
          {results.map(({ f, m }, i) => (
            <li key={f.id} role="option" aria-selected={i === sel}>
              <button
                className="flex w-full items-center px-3 py-[3px] text-left text-[13px]"
                style={{
                  background: i === sel ? 'var(--vscode-quickInputList-focusBackground)' : undefined,
                  color:
                    i === sel
                      ? 'var(--vscode-list-activeSelectionForeground)'
                      : 'var(--vscode-foreground)',
                }}
                onMouseEnter={() => setSel(i)}
                onClick={() => pick(f.id)}
              >
                <FileIcon name={f.name} />
                <span className="truncate">
                  <Highlighted
                    text={f.name}
                    indices={(m!.indices ?? []).filter((x) => x < f.name.length)}
                  />
                </span>
                <span className="ml-2 truncate text-[12px] opacity-60">{f.path}</span>
              </button>
            </li>
          ))}
          {results.length === 0 && (
            <li className="px-3 py-2 text-[13px]" style={{ color: 'var(--vscode-descriptionForeground)' }}>
              No matching results
            </li>
          )}
        </ul>
      </div>
    </div>
  )
}
