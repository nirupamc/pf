import type { WritingEntry } from './types'

/** Writing index only; full articles remain external and are not duplicated here. */
export const writing: WritingEntry[] = [
  { id: 'jung-archive', title: 'Jung Archive', projectId: 'jung-archive', published: false, bodyFileId: 'writing/jung-archive' },
  { id: 'ragparser', title: 'RagParser', projectId: 'ragparser', published: false, bodyFileId: 'writing/ragparser' },
  { id: 'local-llm', title: 'Local LLM', published: false, bodyFileId: 'writing/local-llm' },
  { id: 'absurd-rag', title: 'Absurd RAG', projectId: 'absurd-rag', published: false, bodyFileId: 'writing/absurd-rag' },
]

export const writingById = new Map(writing.map((entry) => [entry.id, entry]))
