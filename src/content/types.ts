export type ViewerKind = 'code' | 'markdown' | 'pdf'

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
