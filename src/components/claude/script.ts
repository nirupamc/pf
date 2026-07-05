export interface ChatMsg {
  role: 'user' | 'claude'
  text: string
}

/** Opening message, revealed with a typewriter effect. */
export const INTRO: ChatMsg[] = [
  {
    role: 'claude',
    text:
      "Hi — I'm the resident Claude of this portfolio. I've read every file " +
      'in the tree (all of them are about **Nirupam**). Ask me anything below.',
  },
]

export interface Preset {
  id: string
  label: string
  question: string
  answer: string
}

export const PRESETS: Preset[] = [
  {
    id: 'who',
    label: 'Who is this developer?',
    question: 'Who is this developer?',
    answer:
      '**Nirupam Changmai** — full-stack developer and AI engineer in ' +
      'Guwahati, Assam. Building for 5+ years — freelancing since college, ' +
      '2+ years in professional roles. Currently ' +
      '**Senior Software Developer at TanTech LLC** (remote, USA), building ' +
      '`React`/`TypeScript`/`Next.js` products end to end. ' +
      'Career path in `experience/`, newest first.',
  },
  {
    id: 'ai',
    label: "What's his AI experience?",
    question: "What's his AI experience?",
    answer:
      'Professional LLM integrations across **OpenAI, Anthropic and Gemini** — ' +
      'prompt engineering, function calling, **RAG**, structured output parsing. ' +
      'His MCA specialized in **ML & AI**. Current side quest: `auto-apply`, an ' +
      'autonomous job-application agent that parses forms and fills them itself.',
  },
  {
    id: 'print',
    label: 'Wait, he screen prints too?',
    question: 'Wait, he screen prints too?',
    answer:
      'Yes — he designs, **color-separates and screen-prints textiles**, and ' +
      'manages manufacturing for the **Watawi** apparel brand. He reimagined the ' +
      'traditional Assamese **gamusa** with modern graphics. Pipeline: Figma → ' +
      'Photoshop → silk screen. See `projects/gamusa-reimagined.md` — and ' +
      '`projects/thrift-bazaar.md`, where the printing side and the dev side ' +
      'meet in one marketplace.',
  },
  {
    id: 'views',
    label: "What's the 10M views thing?",
    question: "What's the 10M views thing?",
    answer:
      "He ran **XO Clothing's** content — the numbers and receipts are in " +
      '`experience/xo-clothing.md`.',
  },
  {
    id: 'available',
    label: 'Is he available?',
    question: 'Is he available?',
    answer:
      'Open to full-time roles and AI/LLM integration work. Everything you ' +
      'need is in `about/contact.md` — email, ' +
      '[GitHub](https://github.com/nirupamc) and ' +
      '[LinkedIn](https://www.linkedin.com/in/nirupam-changmai-5642651ba). ' +
      'Response time < 24h.',
  },
]
