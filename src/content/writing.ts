import type { WritingEntry } from './types'

/** Writing index only; full articles remain external and are not duplicated here. */
export const writing: WritingEntry[] = [
  { id: 'jung-archive', title: 'Jung Archive', projectId: 'jung-archive', published: false, summary: 'How retrieval evaluation, reranking, and evidence inspection changed the way I judged a RAG system.', tags: ['retrieval', 'evaluation', 'RAG'], bodyFileId: 'writing/jung-archive' },
  { id: 'ragparser', title: 'RagParser', projectId: 'ragparser', published: false, summary: 'Why native/OCR routing, canonical IR, layout, and provenance come before retrieval.', tags: ['PDF', 'OCR', 'document intelligence'], bodyFileId: 'writing/ragparser' },
  { id: 'local-llm', title: 'Running a Local LLM', published: false, summary: 'The practical installation, hardware, runtime, and serving questions behind local inference.', tags: ['llama.cpp', 'local inference', 'CUDA'], bodyFileId: 'writing/local-llm' },
  { id: 'absurd-rag', title: 'Absurd RAG', projectId: 'absurd-rag', published: false, summary: 'An earlier local RAG experiment that exposed the ingestion and evaluation problems the later systems addressed.', tags: ['RAG', 'ChromaDB', 'OCR'], bodyFileId: 'writing/absurd-rag' },
]

export const writingById = new Map(writing.map((entry) => [entry.id, entry]))
