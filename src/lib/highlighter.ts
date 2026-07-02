import type { HighlighterCore } from 'shiki/core'

let promise: Promise<HighlighterCore> | null = null

/** Lazy singleton Shiki highlighter with only the grammars we ship. */
export function getHighlighter(): Promise<HighlighterCore> {
  if (!promise) {
    promise = (async () => {
      const [{ createHighlighterCore }, { createJavaScriptRegexEngine }] =
        await Promise.all([import('shiki/core'), import('shiki/engine/javascript')])
      return createHighlighterCore({
        themes: [import('shiki/themes/dark-plus.mjs')],
        langs: [
          import('shiki/langs/tsx.mjs'),
          import('shiki/langs/typescript.mjs'),
          import('shiki/langs/javascript.mjs'),
          import('shiki/langs/json.mjs'),
          import('shiki/langs/yaml.mjs'),
          import('shiki/langs/markdown.mjs'),
        ],
        engine: createJavaScriptRegexEngine({ forgiving: true }),
      })
    })()
  }
  return promise
}
