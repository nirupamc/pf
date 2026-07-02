import { OWNER } from '../../content/meta'
import { useStore } from '../../store/useStore'

export default function ContactView() {
  const openFile = useStore((s) => s.openFile)

  const rows: { icon: string; label: string; href: string; download?: boolean }[] = [
    // TODO: NIRUPAM — add email to meta.ts to enable the mail row
    ...(OWNER.email
      ? [{ icon: 'mail', label: OWNER.email, href: `mailto:${OWNER.email}` }]
      : []),
    { icon: 'github', label: 'GitHub — nirupamc', href: OWNER.github },
    { icon: 'link', label: 'LinkedIn', href: OWNER.linkedin },
    { icon: 'device-camera', label: 'Instagram (print work)', href: OWNER.instagram1 },
    { icon: 'file-pdf', label: 'Download resume', href: '/resume.pdf', download: true },
  ]

  return (
    <div className="px-3 py-2 text-[13px]">
      <div className="mb-3 flex items-center gap-2">
        <div
          className="flex h-10 w-10 items-center justify-center rounded-full font-mono font-bold"
          style={{
            background: 'var(--vscode-button-background)',
            color: 'var(--vscode-button-foreground)',
          }}
          aria-hidden
        >
          N
        </div>
        <div>
          <div className="font-semibold">{OWNER.name}</div>
          <div className="text-[11px]" style={{ color: 'var(--vscode-descriptionForeground)' }}>
            {OWNER.role} · Guwahati
          </div>
        </div>
      </div>
      <ul role="list">
        {rows.map((r) => (
          <li key={r.label}>
            <a
              href={r.href}
              {...(r.download ? { download: '' } : { target: '_blank', rel: 'noreferrer' })}
              className="flex h-[26px] items-center gap-2 rounded px-2 hover:bg-[color:var(--vscode-list-hoverBackground)]"
            >
              <span className={`codicon codicon-${r.icon} !text-[14px]`} aria-hidden />
              <span className="truncate">{r.label}</span>
            </a>
          </li>
        ))}
        <li>
          <button
            className="flex h-[26px] w-full items-center gap-2 rounded px-2 text-left hover:bg-[color:var(--vscode-list-hoverBackground)]"
            onClick={() => openFile('about/contact')}
          >
            <span className="codicon codicon-markdown !text-[14px]" aria-hidden />
            Open about/contact.md
          </button>
        </li>
      </ul>
      <p className="mt-3 text-[11px]" style={{ color: 'var(--vscode-descriptionForeground)' }}>
        Response time: usually &lt; 24h. Faster if the subject mentions WebGL or
        screen printing.
      </p>
    </div>
  )
}
