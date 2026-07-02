# vscode-portfolio

Nirupam Changmai's portfolio — a pixel-faithful clone of the VS Code Dark+ UI.
Built with React 18, TypeScript, Vite, Tailwind, Shiki, Zustand and
`@vscode/codicons`. No Monaco — all chrome is handmade, which keeps the
bundle small (~80 KB gz initial JS; Shiki grammars lazy-load).

> UI inspired by Visual Studio Code. Not affiliated with Microsoft.

## Develop

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # typecheck + production build to dist/
```

## Where things live

| Path | What |
| --- | --- |
| `src/content/files.ts` | **All portfolio content** — the virtual file tree. Search for `TODO: NIRUPAM` |
| `src/content/meta.ts` | Real-world links (email, GitHub, LinkedIn, Instagram) |
| `src/styles/vscode.css` | Every color as a `--vscode-*` custom property |
| `src/components/claude/script.ts` | The Claude panel preset Q&A |
| `src/components/Terminal.tsx` | Fake terminal commands |
| `public/resume.pdf` | Replace with the real resume |
| `public/wallpaper.png` | Editor background art (swap freely) |
| `public/plain.html` | The static plain-HTML resume ("View plain version") |
| `public/separations/` | Per-plate PNGs for the KYD separation viewer |
| `public/images/` | Photos referenced from markdown (gamusa, XO analytics) |

## Features

- File tree ↔ tabs ↔ URL routing (deep links restore state on refresh)
- Ctrl+P quick open, Ctrl+` terminal, Ctrl+B sidebar, Ctrl+W close tab
- Shiki (`dark-plus`) highlighting, markdown preview ↔ source toggle
- Claude Code panel with typewriter script + preset questions
- Editor wallpaper (status-bar toggle, persisted), VS Code-style image viewer,
  Photoshop-style color-separation layer viewer
- Pixel cat (click it), working fake terminal (`npm run hire-me`)
- Mobile: bottom nav, drawer sidebar, full-screen Claude sheet
- `role="tree"` + arrow-key navigation; `prefers-reduced-motion` respected
