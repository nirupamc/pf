/**
 * THEME DEFINITION FILE (non-CSS colors).
 * Fixed palettes that don't change with the workbench theme:
 * pixel-art sprites, brand marks, and print-plate colors.
 * Components import from here — no hex literals in src/components.
 */

/** Pixel-pet sprite + castle backdrop colors */
export const SPRITE = {
  ink: '#101010',
  cat: { body: '#8a5a3b', dark: '#6b4226', face: '#c98d5e' },
  dog: { body: '#8d9299', dark: '#5f646b', face: '#c9cdd2' },
  chicken: { body: '#ececec', shade: '#d8d8d8', comb: '#c0392b', beak: '#d98826' },
  castle: {
    sky: '#1d1b2e',
    star: '#cfcbe0',
    moon: '#d8d4c2',
    stone: '#3c3654',
    stoneDark: '#2c2740',
    wall: '#332e4a',
    door: '#241f36',
    window: '#e8b04b',
    floor: '#403a5c',
  },
  ball: { fill: '#d9483b', shade: '#97271d' },
} as const

/** Screen-print plate name → ink color (KYD separation viewer) */
export const PLATE_COLORS: Record<string, string> = {
  underbase: '#f5f5f5',
  white: '#f5f5f5',
  red: '#c0392b',
  black: '#1a1a1a',
  blue: '#2472c8',
  yellow: '#e5c04b',
  green: '#3f9d5a',
}
export const PLATE_FALLBACK = '#888888'

/** Brand colors for the Extensions ("my stack") view */
export const BRAND = {
  react: '#61dafb',
  typescript: '#3178c6',
  nextjs: '#e8e8e8',
  nodejs: '#68a063',
  python: '#ffd43b',
  llm: '#c98df5',
  graphql: '#e10098',
  tailwind: '#38bdf8',
  threejs: '#049ef4',
  photoshop: '#31a8ff',
  docker: '#2496ed',
  githubActions: '#8250df',
  tile: '#2d2d2d',
} as const
