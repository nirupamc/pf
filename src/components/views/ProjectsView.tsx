import { fileById } from '../../content/files'
import { projects } from '../../content/projects'
import type { ProjectCategory } from '../../content/types'
import { useStore } from '../../store/useStore'
import FileIcon from '../FileIcon'

export default function ProjectsView() {
  const openFile = useStore((s) => s.openFile)
  const groups: Array<{ category: ProjectCategory; label: string }> = [
    { category: 'ai-systems', label: 'AI SYSTEMS' },
    { category: 'products', label: 'PRODUCTS' },
    { category: 'full-stack', label: 'FULL STACK' },
    { category: 'creative-tech', label: 'CREATIVE TECHNOLOGY' },
    { category: 'creative', label: 'PRINT & DESIGN' },
  ]

  return (
    <div className="text-[13px]">
      <p className="px-3 py-2 text-[12px]" style={{ color: 'var(--vscode-descriptionForeground)' }}>
        Experiments that escaped the lab:
      </p>
      {groups.map((group) => {
        const groupProjects = projects
          .filter((project) => project.category === group.category)
          .sort((a, b) => a.order - b.order)
        return (
          <section key={group.category} aria-labelledby={`projects-${group.category}`}>
            <h2
              id={`projects-${group.category}`}
              className="border-t px-3 py-2 text-[11px] font-semibold tracking-wide"
              style={{ borderColor: 'var(--vscode-panel-border)', color: 'var(--vscode-descriptionForeground)' }}
            >
              {group.label}
            </h2>
            <ul role="list">
              {groupProjects.map((project) => {
                const file = fileById.get(project.bodyFileId)
                if (!file) return null
                return (
                  <li key={project.id}>
                    <button
                      className="flex h-[26px] w-full items-center px-3 text-left hover:bg-[color:var(--vscode-list-hoverBackground)]"
                      onClick={() => openFile(project.bodyFileId)}
                    >
                      <FileIcon name={file.name} />
                      <span className="truncate">{project.title}</span>
                    </button>
                  </li>
                )
              })}
            </ul>
          </section>
        )
      })}
    </div>
  )
}
