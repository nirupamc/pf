import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import { readdirSync, statSync } from 'node:fs'
import { resolve, join } from 'node:path'

/**
 * `virtual:images` — manifest of everything under public/images/,
 * keyed by folder slug (e.g. "gamusa", "kyd/plates"), values are
 * sorted public URLs. Drop a photo in a folder → it appears on the
 * page on next build/dev restart, zero code edits.
 */
function imageManifest(): Plugin {
  const VID = 'virtual:images'
  return {
    name: 'image-manifest',
    resolveId(id) {
      if (id === VID) return '\0' + VID
    },
    load(id) {
      if (id !== '\0' + VID) return
      const root = resolve(process.cwd(), 'public/images')
      const out: Record<string, string[]> = {}
      const walk = (dir: string, slug: string) => {
        let entries: string[] = []
        try {
          entries = readdirSync(dir)
        } catch {
          return
        }
        for (const name of entries.sort()) {
          const full = join(dir, name)
          if (statSync(full).isDirectory()) {
            walk(full, slug ? `${slug}/${name}` : name)
          } else if (/\.(png|jpe?g|webp|gif|svg|avif)$/i.test(name)) {
            ;(out[slug] ??= []).push(`/images/${slug ? slug + '/' : ''}${name}`)
          }
        }
      }
      walk(root, '')
      return `export default ${JSON.stringify(out)}`
    },
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), imageManifest()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          shiki: ['shiki/core', 'shiki/engine/javascript'],
        },
      },
    },
  },
})
