import { lazy, Suspense, useEffect, useMemo, useState } from 'react'
import { marked } from 'marked'
import { useStore } from '../store/useStore'
import { fileById } from '../content/files'
import type { PortfolioFile } from '../content/types'
import { getHighlighter } from '../lib/highlighter'
import { OWNER } from '../content/meta'

const SeparationViewer = lazy(() => import('./SeparationViewer'))
const Gallery = lazy(() => import('./Gallery'))

export default function EditorArea() {
  const activeTab = useStore((s) => s.activeTab)
  const notFound = useStore((s) => s.notFound)
  const file = activeTab ? fileById.get(activeTab) : null

  if (notFound) return <NotFoundView path={notFound} />
  if (!file) return <WelcomeScreen />
  if (file.viewer === 'pdf') return <PdfView key={file.id} />
  if (file.viewer === 'markdown') return <MarkdownOrRaw key={file.id} file={file} />
  return <CodeView key={file.id} file={file} />
}

/** VS Code-style "file not found" editor tab for unknown deep links. */
function NotFoundView({ path }: { path: string }) {
  const openFile = useStore((s) => s.openFile)
  return (
    <div className="flex h-full flex-col items-center justify-center gap-3 px-6 text-center">
      <span className="codicon codicon-warning !text-[44px] opacity-40" aria-hidden />
      <p className="text-[14px]" style={{ color: 'var(--vscode-editor-foreground)' }}>
        The file <code className="font-mono">{path}</code> could not be found.
      </p>
      <p className="text-[12px]" style={{ color: 'var(--vscode-descriptionForeground)' }}>
        It may have been moved, renamed, or never existed. This portfolio only
        ships what's in the explorer.
      </p>
      <button
        onClick={() => openFile('readme', { preview: true })}
        className="mt-1 rounded-[2px] px-3 py-1.5 text-[13px]"
        style={{
          background: 'var(--vscode-button-background)',
          color: 'var(--vscode-button-foreground)',
        }}
      >
        Open README.md
      </button>
    </div>
  )
}

/* ------------------------------------------------------------------ */

function WelcomeScreen() {
  const openFile = useStore((s) => s.openFile)
  return (
    <div className="flex h-full flex-col items-center justify-center gap-4">
      <span
        className="font-mono text-[72px] font-bold opacity-10"
        style={{ color: 'var(--vscode-foreground)' }}
        aria-hidden
      >
        &lt;N&gt;
      </span>
      <div className="text-[13px]" style={{ color: 'var(--vscode-descriptionForeground)' }}>
        <p className="mb-2 text-center">All tabs closed. It happens.</p>
        <table className="mx-auto border-separate [border-spacing:12px_6px]">
          <tbody>
            <ShortcutRow label="Open README" keys="click" onClick={() => openFile('readme', { preview: true })} />
            <ShortcutRow label="Go to File" keys="Ctrl P" />
            <ShortcutRow label="Toggle Terminal" keys="Ctrl `" />
            <ShortcutRow label="Toggle Sidebar" keys="Ctrl B" />
          </tbody>
        </table>
      </div>
    </div>
  )
}

function ShortcutRow({ label, keys, onClick }: { label: string; keys: string; onClick?: () => void }) {
  const chips = keys.split(' ').map((k, i) => (
    <kbd
      key={i}
      className="mx-0.5 rounded border border-white/20 bg-white/10 px-1.5 py-0.5 font-mono text-[11px]"
    >
      {k}
    </kbd>
  ))
  return (
    <tr>
      <td className="text-right">
        {onClick ? (
          <button className="hover:underline" style={{ color: 'var(--vscode-textLink-foreground)' }} onClick={onClick}>
            {label}
          </button>
        ) : (
          label
        )}
      </td>
      <td>{chips}</td>
    </tr>
  )
}

/* ------------------------------------------------------------------ */

/** Cheap minimap: one bar per line, width ∝ line length. No second Shiki pass. */
function Minimap({ content }: { content: string }) {
  const lines = useMemo(() => content.split('\n').slice(0, 240), [content])
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute bottom-0 right-0 top-0 hidden w-[64px] px-1.5 py-1 lg:block"
      style={{ background: 'var(--vscode-minimap-background)' }}
    >
      {lines.map((l, i) => {
        const len = l.trim().length
        if (len === 0) return <div key={i} style={{ height: 3 }} />
        const indent = (l.length - l.trimStart().length) / 80
        return (
          <div key={i} style={{ height: 3, paddingTop: 1 }}>
            <div
              style={{
                height: 2,
                marginLeft: `${Math.min(indent * 100, 40)}%`,
                width: `${Math.min(len, 80) / 0.8}%`,
                maxWidth: '100%',
                background: 'var(--vscode-editor-foreground)',
                opacity: 0.16,
              }}
            />
          </div>
        )
      })}
    </div>
  )
}

function CodeView({ file }: { file: PortfolioFile }) {
  const [html, setHtml] = useState<string | null>(null)

  useEffect(() => {
    let alive = true
    getHighlighter().then((hl) => {
      if (!alive) return
      setHtml(
        hl.codeToHtml(file.content, { lang: file.language, theme: 'dark-plus' }),
      )
    })
    return () => {
      alive = false
    }
  }, [file])

  const lineCount = useMemo(() => file.content.split('\n').length, [file])
  // minimap only for code-like files (View behavior), never markdown preview
  const showMinimap = file.viewer === 'code'

  return (
    <div className="relative h-full">
      {showMinimap && <Minimap content={file.content} />}
      <div
        className={`flex h-full select-text overflow-auto ${showMinimap ? 'lg:pr-[64px]' : ''}`}
        tabIndex={0}
      >
      {/* line numbers */}
      <div
        aria-hidden
        className="sticky left-0 shrink-0 select-none bg-vsc-editor pl-4 pr-4 pt-2 text-right font-mono text-[13px] leading-[19px]"
        style={{ color: 'var(--vscode-editorLineNumber-foreground)' }}
      >
        {Array.from({ length: lineCount }, (_, i) => (
          <div key={i}>{i + 1}</div>
        ))}
      </div>
      <div className="min-w-0 flex-1 pb-16 pt-2">
        {html ? (
          <div dangerouslySetInnerHTML={{ __html: html }} />
        ) : (
          <pre className="shiki" style={{ color: 'var(--vscode-editor-foreground)' }}>
            <code>{file.content}</code>
          </pre>
        )}
      </div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */

function MarkdownOrRaw({ file }: { file: PortfolioFile }) {
  const raw = useStore((s) => s.markdownRaw[file.id])
  const toggle = useStore((s) => s.toggleMarkdownRaw)

  return (
    <div className="relative h-full">
      <button
        onClick={() => toggle(file.id)}
        title={raw ? 'Open Preview' : 'Open Source'}
        className="absolute right-4 top-2 z-10 flex h-[26px] items-center gap-1 rounded border border-white/15 bg-[color:var(--portfolio-editorAction-background)] px-2 text-[12px] hover:bg-[color:var(--portfolio-editorAction-hoverBackground)]"
      >
        <span
          className={`codicon codicon-${raw ? 'open-preview' : 'go-to-file'} !text-[14px]`}
          aria-hidden
        />
        {raw ? 'Preview' : 'Source'}
      </button>
      {raw ? <CodeView file={file} /> : <MarkdownPreview file={file} />}
    </div>
  )
}

type Block =
  | { kind: 'md'; md: string }
  | { kind: 'separation'; config: unknown }
  | { kind: 'gallery'; slug: string }

/** Splits markdown on ```separation (JSON) and ```gallery (slug) fences. */
function splitBlocks(content: string): Block[] {
  const parts: Block[] = []
  const re = /```(separation|gallery)\n([\s\S]*?)```/g
  let last = 0
  let m: RegExpExecArray | null
  while ((m = re.exec(content))) {
    if (m.index > last) parts.push({ kind: 'md', md: content.slice(last, m.index) })
    if (m[1] === 'gallery') {
      parts.push({ kind: 'gallery', slug: m[2].trim() })
    } else {
      try {
        parts.push({ kind: 'separation', config: JSON.parse(m[2]) })
      } catch {
        parts.push({ kind: 'md', md: m[0] }) // malformed config: show raw
      }
    }
    last = m.index + m[0].length
  }
  if (last < content.length) parts.push({ kind: 'md', md: content.slice(last) })
  return parts
}

function MarkdownPreview({ file }: { file: PortfolioFile }) {
  const setImageView = useStore((s) => s.setImageView)
  const parts = useMemo(() => splitBlocks(file.content), [file])

  // clicking an inline markdown image opens the image viewer
  const onClick = (e: React.MouseEvent) => {
    const t = e.target as HTMLElement
    if (t.tagName === 'IMG') {
      const img = t as HTMLImageElement
      setImageView({ src: img.getAttribute('src') ?? '', alt: img.alt })
    }
  }

  // hide images whose file doesn't exist yet (e.g. the me.md profile slot)
  const onImgError = (e: React.SyntheticEvent) => {
    const t = e.target as HTMLElement
    if (t.tagName === 'IMG') t.style.display = 'none'
  }

  return (
    <div className="h-full overflow-auto">
      <div
        className="markdown-body mx-auto max-w-[760px] px-6 py-6"
        onClick={onClick}
        onErrorCapture={onImgError}
      >
        {parts.map((p, i) =>
          p.kind === 'md' ? (
            <div
              key={i}
              dangerouslySetInnerHTML={{
                __html: marked.parse(p.md, { async: false }) as string,
              }}
            />
          ) : (
            <Suspense
              key={i}
              fallback={
                <div
                  className="my-4 h-[200px] rounded-md border"
                  style={{ borderColor: 'var(--vscode-editorWidget-border)' }}
                />
              }
            >
              {p.kind === 'gallery' ? (
                <Gallery slug={p.slug} />
              ) : (
                <SeparationViewer config={p.config} />
              )}
            </Suspense>
          ),
        )}
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */

function PdfView() {
  return (
    <div className="flex h-full flex-col bg-vsc-editor">
      <div
        className="flex h-[34px] shrink-0 items-center justify-end gap-2 border-b px-3"
        style={{
          borderColor: 'var(--vscode-panel-border)',
          background: 'var(--portfolio-editorAction-background)',
        }}
      >
        <span className="mr-auto text-[12px]" style={{ color: 'var(--vscode-descriptionForeground)' }}>
          resume.pdf — {OWNER.name}
        </span>
        <a
          href="/resume.pdf"
          download
          className="flex items-center gap-1.5 rounded-[2px] px-2 py-1 text-[12px]"
          style={{
            background: 'var(--vscode-button-background)',
            color: 'var(--vscode-button-foreground)',
          }}
        >
          <span className="codicon codicon-cloud-download !text-[14px]" aria-hidden />
          Download
        </a>
      </div>
      <iframe
        title="Resume PDF"
        src="/resume.pdf"
        className="min-h-0 w-full flex-1 border-0 bg-[color:var(--portfolio-pdf-background)]"
      />
    </div>
  )
}
