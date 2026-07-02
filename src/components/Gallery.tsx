import manifest from 'virtual:images'
import { useStore } from '../store/useStore'

/**
 * Auto-listing image gallery: renders whatever lives in
 * public/images/<slug>/ (via the virtual:images manifest).
 * Used from markdown via ```gallery fences.
 */
export default function Gallery({ slug }: { slug: string }) {
  const setImageView = useStore((s) => s.setImageView)
  const images = manifest[slug] ?? []

  if (images.length === 0) {
    return (
      <div
        className="my-4 rounded-md border px-4 py-6 text-center text-[12px]"
        style={{
          borderColor: 'var(--vscode-editorWidget-border)',
          color: 'var(--vscode-descriptionForeground)',
        }}
      >
        No images yet — drop files into <code>public/images/{slug}/</code> and rebuild.
      </div>
    )
  }

  return (
    <div className="my-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
      {images.map((src) => (
        <button
          key={src}
          onClick={() => setImageView({ src, alt: src.split('/').pop() ?? '' })}
          className="group overflow-hidden rounded-md border"
          style={{ borderColor: 'var(--vscode-editorWidget-border)' }}
          aria-label={`Open ${src.split('/').pop()}`}
        >
          <img
            src={src}
            alt=""
            loading="lazy"
            className="aspect-[4/3] w-full cursor-zoom-in object-cover transition-transform duration-200 group-hover:scale-[1.03]"
            draggable={false}
          />
        </button>
      ))}
    </div>
  )
}
