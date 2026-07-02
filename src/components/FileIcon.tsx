import type { SetiIcon } from '../content/types'

/*
 * Material Icon Theme icons (github.com/material-extensions/vscode-material-icon-theme,
 * Apache-2.0), vendored as SVG assets in src/assets/icons/.
 */
import markdownSvg from '../assets/icons/markdown.svg'
import jsonSvg from '../assets/icons/json.svg'
import pdfSvg from '../assets/icons/pdf.svg'
import reactTsSvg from '../assets/icons/react_ts.svg'
import typescriptSvg from '../assets/icons/typescript.svg'
import javascriptSvg from '../assets/icons/javascript.svg'
import yamlSvg from '../assets/icons/yaml.svg'
import imageSvg from '../assets/icons/image.svg'
import htmlSvg from '../assets/icons/html.svg'
import cssSvg from '../assets/icons/css.svg'
import svgSvg from '../assets/icons/svg.svg'
import gitSvg from '../assets/icons/git.svg'

const FILE_ICONS: Record<SetiIcon, string> = {
  md: markdownSvg,
  json: jsonSvg,
  pdf: pdfSvg,
  tsx: reactTsSvg,
  ts: typescriptSvg,
  js: javascriptSvg,
  yml: yamlSvg,
}

/** Extension → icon, for names not covered by the SetiIcon key */
export function iconForFilename(name: string): string {
  const lower = name.toLowerCase()
  if (lower === '.gitignore' || lower.startsWith('.git')) return gitSvg
  const ext = lower.split('.').pop() ?? ''
  switch (ext) {
    case 'md': return markdownSvg
    case 'json': return jsonSvg
    case 'pdf': return pdfSvg
    case 'tsx': case 'jsx': return reactTsSvg
    case 'ts': return typescriptSvg
    case 'js': case 'mjs': return javascriptSvg
    case 'yml': case 'yaml': return yamlSvg
    case 'png': case 'jpg': case 'jpeg': case 'webp': case 'gif': return imageSvg
    case 'html': return htmlSvg
    case 'css': return cssSvg
    case 'svg': return svgSvg
    default: return typescriptSvg
  }
}

export default function FileIcon({ icon, name }: { icon?: SetiIcon; name?: string }) {
  const src = name ? iconForFilename(name) : icon ? FILE_ICONS[icon] : markdownSvg
  return (
    <img
      src={src}
      alt=""
      width={16}
      height={16}
      className="mr-1.5 shrink-0 select-none"
      draggable={false}
      aria-hidden
    />
  )
}
