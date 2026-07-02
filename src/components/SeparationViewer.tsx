import { useMemo, useState } from 'react'
import manifest from 'virtual:images'
import { useStore } from '../store/useStore'
import { PLATE_COLORS, PLATE_FALLBACK } from '../theme/palette'

export interface SeparationLayer {
  label: string
  src: string
  /** swatch / fallback color shown when the PNG isn't exported yet */
  color?: string
}

export interface SeparationConfig {
  /** folder under public/images/ holding ordered plates (0-underbase.png, 1-red.png, …) */
  folder?: string
  /** explicit layers, used when the folder is empty/absent */
  fallback?: SeparationLayer[]
  layers?: SeparationLayer[]
}

/** "1-red.png" → { label: "Red", color: <ink color> } */
function layerFromFile(src: string): SeparationLayer {
  const base = (src.split('/').pop() ?? src).replace(/\.[a-z]+$/i, '')
  const name = base.replace(/^\d+[-_]?/, '') || base
  const label = name.charAt(0).toUpperCase() + name.slice(1)
  const color = PLATE_COLORS[name.toLowerCase()] ?? PLATE_FALLBACK
  return { label, src, color }
}

function resolveLayers(config: SeparationConfig): SeparationLayer[] {
  const fromFolder = config.folder ? (manifest[config.folder] ?? []) : []
  if (fromFolder.length > 0) return fromFolder.map(layerFromFile) // sorted by filename
  return config.layers ?? config.fallback ?? []
}

/**
 * Photoshop-style layer viewer for screen-print color separations:
 * stacked transparent PNGs + an eye toggle per plate.
 */
export default function SeparationViewer({ config }: { config: unknown }) {
  const layers = useMemo(() => resolveLayers((config ?? {}) as SeparationConfig), [config])
  if (layers.length === 0) return null
  return <Viewer layers={layers} />
}

function Viewer({ layers }: { layers: SeparationLayer[] }) {
  const [visible, setVisible] = useState<boolean[]>(() => layers.map(() => true))
  const [loaded, setLoaded] = useState<boolean[]>(() => layers.map(() => false))
  const setImageView = useStore((s) => s.setImageView)
  const anyLoaded = loaded.some(Boolean)

  const toggle = (i: number) =>
    setVisible((v) => v.map((on, j) => (j === i ? !on : on)))

  return (
    <div
      className="my-4 overflow-hidden rounded-md border"
      style={{ borderColor: 'var(--vscode-editorWidget-border)' }}
    >
      <div className="flex flex-col sm:flex-row">
        {/* canvas — checkered like a transparency grid */}
        <div
          className="relative flex min-h-[260px] flex-1 items-center justify-center"
          style={{
            backgroundImage:
              'linear-gradient(45deg, var(--portfolio-checker-square) 25%, transparent 25%), linear-gradient(-45deg, var(--portfolio-checker-square) 25%, transparent 25%), linear-gradient(45deg, transparent 75%, var(--portfolio-checker-square) 75%), linear-gradient(-45deg, transparent 75%, var(--portfolio-checker-square) 75%)',
            backgroundSize: '16px 16px',
            backgroundPosition: '0 0, 0 8px, 8px -8px, -8px 0',
            backgroundColor: 'var(--portfolio-checker-base)',
          }}
        >
          {layers.map((l, i) => (
            <img
              key={l.src}
              src={l.src}
              alt={l.label}
              onLoad={() => setLoaded((s) => s.map((x, j) => (j === i ? true : x)))}
              onError={(e) => (e.currentTarget.style.display = 'none')}
              onClick={() => setImageView({ src: l.src, alt: l.label })}
              className="absolute max-h-[85%] max-w-[85%] cursor-zoom-in transition-opacity duration-150"
              style={{ opacity: visible[i] ? 1 : 0, zIndex: i + 1 }}
              draggable={false}
            />
          ))}
          {!anyLoaded && (
            <div
              className="px-6 text-center text-[12px]"
              style={{ color: 'var(--vscode-descriptionForeground)' }}
            >
              Plate PNGs not exported yet — toggles below show the plate colors.
              <div className="mt-3 flex justify-center gap-2">
                {layers.map((l, i) =>
                  visible[i] ? (
                    <span
                      key={l.src}
                      className="inline-block h-16 w-12 rounded-sm border border-white/20"
                      style={{ background: l.color ?? PLATE_FALLBACK }}
                      title={l.label}
                    />
                  ) : null,
                )}
              </div>
            </div>
          )}
        </div>

        {/* layers panel */}
        <div
          className="w-full shrink-0 border-t sm:w-[210px] sm:border-l sm:border-t-0"
          style={{
            background: 'var(--vscode-editorWidget-background)',
            borderColor: 'var(--vscode-editorWidget-border)',
          }}
        >
          <div
            className="flex h-[26px] items-center px-2.5 text-[11px] font-bold uppercase tracking-wide"
            style={{ color: 'var(--vscode-descriptionForeground)' }}
          >
            Layers
          </div>
          <ul role="list">
            {/* Photoshop stacks top layer first */}
            {[...layers].reverse().map((l, ri) => {
              const i = layers.length - 1 - ri
              return (
                <li
                  key={l.src}
                  className="flex h-[30px] items-center gap-2 border-t px-2 text-[12px]"
                  style={{ borderColor: 'rgba(255,255,255,0.06)' }}
                >
                  <button
                    onClick={() => toggle(i)}
                    aria-label={`${visible[i] ? 'Hide' : 'Show'} ${l.label}`}
                    aria-pressed={visible[i]}
                    className="flex h-6 w-6 items-center justify-center rounded hover:bg-white/10"
                  >
                    <span
                      className={`codicon codicon-${visible[i] ? 'eye' : 'eye-closed'} !text-[15px]`}
                      style={{ opacity: visible[i] ? 1 : 0.4 }}
                      aria-hidden
                    />
                  </button>
                  <span
                    className="inline-block h-4 w-4 shrink-0 rounded-sm border border-white/20"
                    style={{ background: l.color ?? PLATE_FALLBACK }}
                    aria-hidden
                  />
                  <span className="truncate" style={{ opacity: visible[i] ? 1 : 0.5 }}>
                    {l.label}
                  </span>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </div>
  )
}
