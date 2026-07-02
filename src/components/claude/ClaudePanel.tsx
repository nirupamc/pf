import { useEffect, useMemo, useRef, useState } from 'react'
import { INTRO, PRESETS, type ChatMsg } from './script'
import { useStore } from '../../store/useStore'

const REDUCED = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

/** Renders **bold** and `code` chips in message text. */
function Rich({ text }: { text: string }) {
  const nodes = useMemo(() => {
    const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g)
    return parts.map((p, i) => {
      const link = /^\[([^\]]+)\]\(([^)]+)\)$/.exec(p)
      if (link)
        return (
          <a
            key={i}
            href={link[2]}
            target="_blank"
            rel="noreferrer"
            className="underline"
            style={{ color: 'var(--vscode-textLink-foreground)' }}
          >
            {link[1]}
          </a>
        )
      if (p.startsWith('**') && p.endsWith('**'))
        return (
          <strong key={i} className="font-semibold text-white/90">
            {p.slice(2, -2)}
          </strong>
        )
      if (p.startsWith('`') && p.endsWith('`'))
        return (
          <code
            key={i}
            className="rounded-[3px] bg-[color:var(--portfolio-claudeChip-background)] px-1 py-px font-mono text-[11px] text-[color:var(--portfolio-claudeChip-foreground)]"
          >
            {p.slice(1, -1)}
          </code>
        )
      return <span key={i}>{p}</span>
    })
  }, [text])
  return <>{nodes}</>
}

function Bubble({ msg, partial }: { msg: ChatMsg; partial?: string }) {
  if (msg.role === 'user') {
    return (
      <div
        className="rounded-[4px] border px-2.5 py-2 text-[12px]"
        style={{
          borderColor: 'var(--portfolio-claudeCard-border)',
          color: 'var(--vscode-descriptionForeground)',
        }}
      >
        <span className="mr-1.5 text-[10px] uppercase tracking-wide opacity-60">You</span>
        <span className="text-vsc-fg">{msg.text}</span>
      </div>
    )
  }
  return (
    <div className="flex gap-2 px-0.5 text-[12px] leading-[1.55]">
      <span
        className="mt-[3px] inline-block h-2 w-2 shrink-0 rounded-full"
        style={{ background: 'var(--vscode-charts-green)' }}
        aria-hidden
      />
      <div style={{ color: 'var(--vscode-foreground)' }}>
        <Rich text={partial ?? msg.text} />
        {partial !== undefined && <span className="terminal-cursor !h-[12px] !w-[6px]" aria-hidden />}
      </div>
    </div>
  )
}

export default function ClaudePanel({ mobile }: { mobile?: boolean }) {
  const setMobileOverlay = useStore((s) => s.setMobileOverlay)
  const [tab, setTab] = useState<'claude' | 'chat'>('claude')
  const [messages, setMessages] = useState<ChatMsg[]>([])
  const [typing, setTyping] = useState<string | null>(null)
  const [chipsOpen, setChipsOpen] = useState(false)
  const [used, setUsed] = useState<Set<string>>(new Set())
  const [limitToast, setLimitToast] = useState(false)
  const queue = useRef<ChatMsg[]>([...INTRO])
  const busy = useRef(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  // reveal one message from the queue; claude messages get the typewriter
  const pump = () => {
    if (busy.current) return
    const next = queue.current.shift()
    if (!next) return
    busy.current = true
    if (next.role === 'user' || REDUCED()) {
      setMessages((m) => [...m, next])
      busy.current = false
      if (queue.current.length) setTimeout(pump, next.role === 'user' ? 350 : 150)
      return
    }
    // typewriter: ONE interval slicing the string, ~3 chars per tick
    let i = 0
    setTyping('')
    const iv = setInterval(() => {
      i += 3
      if (i >= next.text.length) {
        clearInterval(iv)
        setTyping(null)
        setMessages((m) => [...m, next])
        busy.current = false
        if (queue.current.length) setTimeout(pump, 500)
      } else {
        setTyping(next.text.slice(0, i))
      }
    }, 16)
  }

  useEffect(() => {
    const t = setTimeout(pump, 400)
    return () => clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight })
  }, [messages, typing])

  const ask = (presetId: string) => {
    const p = PRESETS.find((x) => x.id === presetId)
    if (!p || used.has(p.id)) return
    const nextUsed = new Set(used).add(p.id)
    setUsed(nextUsed)
    setChipsOpen(false)
    queue.current.push({ role: 'user', text: p.question }, { role: 'claude', text: p.answer })
    pump()
    if (nextUsed.size === PRESETS.length) {
      setTimeout(() => setLimitToast(true), p.answer.length * 6 + 2500)
    }
  }

  const typingMsg: ChatMsg | null =
    typing !== null ? { role: 'claude', text: typing } : null

  return (
    <div className="flex h-full flex-col bg-vsc-sidebar text-[12px]">
      {/* header */}
      <div
        className="flex h-[35px] shrink-0 items-center gap-4 border-b px-3 text-[11px] font-semibold tracking-wide"
        style={{ borderColor: 'var(--vscode-panel-border)' }}
      >
        <button
          onClick={() => setTab('claude')}
          className="h-full border-b pt-px uppercase"
          style={{
            color: tab === 'claude' ? 'var(--vscode-foreground)' : 'var(--vscode-descriptionForeground)',
            borderColor: tab === 'claude' ? 'var(--vscode-foreground)' : 'transparent',
          }}
        >
          Claude Code
        </button>
        <button
          onClick={() => setTab('chat')}
          className="h-full border-b pt-px uppercase"
          style={{
            color: tab === 'chat' ? 'var(--vscode-foreground)' : 'var(--vscode-descriptionForeground)',
            borderColor: tab === 'chat' ? 'var(--vscode-foreground)' : 'transparent',
          }}
        >
          Chat
        </button>
        <span className="ml-auto flex items-center gap-2 opacity-70">
          <span className="codicon codicon-history !text-[14px]" aria-hidden />
          {mobile ? (
            <button onClick={() => setMobileOverlay(null)} aria-label="Close Claude panel">
              <span className="codicon codicon-close !text-[16px]" aria-hidden />
            </button>
          ) : (
            <span className="codicon codicon-screen-full !text-[14px]" aria-hidden />
          )}
        </span>
      </div>

      {tab === 'claude' ? (
        <>
          <div
            className="shrink-0 truncate px-3 pb-1 pt-2 text-[12px] font-semibold"
            style={{ color: 'var(--vscode-foreground)' }}
          >
            Ask about Nirupam — Session 1
          </div>

          <div ref={scrollRef} className="min-h-0 flex-1 space-y-2.5 overflow-y-auto px-3 py-2">
            {/* session card, like the extension's bordered project cards */}
            <div
              className="rounded-[4px] border px-2.5 py-2"
              style={{ borderColor: 'var(--portfolio-claudeCard-border)' }}
            >
              <div style={{ color: 'var(--vscode-charts-green)' }}>
                PROFILE: Nirupam Changmai — Full-Stack · AI:
              </div>
              <div className="opacity-60">React + Next.js + Node + LLM APIs +</div>
              <div className="opacity-40">Screen-Printed Textiles ✦ Guwahati</div>
            </div>

            {messages.map((m, i) => (
              <Bubble key={i} msg={m} />
            ))}
            {typingMsg && <Bubble msg={typingMsg} partial={typing ?? ''} />}
          </div>

          {/* session-limit toast */}
          {limitToast && (
            <div
              className="mx-3 mb-1.5 flex shrink-0 items-start gap-2 rounded-[4px] border px-2.5 py-2 text-[11px]"
              style={{
                background: 'var(--portfolio-toast-background)',
                borderColor: 'var(--portfolio-toast-border)',
                color: 'var(--portfolio-toast-foreground)',
              }}
              role="status"
            >
              <span className="min-w-0">
                You've hit your session limit · Nirupam resets at 9:00 AM IST
              </span>
              <a
                className="ml-auto shrink-0 underline"
                href="/about/contact"
                onClick={(e) => {
                  e.preventDefault()
                  useStore.getState().openFile('about/contact')
                }}
              >
                View usage
              </a>
              <button onClick={() => setLimitToast(false)} aria-label="Dismiss">
                ×
              </button>
            </div>
          )}

          {/* preset chips */}
          {chipsOpen && (
            <div className="shrink-0 space-y-1 px-3 pb-1.5">
              {PRESETS.filter((p) => !used.has(p.id)).map((p) => (
                <button
                  key={p.id}
                  onClick={() => ask(p.id)}
                  className="mr-1 rounded-full border px-2.5 py-1 text-[11px] hover:bg-white/5"
                  style={{ borderColor: 'var(--vscode-editorWidget-border)', color: 'var(--vscode-foreground)' }}
                >
                  {p.label}
                </button>
              ))}
              {PRESETS.every((p) => used.has(p.id)) && (
                <div className="text-[11px]" style={{ color: 'var(--vscode-descriptionForeground)' }}>
                  Out of questions — try `about/contact.md` for a human response.
                </div>
              )}
            </div>
          )}

          {/* input (not free-text: opens preset chips) */}
          <div className="shrink-0 px-3 pb-3">
            <button
              onClick={() => setChipsOpen((v) => !v)}
              className="flex w-full items-center rounded-[4px] border px-2 py-[7px] text-left"
              style={{
                background: 'var(--vscode-input-background)',
                borderColor: 'var(--vscode-editorWidget-border)',
                color: 'var(--vscode-input-placeholderForeground)',
              }}
              aria-expanded={chipsOpen}
              aria-label="Ask Claude about Nirupam — opens preset questions"
            >
              Ask Claude about Nirupam…
              <span className="codicon codicon-mic ml-auto !text-[14px] opacity-60" aria-hidden />
            </button>
            <div className="mt-1.5 flex items-center gap-2 px-0.5 opacity-60">
              <span className="codicon codicon-add !text-[13px]" aria-hidden />
              <span className="codicon codicon-mention !text-[13px]" aria-hidden />
              <span className="truncate text-[10px]">README.md</span>
              <span className="codicon codicon-send ml-auto !text-[13px]" aria-hidden />
            </div>
          </div>
        </>
      ) : (
        <div className="flex flex-1 flex-col items-center justify-center gap-2 px-6 text-center" style={{ color: 'var(--vscode-descriptionForeground)' }}>
          <span className="codicon codicon-comment-discussion !text-[28px] opacity-50" aria-hidden />
          <p>
            The CHAT tab is where Nirupam talks to Claude while building. You want the{' '}
            <button className="underline" onClick={() => setTab('claude')}>
              CLAUDE CODE
            </button>{' '}
            tab.
          </p>
        </div>
      )}
    </div>
  )
}
