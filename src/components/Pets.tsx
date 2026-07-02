import { useEffect, useRef, useState } from 'react'
import { SPRITE } from '../theme/palette'

/*
 * Pet behavior ported from vscode-pets by Anthony Shaw & contributors
 * (github.com/tonybaloney/vscode-pets, MIT): randomized state machine
 * (idle ↔ walk ↔ run ↔ lie ↔ swipe), ball chasing with a with_ball catch
 * state, and Totoro's wall-climb sequence (run → wallgrab → wallclimb →
 * fall_from_grab → land). Sprite GIFs live in public/pets/.
 */

export type PetKind = { species: 'panda' | 'totoro'; color: 'black' | 'brown' | 'gray' }

type State =
  | 'idle'
  | 'walk'
  | 'run'
  | 'lie'
  | 'swipe'
  | 'chase'
  | 'with_ball'
  | 'climb_run'
  | 'wallgrab'
  | 'wallclimb'
  | 'fall'
  | 'land'

const BOX_H = 180
const FLOOR = 8
const PET_H: Record<PetKind['species'], number> = { panda: 58, totoro: 64 }
const PET_W = 64 // rough sprite width for edge math
const CLIMB_TOP = BOX_H - 92 // how high totoro climbs before letting go
const PETS_KEY = 'vsc-portfolio-pets-v2'
const CYCLE: PetKind[] = [
  { species: 'panda', color: 'black' },
  { species: 'panda', color: 'brown' },
  { species: 'totoro', color: 'gray' },
]
const NAMES: Record<PetKind['species'], string[]> = {
  panda: ['Po', 'Bao', 'Mochi'],
  totoro: ['Totoro', 'Chibi', 'Chū'],
}

const gif = (k: PetKind, state: string) => `/pets/${k.species}/${k.color}/${state}.gif`

/** state → GIF name (species-aware, mirroring the original's state map) */
function gifFor(k: PetKind, s: State): string {
  switch (s) {
    case 'walk':
      return gif(k, 'walk')
    case 'run':
    case 'climb_run':
      return gif(k, 'run')
    case 'chase':
      return k.species === 'panda' ? gif(k, 'walk_fast') : gif(k, 'run')
    case 'lie':
      return gif(k, 'lie')
    case 'swipe':
      return gif(k, 'swipe')
    case 'with_ball':
      return gif(k, 'with_ball')
    case 'wallgrab':
      return gif(k, 'wallgrab')
    case 'wallclimb':
      return gif(k, 'wallclimb')
    case 'fall':
      return gif(k, 'fall_from_grab')
    case 'land':
      return gif(k, 'land')
    default:
      return gif(k, 'idle')
  }
}

interface Ball {
  x: number
  y: number
  vx: number
  vy: number
  resting: boolean
}

interface Runtime {
  id: number
  kind: PetKind
  el: HTMLElement | null
  img: HTMLImageElement | null
  x: number
  y: number
  dir: 1 | -1
  state: State
  until: number
  target: number
  wall: 1 | -1
  vy: number
  currentSrc: string
}

function loadRoster(): PetKind[] {
  try {
    const raw = JSON.parse(localStorage.getItem(PETS_KEY) ?? '')
    if (Array.isArray(raw)) {
      const ok = raw.filter(
        (p): p is PetKind =>
          p &&
          ((p.species === 'panda' && (p.color === 'black' || p.color === 'brown')) ||
            (p.species === 'totoro' && p.color === 'gray')),
      )
      if (ok.length) return ok.slice(0, 4)
    }
  } catch {
    /* first visit */
  }
  return [CYCLE[0], CYCLE[2]] // one panda + one totoro
}

/* ---------------- castle backdrop (original pixel-art SVG) ---------------- */
function Castle() {
  const c = SPRITE.castle
  return (
    <svg
      className="absolute inset-0 h-full w-full"
      preserveAspectRatio="xMidYMax slice"
      viewBox="0 0 260 180"
      aria-hidden
    >
      <rect width="260" height="180" fill={c.sky} />
      <circle cx="225" cy="26" r="10" fill={c.moon} opacity="0.7" />
      <circle cx="221" cy="23" r="8.5" fill={c.sky} opacity="0.85" />
      {[[40, 22], [90, 44], [150, 18], [200, 60], [30, 70], [120, 80]].map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r="1" fill={c.star} opacity="0.8" />
      ))}
      {/* tower */}
      <rect x="14" y="52" width="58" height="122" fill={c.stone} />
      <rect x="14" y="52" width="58" height="5" fill={c.stoneDark} />
      {[12, 32, 52].map((x) => (
        <rect key={x} x={x} y="42" width="9" height="12" fill={c.stone} />
      ))}
      <rect x="64" y="42" width="8" height="12" fill={c.stone} />
      <path d="M34 174 v-26 a9 9 0 0 1 18 0 v26 z" fill={c.door} />
      <rect x="24" y="68" width="7" height="11" fill={c.window} opacity="0.85" />
      <rect x="54" y="68" width="7" height="11" fill={c.window} opacity="0.6" />
      <rect x="39" y="92" width="7" height="11" fill={c.window} opacity="0.4" />
      <rect x="24" y="116" width="7" height="11" fill={c.window} opacity="0.5" />
      {/* wall */}
      <rect x="72" y="118" width="188" height="56" fill={c.wall} />
      <rect x="72" y="118" width="188" height="4" fill={c.stoneDark} />
      {[76, 102, 128, 154, 180, 206, 232].map((x) => (
        <rect key={x} x={x} y="110" width="15" height="8" fill={c.wall} />
      ))}
      <rect x="150" y="136" width="7" height="10" fill={c.window} opacity="0.35" />
      <rect x="210" y="136" width="7" height="10" fill={c.window} opacity="0.5" />
      {/* floor */}
      <rect x="0" y="172" width="260" height="8" fill={c.floor} />
      {[0, 26, 52, 78, 104, 130, 156, 182, 208, 234].map((x) => (
        <rect key={x} x={x + 2} y="175" width="22" height="1" fill={c.stoneDark} />
      ))}
    </svg>
  )
}

export default function Pets() {
  const [roster, setRoster] = useState<PetKind[]>(loadRoster)
  const [open, setOpen] = useState(true)
  const [tooltip, setTooltip] = useState<number | null>(null)
  const areaRef = useRef<HTMLDivElement>(null)
  const ballElRef = useRef<HTMLDivElement>(null)
  const world = useRef<{ ball: Ball | null; pets: Map<number, Runtime> }>({
    ball: null,
    pets: new Map(),
  })
  const reduced = useRef(window.matchMedia('(prefers-reduced-motion: reduce)').matches)

  useEffect(() => {
    try {
      localStorage.setItem(PETS_KEY, JSON.stringify(roster))
    } catch {
      /* ignore */
    }
  }, [roster])

  // one shared rAF drives every pet + the ball
  useEffect(() => {
    if (reduced.current || !open) return
    let raf = 0
    let last = performance.now()

    const setSrc = (pet: Runtime, s: State) => {
      const src = gifFor(pet.kind, s)
      if (pet.img && pet.currentSrc !== src) {
        pet.currentSrc = src
        pet.img.src = src
      }
    }

    const tick = (now: number) => {
      raf = requestAnimationFrame(tick)
      const dt = Math.min(50, now - last)
      last = now
      const w = world.current
      const areaW = areaRef.current?.clientWidth ?? 240
      const maxX = Math.max(20, areaW - PET_W)

      /* ball physics */
      if (w.ball) {
        const b = w.ball
        if (!b.resting) {
          b.vy -= 0.0012 * dt
          b.x += b.vx * dt
          b.y += b.vy * dt
          if (b.x > areaW - 10) {
            b.x = areaW - 10
            b.vx *= -0.6
          }
          if (b.y <= 0) {
            b.y = 0
            b.vy = Math.abs(b.vy) * 0.55
            b.vx *= 0.8
            if (b.vy < 0.03) {
              b.vy = 0
              b.resting = true
            }
          }
        }
        if (ballElRef.current) {
          ballElRef.current.style.transform = `translate(${b.x}px, ${-b.y - FLOOR}px)`
        }
      }

      for (const pet of w.pets.values()) {
        if (!pet.el) continue
        const grounded = !['wallgrab', 'wallclimb', 'fall'].includes(pet.state)

        // ball beats everything except an in-progress climb; only the
        // nearest pet chases, and chasers stand down when the ball is gone
        // or another pet gets closer
        if (grounded && pet.state !== 'with_ball') {
          if (w.ball) {
            let nearest: Runtime | null = null
            for (const p of w.pets.values()) {
              if (['wallgrab', 'wallclimb', 'fall'].includes(p.state)) continue
              if (!nearest || Math.abs(p.x - w.ball.x) < Math.abs(nearest.x - w.ball.x))
                nearest = p
            }
            if (nearest === pet) pet.state = 'chase'
            else if (pet.state === 'chase') {
              pet.state = 'idle'
              pet.until = now + 800 + Math.random() * 1500
            }
          } else if (pet.state === 'chase') {
            pet.state = 'idle'
            pet.until = now + 800 + Math.random() * 1500
          }
        }

        // timed transitions (vscode-pets style randomized schedule)
        if (now > pet.until && !['chase', 'climb_run', 'wallgrab', 'wallclimb', 'fall'].includes(pet.state)) {
          const r = Math.random()
          if (r < 0.32) {
            pet.state = 'walk'
            pet.target = 4 + Math.random() * (maxX - 4)
            pet.until = now + 12000
          } else if (r < 0.47) {
            pet.state = 'run'
            pet.target = 4 + Math.random() * (maxX - 4)
            pet.until = now + 8000
          } else if (r < 0.62) {
            pet.state = 'lie'
            pet.until = now + 4000 + Math.random() * 4000
          } else if (r < 0.74) {
            pet.state = 'swipe'
            pet.until = now + 1400
          } else if (r < 0.84 && pet.kind.species === 'totoro') {
            // Totoro heads for a wall
            pet.state = 'climb_run'
            pet.wall = pet.x > maxX / 2 ? 1 : -1
            pet.target = pet.wall === 1 ? maxX : 2
          } else {
            pet.state = 'idle'
            pet.until = now + 2000 + Math.random() * 3000
          }
        }

        /* movement per state */
        if (pet.state === 'walk' || pet.state === 'run' || pet.state === 'chase' || pet.state === 'climb_run') {
          const target =
            pet.state === 'chase' && w.ball
              ? Math.min(maxX, Math.max(2, w.ball.x - PET_W / 2))
              : pet.target
          const dx = target - pet.x
          if (Math.abs(dx) < 4) {
            if (pet.state === 'chase' && w.ball && w.ball.resting) {
              w.ball = null
              if (ballElRef.current) ballElRef.current.style.display = 'none'
              pet.state = 'with_ball'
              pet.until = now + 2400
            } else if (pet.state === 'climb_run') {
              pet.state = 'wallgrab'
              pet.dir = pet.wall
              pet.until = now + 700
            } else if (pet.state !== 'chase') {
              pet.state = 'idle'
              pet.until = now + 1500 + Math.random() * 2000
            }
          } else {
            pet.dir = dx > 0 ? 1 : -1
            const speed =
              pet.state === 'walk' ? 0.03 : pet.state === 'chase' ? 0.065 : 0.06
            pet.x = Math.min(maxX, Math.max(2, pet.x + pet.dir * speed * dt))
          }
        } else if (pet.state === 'wallgrab') {
          if (now > pet.until) pet.state = 'wallclimb'
        } else if (pet.state === 'wallclimb') {
          pet.y += 0.045 * dt
          if (pet.y >= CLIMB_TOP) {
            pet.state = 'fall'
            pet.vy = 0
          }
        } else if (pet.state === 'fall') {
          pet.vy += 0.0015 * dt
          pet.y -= pet.vy * dt
          if (pet.y <= 0) {
            pet.y = 0
            pet.state = 'land'
            pet.until = now + 700
          }
        } else if (pet.state === 'land' && now > pet.until) {
          pet.state = 'idle'
          pet.until = now + 1500 + Math.random() * 2000
        }

        setSrc(pet, pet.state)
        pet.el.style.transform = `translate(${pet.x}px, ${-pet.y}px)`
        // sprites face left natively (vscode-pets convention): flip only the
        // image when moving right, so the name tooltip never mirrors
        if (pet.img) pet.img.style.transform = `scaleX(${pet.dir === 1 ? -1 : 1})`
      }
    }
    raf = requestAnimationFrame(tick)

    // deterministic climb trigger for tests: window.dispatchEvent(new Event('pets-debug-climb'))
    const forceClimb = () => {
      for (const p of world.current.pets.values()) {
        if (p.kind.species === 'totoro') {
          p.state = 'climb_run'
          p.wall = 1
          p.target = (areaRef.current?.clientWidth ?? 240) - PET_W
          break
        }
      }
    }
    window.addEventListener('pets-debug-climb', forceClimb)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('pets-debug-climb', forceClimb)
    }
  }, [open])

  const throwBall = () => {
    if (reduced.current) return
    world.current.ball = {
      x: 8,
      y: 40,
      vx: 0.14 + Math.random() * 0.12,
      vy: 0.2 + Math.random() * 0.12,
      resting: false,
    }
    if (ballElRef.current) ballElRef.current.style.display = 'block'
  }

  const addPet = () =>
    setRoster((r) => {
      if (r.length >= 4) return r
      const has = (k: PetKind) => r.some((p) => p.species === k.species && p.color === k.color)
      const next = CYCLE.find((k) => !has(k)) ?? CYCLE[r.length % CYCLE.length]
      return [...r, next]
    })
  const removePet = () => setRoster((r) => (r.length > 1 ? r.slice(0, -1) : r))

  return (
    <div className="shrink-0 border-t" style={{ borderColor: 'var(--vscode-sideBar-border)' }}>
      <div
        className="flex h-[22px] items-center gap-1 px-2 text-[11px] font-bold uppercase tracking-wide"
        style={{ color: 'var(--vscode-sideBarSectionHeader-foreground)' }}
      >
        <button
          onClick={() => setOpen((v) => !v)}
          className="flex items-center gap-1"
          aria-expanded={open}
          aria-label="Toggle VS Code Pets section"
        >
          <span
            className={`codicon codicon-chevron-${open ? 'down' : 'right'} !text-[14px]`}
            aria-hidden
          />
          VS Code Pets
        </button>
        {open && (
          <span className="ml-auto flex items-center gap-0.5">
            <button
              onClick={throwBall}
              title="Throw ball"
              aria-label="Throw ball for the pets"
              className="flex h-[18px] w-[18px] items-center justify-center rounded hover:bg-white/10"
            >
              <span className="codicon codicon-record !text-[12px]" aria-hidden />
            </button>
            <button
              onClick={addPet}
              title="Spawn additional pet"
              aria-label="Spawn additional pet"
              className="flex h-[18px] w-[18px] items-center justify-center rounded hover:bg-white/10"
            >
              <span className="codicon codicon-add !text-[13px]" aria-hidden />
            </button>
            <button
              onClick={removePet}
              title="Remove last-added pet"
              aria-label="Remove last-added pet"
              className="flex h-[18px] w-[18px] items-center justify-center rounded hover:bg-white/10"
            >
              <span className="codicon codicon-trash !text-[12px]" aria-hidden />
            </button>
          </span>
        )}
      </div>

      {open && (
        <div ref={areaRef} className="relative overflow-hidden" style={{ height: BOX_H }}>
          <Castle />
          <div
            ref={ballElRef}
            className="pointer-events-none absolute bottom-0 left-0 hidden h-[8px] w-[8px] rounded-full"
            style={{ background: SPRITE.ball.fill, boxShadow: `inset -1px -1px 0 ${SPRITE.ball.shade}` }}
            aria-hidden
          />
          {roster.map((kind, i) => (
            <PetActor
              key={`${kind.species}-${kind.color}-${i}`}
              id={i}
              kind={kind}
              world={world}
              showTooltip={tooltip === i}
              onClick={() => {
                setTooltip(i)
                window.setTimeout(() => setTooltip((t) => (t === i ? null : t)), 1500)
              }}
            />
          ))}
        </div>
      )}
    </div>
  )
}

function PetActor({
  id,
  kind,
  world,
  showTooltip,
  onClick,
}: {
  id: number
  kind: PetKind
  world: React.MutableRefObject<{ ball: Ball | null; pets: Map<number, Runtime> }>
  showTooltip: boolean
  onClick: () => void
}) {
  const elRef = useRef<HTMLButtonElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)
  const name = NAMES[kind.species][id % NAMES[kind.species].length]

  useEffect(() => {
    // preload the hot states so swaps don't flash
    for (const s of ['idle', 'walk', 'run']) {
      const im = new Image()
      im.src = gif(kind, s)
    }
    const now = performance.now()
    const rt: Runtime = {
      id,
      kind,
      el: elRef.current,
      img: imgRef.current,
      x: 24 + id * 56,
      y: 0,
      dir: 1,
      state: 'idle',
      until: now + 600 + Math.random() * 1500,
      target: 24,
      wall: 1,
      vy: 0,
      currentSrc: gif(kind, 'idle'),
    }
    world.current.pets.set(id, rt)
    if (elRef.current) elRef.current.style.transform = `translate(${rt.x}px, 0)`
    if (imgRef.current) imgRef.current.style.transform = 'scaleX(-1)'
    return () => {
      world.current.pets.delete(id)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, kind.species, kind.color])

  return (
    <button
      ref={elRef}
      onClick={onClick}
      className="absolute left-0 cursor-pointer bg-transparent"
      style={{ bottom: FLOOR, willChange: 'transform' }}
      aria-label={`${name} the ${kind.species} — click to say hi`}
    >
      {showTooltip && (
        <span
          className="absolute -top-5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded border px-1.5 py-px text-[10px] normal-case"
          style={{
            background: 'var(--vscode-editorHoverWidget-background)',
            borderColor: 'var(--vscode-editorHoverWidget-border)',
            color: 'var(--vscode-foreground)',
          }}
        >
          {name}
        </span>
      )}
      <img
        ref={imgRef}
        src={gif(kind, 'idle')}
        alt=""
        draggable={false}
        style={{ height: PET_H[kind.species], imageRendering: 'pixelated' }}
      />
    </button>
  )
}
