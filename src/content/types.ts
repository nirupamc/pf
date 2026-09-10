export type ViewerKind = 'code' | 'markdown' | 'pdf'

export type ProjectCategory =
  | 'ai-systems'
  | 'products'
  | 'full-stack'
  | 'creative-tech'
  | 'creative'

export type ProjectTier = 'flagship' | 'featured' | 'supporting'

export type ProjectStatus = 'complete' | 'active' | 'experimental' | 'unknown'

export interface Project {
  id: string
  title: string
  category: ProjectCategory
  tier: ProjectTier
  status: ProjectStatus
  featured: boolean
  order: number
  summary?: string
  stack?: string[]
  github?: string
  live?: string
  liveLabel?: string
  article?: string
  mediaSlug?: string
  bodyFileId: string
}

export interface WritingEntry {
  id: string
  title: string
  projectId?: string
  published: boolean
  publishedAt?: string
  externalUrl?: string
  summary?: string
  tags?: string[]
  bodyFileId: string
}

export type SetiIcon =
  | 'ts'
  | 'tsx'
  | 'js'
  | 'json'
  | 'md'
  | 'yml'
  | 'pdf'

export interface PortfolioFile {
  /** stable id, also the route: `/` + id */
  id: string
  /** file name shown in tree + tab */
  name: string
  /** virtual path shown in breadcrumbs, e.g. "src/work/current-role.tsx" */
  path: string
  language: string
  icon: SetiIcon
  viewer: ViewerKind
  content: string
}

export interface TreeFolder {
  kind: 'folder'
  name: string
  children: TreeNode[]
}

export interface TreeFile {
  kind: 'file'
  fileId: string
}

export type TreeNode = TreeFolder | TreeFile
