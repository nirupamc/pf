import { useState } from 'react'
import { useStore } from '../store/useStore'
import { fileById } from '../content/files'

/**
 * Decorative editor-background wallpaper, VS Code custom-background style:
 * right-aligned, low opacity, editor pane only, never clickable.
 * Swap the art by replacing public/wallpaper.png.
 * TODO: NIRUPAM — supply image
 */
export default function Wallpaper() {
  const wallpaperOn = useStore((s) => s.wallpaperOn)
  const activeTab = useStore((s) => s.activeTab)
  const [missing, setMissing] = useState(false)

  if (!wallpaperOn || missing) return null

  // dim further when a long file is open so text stays readable
  const file = activeTab ? fileById.get(activeTab) : null
  const dense = (file?.content.length ?? 0) > 2500
  const opacity = dense ? 0.09 : 0.13

  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 hidden overflow-hidden md:block"
      aria-hidden
    >
      {/* anchored bottom-right of the editor column: stable under scroll,
          tab switches and panel toggles (the terminal simply overlaps it) */}
      <img
        src="/wallpaper.png"
        alt=""
        onError={() => setMissing(true)}
        className="absolute bottom-0 right-0 h-[96%] max-w-[96%] object-contain object-right-bottom transition-opacity duration-300"
        style={{ opacity }}
        draggable={false}
      />
    </div>
  )
}
