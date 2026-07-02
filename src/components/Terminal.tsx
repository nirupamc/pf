import { useEffect, useRef, useState } from 'react'
import { useStore } from '../store/useStore'
import { files } from '../content/files'
import { OWNER } from '../content/meta'

interface Line {
  text: string
  color?: string
}

const PROMPT = 'nirupam@portfolio:~$'

export default function Terminal() {
  const togglePanel = useStore((s) => s.togglePanel)
  const setMobileOverlay = useStore((s) => s.setMobileOverlay)
  const openFile = useStore((s) => s.openFile)
  const [lines, setLines] = useState<Line[]>([
    { text: 'Welcome to nirupam-sh 2.0.0 — a very real shell.', color: 'var(--vscode-terminal-ansiBrightGreen)' },
    { text: "Type 'help' to see what it pretends to do." },
    { text: '' },
  ])
  const [input, setInput] = useState('')
  const [history, setHistory] = useState<string[]>([])
  const [histIdx, setHistIdx] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollRef.current?.scrollTo(0, scrollRef.current.scrollHeight)
  }, [lines])

  const print = (out: Line[]) => setLines((prev) => [...prev, ...out])

  const run = (raw: string) => {
    const cmd = raw.trim()
    print([{ text: `${PROMPT} ${cmd}`, color: 'var(--vscode-terminal-foreground)' }])
    if (!cmd) return
    setHistory((h) => [cmd, ...h])
    setHistIdx(-1)

    const [name, ...args] = cmd.split(/\s+/)
    const arg = args.join(' ')

    switch (name) {
      case 'help':
        print([
          { text: 'Available commands:', color: 'var(--vscode-terminal-ansiCyan)' },
          { text: '  help              this list' },
          { text: '  ls                list portfolio files' },
          { text: '  cat <file>        open a file in a tab (e.g. cat contact.md)' },
          { text: '  open resume       open resume.pdf' },
          { text: '  contact           how to reach me' },
          { text: '  whoami            who am I? (existential)' },
          { text: '  npm run hire-me   the important one' },
          { text: '  clear             wipe the slate' },
          { text: '' },
        ])
        break
      case 'ls':
        print([
          ...files.map((f) => ({
            text: '  ' + f.path,
            color: f.path.endsWith('/') ? 'var(--vscode-terminal-ansiBlue)' : undefined,
          })),
          { text: '' },
        ])
        break
      case 'cat': {
        if (!arg) {
          print([{ text: 'cat: missing operand. Try: cat README.md', color: 'var(--vscode-errorForeground)' }, { text: '' }])
          break
        }
        const target = files.find(
          (f) =>
            f.name.toLowerCase() === arg.toLowerCase() ||
            f.path.toLowerCase() === arg.toLowerCase() ||
            f.id === arg.toLowerCase(),
        )
        if (target) {
          openFile(target.id)
          print([{ text: `Opening ${target.path} in editor…`, color: 'var(--vscode-terminal-ansiGreen)' }, { text: '' }])
        } else {
          print([{ text: `cat: ${arg}: No such file or directory`, color: 'var(--vscode-errorForeground)' }, { text: '' }])
        }
        break
      }
      case 'open':
        if (arg.toLowerCase().includes('resume')) {
          openFile('resume')
          print([{ text: 'Opening resume.pdf…', color: 'var(--vscode-terminal-ansiGreen)' }, { text: '' }])
        } else {
          print([{ text: `open: unknown target '${arg}'. Try: open resume`, color: 'var(--vscode-errorForeground)' }, { text: '' }])
        }
        break
      case 'contact':
        print([
          // TODO: NIRUPAM — email shows once added to meta.ts
          { text: '  email:    ' + (OWNER.email || '(coming soon)'), color: 'var(--vscode-terminal-ansiCyan)' },
          { text: '  github:   ' + OWNER.github, color: 'var(--vscode-terminal-ansiCyan)' },
          { text: '  linkedin: ' + OWNER.linkedin, color: 'var(--vscode-terminal-ansiCyan)' },
          { text: '' },
        ])
        break
      case 'whoami':
        print([
          { text: `${OWNER.name} — ${OWNER.role}, ${OWNER.location}.` },
          { text: 'React · Next.js · TypeScript · Node.js · Python · LLM APIs.' },
          { text: 'Also screen-prints textiles. Also made this terminal instead of using a template.' },
          { text: '' },
        ])
        break
      case 'npm':
        if (arg === 'run hire-me') {
          print([
            { text: '' },
            { text: '> nirupam@2.0.0 hire-me', color: 'var(--vscode-terminal-ansiBrightBlack)' },
            { text: '> node ./decide.js --candidate=nirupam', color: 'var(--vscode-terminal-ansiBrightBlack)' },
            { text: '' },
            { text: '  ✓ ships features end to end          (312 ms)', color: 'var(--vscode-terminal-ansiGreen)' },
            { text: '  ✓ integrates 3 LLM providers          (89 ms)', color: 'var(--vscode-terminal-ansiGreen)' },
            { text: '  ✓ zero critical bugs in production     (0 ms)', color: 'var(--vscode-terminal-ansiGreen)' },
            { text: '  ✓ prints what he designs, physically (1 pull)', color: 'var(--vscode-terminal-ansiGreen)' },
            { text: '  ✓ responds to emails < 24h            (1 ms)', color: 'var(--vscode-terminal-ansiGreen)' },
            { text: '' },
            { text: '  5 passing (418 ms)', color: 'var(--vscode-terminal-ansiBrightGreen)' },
            { text: '' },
            { text: '  Next step → about/contact.md (try: cat contact.md)', color: 'var(--vscode-terminal-ansiYellow)' },
            { text: '' },
          ])
        } else {
          print([{ text: `npm ERR! missing script: ${arg || '(none)'}. Did you mean 'npm run hire-me'?`, color: 'var(--vscode-errorForeground)' }, { text: '' }])
        }
        break
      case 'clear':
        setLines([])
        break
      case 'sudo':
        print([{ text: `${OWNER.name.toLowerCase()} is not in the sudoers file. This incident will be reported.`, color: 'var(--vscode-errorForeground)' }, { text: '' }])
        break
      default:
        print([
          { text: `bash: ${name}: command not found`, color: 'var(--vscode-errorForeground)' },
          { text: "Type 'help' for available commands." },
          { text: '' },
        ])
    }
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      run(input)
      setInput('')
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      const next = Math.min(histIdx + 1, history.length - 1)
      if (history[next] !== undefined) {
        setHistIdx(next)
        setInput(history[next])
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      const next = histIdx - 1
      if (next < 0) {
        setHistIdx(-1)
        setInput('')
      } else {
        setHistIdx(next)
        setInput(history[next])
      }
    }
  }

  return (
    <div
      className="flex h-full flex-col border-t bg-vsc-editor"
      style={{ borderColor: 'var(--vscode-panel-border)' }}
      onClick={() => inputRef.current?.focus()}
    >
      {/* panel header */}
      <div className="flex h-[35px] shrink-0 items-center px-4 text-[11px] uppercase tracking-wide">
        {['Problems', 'Output', 'Debug Console', 'Terminal', 'Ports'].map((t) => (
          <span
            key={t}
            className="mr-5 cursor-default pb-1"
            style={
              t === 'Terminal'
                ? {
                    color: 'var(--vscode-panelTitle-activeForeground)',
                    borderBottom: '1px solid var(--vscode-panelTitle-activeBorder)',
                  }
                : { color: 'var(--vscode-panelTitle-inactiveForeground)' }
            }
          >
            {t}
          </span>
        ))}
        <button
          className="ml-auto flex items-center opacity-80 hover:opacity-100"
          onClick={(e) => {
            e.stopPropagation()
            togglePanel()
            setMobileOverlay(null)
          }}
          aria-label="Close panel"
          title="Close Panel"
        >
          <span className="codicon codicon-close !text-[16px]" aria-hidden />
        </button>
      </div>

      {/* scrollback */}
      <div
        ref={scrollRef}
        className="min-h-0 flex-1 select-text overflow-y-auto px-4 pb-2 font-mono text-[12px] leading-[17px]"
        style={{ color: 'var(--vscode-terminal-foreground)' }}
        role="log"
        aria-label="Terminal output"
      >
        {lines.map((l, i) => (
          <div key={i} style={{ color: l.color }} className="whitespace-pre-wrap">
            {l.text || ' '}
          </div>
        ))}
        {/* prompt line */}
        <div className="flex items-center whitespace-pre">
          <span style={{ color: 'var(--vscode-terminal-ansiBrightGreen)' }}>{PROMPT}</span>
          <span>&nbsp;{input}</span>
          <span className="terminal-cursor" aria-hidden />
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            className="absolute h-0 w-0 opacity-0"
            aria-label="Terminal input"
            autoFocus
            autoCapitalize="off"
            autoCorrect="off"
            spellCheck={false}
          />
        </div>
      </div>
    </div>
  )
}
