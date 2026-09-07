import { fileById } from '../../content/files'
import { projects } from '../../content/projects'
import type { ProjectTier } from '../../content/types'
import { useStore } from '../../store/useStore'
import FileIcon from '../FileIcon'

export default function ProjectsView() {
  const openFile = useStore((s) => s.openFile)
  const groups: Array<{ tier: ProjectTier; label: string }> = [
    { tier: 'flagship', label: 'FLAGSHIP SYSTEMS' },
    { tier: 'featured', label: 'FEATURED WORK' },
    { tier: 'supporting', label: 'SUPPORTING WORK' },
  ]

  return (
    <div className="text-[13px]">
      <p className="px-3 py-2 text-[12px]" style={{ color: 'var(--vscode-descriptionForeground)' }}>
        Experiments that escaped the lab:
      </p>
      {groups.map((group) => {
        const groupProjects = projects
          .filter((project) => project.tier === group.tier)
          .sort((a, b) => a.order - b.order)
        return (
          <section key={group.tier} aria-labelledby={`projects-${group.tier}`}>
            <h2
              id={`projects-${group.tier}`}
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
