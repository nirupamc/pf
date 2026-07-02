import { useEffect, useState } from 'react'
import { useStore } from '../store/useStore'

const ZOOMS = [0.25, 0.5, 0.75, 1, 1.5, 2, 3, 4]

/** VS Code-style image preview: checkered background, zoom %, dimensions. */
export default function ImageViewer() {
  const imageView = useStore((s) => s.imageView)
  const setImageView = useStore((s) => s.setImageView)
  const [zoomIdx, setZoomIdx] = useState(3) // 100%
  const [dims, setDims] = useState<{ w: number; h: number } | null>(null)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    setZoomIdx(3)
    setDims(null)
    setFailed(false)
  }, [imageView?.src])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setImageView(null)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [setImageView])

  if (!imageView) return null
  const zoom = ZOOMS[zoomIdx]
  const name = imageView.src.split('/').pop() ?? imageView.src

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col"
      role="dialog"
      aria-modal="true"
      aria-label={`Image preview: ${name}`}
      style={{ background: 'var(--vscode-editor-background)' }}
    >
      {/* fake tab header */}
      <div
        className="flex h-[35px] shrink-0 items-center border-b px-3 text-[13px]"
        style={{
          background: 'var(--vscode-editorGroupHeader-tabsBackground)',
          borderColor: 'var(--vscode-panel-border)',
        }}
      >
        <span className="codicon codicon-file-media mr-1.5 !text-[14px] opacity-80" aria-hidden />
        <span className="truncate">{name}</span>
        <span className="ml-2 text-[11px] opacity-50">(preview)</span>
        <button
          className="ml-auto flex h-6 w-6 items-center justify-center rounded hover:bg-white/10"
          onClick={() => setImageView(null)}
          aria-label="Close image preview"
        >
          <span className="codicon codicon-close !text-[16px]" aria-hidden />
        </button>
      </div>

      {/* checkered canvas */}
      <div
        className="flex min-h-0 flex-1 items-center justify-center overflow-auto"
        style={{
          backgroundImage:
            'linear-gradient(45deg, var(--portfolio-checker-square) 25%, transparent 25%), linear-gradient(-45deg, var(--portfolio-checker-square) 25%, transparent 25%), linear-gradient(45deg, transparent 75%, var(--portfolio-checker-square) 75%), linear-gradient(-45deg, transparent 75%, var(--portfolio-checker-square) 75%)',
          backgroundSize: '20px 20px',
          backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0',
          backgroundColor: 'var(--portfolio-checker-base)',
        }}
        onClick={() => setImageView(null)}
      >
        {failed ? (
          <div
            className="rounded border px-6 py-4 text-[13px]"
            style={{
              background: 'var(--vscode-editorWidget-background)',
              borderColor: 'var(--vscode-editorWidget-border)',
              color: 'var(--vscode-descriptionForeground)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            Image not found: <code className="font-mono">{imageView.src}</code>
            <br />
            (asset not added yet — see the TODO list)
          </div>
        ) : (
          <img
            src={imageView.src}
            alt={imageView.alt}
            onClick={(e) => e.stopPropagation()}
            onError={() => setFailed(true)}
            onLoad={(e) =>
              setDims({
                w: e.currentTarget.naturalWidth,
                h: e.currentTarget.naturalHeight,
              })
            }
            style={{
              transform: `scale(${zoom})`,
              imageRendering: zoom >= 2 ? 'pixelated' : 'auto',
              maxWidth: zoom <= 1 ? '90%' : 'none',
              maxHeight: zoom <= 1 ? '90%' : 'none',
            }}
            className="select-none shadow-2xl"
            draggable={false}
          />
        )}
      </div>

      {/* status bar strip: zoom + dimensions, like VS Code's image preview */}
      <div
        className="flex h-[22px] shrink-0 items-center gap-1 px-2 text-[12px]"
        style={{
          background: 'var(--vscode-statusBar-background)',
          color: 'var(--vscode-statusBar-foreground)',
        }}
      >
        <button
          className="flex h-full items-center px-1.5 hover:bg-white/10"
          onClick={() => setZoomIdx((i) => Math.max(0, i - 1))}
          aria-label="Zoom out"
          title="Zoom out"
        >
          <span className="codicon codicon-zoom-out !text-[13px]" aria-hidden />
        </button>
        <span className="min-w-[44px] text-center">{Math.round(zoom * 100)}%</span>
        <button
          className="flex h-full items-center px-1.5 hover:bg-white/10"
          onClick={() => setZoomIdx((i) => Math.min(ZOOMS.length - 1, i + 1))}
          aria-label="Zoom in"
          title="Zoom in"
        >
          <span className="codicon codicon-zoom-in !text-[13px]" aria-hidden />
        </button>
        <span className="ml-auto">{dims ? `${dims.w} × ${dims.h}` : failed ? 'missing asset' : '…'}</span>
      </div>
    </div>
  )
}
