/*
 * Name-aware folder icons from the Material Icon Theme (Apache-2.0),
 * with distinct open/closed states.
 */
import folderSvg from '../assets/icons/folder.svg'
import folderOpenSvg from '../assets/icons/folder-open.svg'
import srcSvg from '../assets/icons/folder-src.svg'
import srcOpenSvg from '../assets/icons/folder-src-open.svg'
import publicSvg from '../assets/icons/folder-public.svg'
import publicOpenSvg from '../assets/icons/folder-public-open.svg'
import githubSvg from '../assets/icons/folder-github.svg'
import githubOpenSvg from '../assets/icons/folder-github-open.svg'
import imagesSvg from '../assets/icons/folder-images.svg'
import imagesOpenSvg from '../assets/icons/folder-images-open.svg'
import nodeSvg from '../assets/icons/folder-node.svg'
import nodeOpenSvg from '../assets/icons/folder-node-open.svg'
import distSvg from '../assets/icons/folder-dist.svg'
import distOpenSvg from '../assets/icons/folder-dist-open.svg'
import projectSvg from '../assets/icons/folder-project.svg'
import projectOpenSvg from '../assets/icons/folder-project-open.svg'
import docsSvg from '../assets/icons/folder-docs.svg'
import docsOpenSvg from '../assets/icons/folder-docs-open.svg'
import classSvg from '../assets/icons/folder-class.svg'
import classOpenSvg from '../assets/icons/folder-class-open.svg'
import jobSvg from '../assets/icons/folder-job.svg'
import jobOpenSvg from '../assets/icons/folder-job-open.svg'

const FOLDER_ICONS: Record<string, [closed: string, open: string]> = {
  src: [srcSvg, srcOpenSvg],
  public: [publicSvg, publicOpenSvg],
  '.github': [githubSvg, githubOpenSvg],
  images: [imagesSvg, imagesOpenSvg],
  node_modules: [nodeSvg, nodeOpenSvg],
  dist: [distSvg, distOpenSvg],
  projects: [projectSvg, projectOpenSvg],
  about: [docsSvg, docsOpenSvg],
  education: [classSvg, classOpenSvg],
  experience: [jobSvg, jobOpenSvg],
}

const DIMMED = new Set(['node_modules', 'dist'])

export default function FolderIcon({ name, open }: { name: string; open?: boolean }) {
  const pair = FOLDER_ICONS[name.toLowerCase()] ?? [folderSvg, folderOpenSvg]
  return (
    <img
      src={open ? pair[1] : pair[0]}
      alt=""
      width={16}
      height={16}
      className="mr-1.5 shrink-0 select-none"
      style={DIMMED.has(name.toLowerCase()) ? { opacity: 0.6 } : undefined}
      draggable={false}
      aria-hidden
    />
  )
}
