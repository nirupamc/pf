import { files } from '../../content/files'
import { useStore } from '../../store/useStore'
import FileIcon from '../FileIcon'

export default function ProjectsView() {
  const openFile = useStore((s) => s.openFile)
  const projects = files.filter((f) => f.id.startsWith('projects/'))

  return (
    <div className="text-[13px]">
      <p className="px-3 py-2 text-[12px]" style={{ color: 'var(--vscode-descriptionForeground)' }}>
        Experiments that escaped the lab:
      </p>
      <ul role="list">
        {projects.map((p) => (
          <li key={p.id}>
            <button
              className="flex h-[26px] w-full items-center px-3 text-left hover:bg-[color:var(--vscode-list-hoverBackground)]"
              onClick={() => openFile(p.id)}
            >
              <FileIcon name={p.name} />
              <span className="truncate">{p.name.replace(/\.md$/, '')}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
