import { useMemo, useState } from 'react'
import { files } from '../../content/files'
import { fuzzyMatch } from '../../lib/fuzzy'
import { useStore } from '../../store/useStore'
import FileIcon from '../FileIcon'

export default function SearchView() {
  const [query, setQuery] = useState('')
  const openFile = useStore((s) => s.openFile)

  const results = useMemo(() => {
    if (!query.trim()) return []
    return files
      .map((f) => ({ f, m: fuzzyMatch(query, f.path) }))
      .filter((r) => r.m !== null)
      .sort((a, b) => b.m!.score - a.m!.score)
  }, [query])

  return (
    <div className="px-3 py-1">
      <div
        className="flex items-center rounded-[2px] border"
        style={{
          background: 'var(--vscode-input-background)',
          borderColor: 'var(--vscode-input-border)',
        }}
      >
        <input
          autoFocus
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search files (try 'orbital')"
          aria-label="Search files"
          className="w-full bg-transparent px-2 py-[5px] text-[13px] outline-none placeholder:text-[color:var(--vscode-input-placeholderForeground)]"
          style={{ color: 'var(--vscode-input-foreground)' }}
        />
      </div>
      <p className="mt-2 px-1 text-[11px]" style={{ color: 'var(--vscode-descriptionForeground)' }}>
        Tip: press <kbd>Ctrl+P</kbd> anywhere for Quick Open.
      </p>
      <ul className="mt-1" role="list">
        {results.map(({ f }) => (
          <li key={f.id}>
            <button
              className="flex w-full items-center px-2 py-[3px] text-left text-[13px] hover:bg-[color:var(--vscode-list-hoverBackground)]"
              onClick={() => openFile(f.id)}
            >
              <FileIcon name={f.name} />
              <span className="truncate">{f.name}</span>
              <span
                className="ml-2 truncate text-[11px]"
                style={{ color: 'var(--vscode-descriptionForeground)' }}
              >
                {f.path}
              </span>
            </button>
          </li>
        ))}
        {query.trim() && results.length === 0 && (
          <li className="px-2 py-2 text-[12px]" style={{ color: 'var(--vscode-descriptionForeground)' }}>
            No results found.
          </li>
        )}
      </ul>
    </div>
  )
}
