import type { PortfolioFile, TreeNode } from './types'
import { OWNER } from './meta'
import { projects } from './projects'
import { writing } from './writing'

/* =========================================================================
 * All portfolio content lives here as a typed virtual file system.
 * Remaining owner inputs are marked `TODO: NIRUPAM`.
 * ========================================================================= */

const tantechMd = `# TanTech LLC — Senior Software Developer

**Jan 2026 – Present · Remote (USA)**

Full-stack product development across React/TypeScript/Next.js applications,
API integrations, AI-assisted workflows, and internal tools.

## What I worked on

- Architected and shipped **3 React/TypeScript/Next.js applications**
  end-to-end, with zero critical production bugs reported in the source
  material.
- Integrated OpenAI, Anthropic, and Gemini APIs for prompt workflows,
  function calling, and structured output parsing.
- Built **5+ GraphQL/REST integrations**, with a reported **40% API latency
  reduction**.
- Created a reusable component library/design system and improved frontend
  performance with code splitting, lazy loading, and memoization.
- Built internal product workflows including a dashboard, a PWA attendance
  system, and the in-development [AutoApply](/projects/products/auto-apply)
  browser-automation project.

## Stack

React, TypeScript, Next.js, GraphQL, REST APIs, OpenAI, Anthropic, Gemini, and
GitHub Actions.

`

const xoClothingMd = `# XO Clothing — Web & Digital Operations

**Jul 2025 – Jan 2026**

## What I worked on

- **Rebuilt the company website** — **+25% organic traffic** within 4 months.
- Managed the content pipeline across **3 platforms** — **+18% following**.
- Produced social media content that generated **10M+ views in one month**.
- Streamlined client communications — **−40% turnaround time**.

## Evidence

The 10M+ month, documented:

\`\`\`gallery
xo-clothing
\`\`\`

## What this taught me

Distribution is a product problem. The loop that ships features — measure,
hypothesize, ship, re-measure — also grows an audience.
`

const freelanceMd = `# Freelance — Full-Stack Developer

**2020 – Present** _(ongoing, alongside studies and roles)_

Freelancing since college — client work has run continuously alongside the
BCA (2020–2023) and every professional role since.

## The full-time stretch (Jan – Jul 2025)

Six months of freelance as the day job, alongside **Watawi** product &
manufacturing work:

- Delivered **4 full-stack projects end-to-end** — Python, TypeScript,
  React, Next.js.
- Integrated **LLM APIs (OpenAI, Gemini)** in 2 client projects.
- Set up CI/CD pipelines saving **~4 hours per release**.
-  **Playlist downloader** —
  [github.com/nirupamc/zacc](https://github.com/nirupamc/zacc)

## Recent client work

-  **Wedding invitation site** —
  [mebarisha-emerson.vercel.app](https://mebarisha-emerson.vercel.app)

## Stack

\`Python\` · \`TypeScript\` · \`React\` · \`Next.js\` · \`OpenAI\` · \`Gemini\`
`

const watawiMd = `# Watawi — Product Development & Manufacturing

**Jan 2025 – Jul 2025** _(alongside freelance dev work)_

Taking products from **design file to physically shipped garment** for the
Watawi apparel brand.

## What I own

- **Drops** — planning and executing product releases.
- **Vendor coordination** — fabrics, inks, blanks, finishing.
- **Sampling** — proofs, fit checks, print tests before committing a run.
- **Quality control** — because a misregistered print is a bug you can't patch.
- **Production timelines** — the physical world's answer to sprint planning.

## Why a developer does this

Manufacturing is deployment with no rollback. It sharpened exactly the
instincts that make software ship well: plan the pipeline, test on samples,
respect the constraints of the medium.

## Products & manufacturing

Pieces I took from design file to production:

\`\`\`gallery
watawi
\`\`\`

<!-- TODO: NIRUPAM — brand link -->
`

const riyumMd = `# Riyum — Full-Stack Developer

**Mar 2024 – Jan 2025 · Guwahati**

## Highlights

- Built a **production LMS** — React, TypeScript, GraphQL — serving
  **120+ users with zero downtime**.
- Built a **real-time communications platform** — Node.js + WebSockets,
  **30+ concurrent users**, **−35% response time**.
- Created a **reusable component library** — **−45% feature dev time**.
- **Jest / React Testing Library** suites — **15 critical bugs** caught
  before release.

## The creative-production side

- **Shot and edited 25+ social videos** — camera work and the edit, both mine.
- **Designed posters** for their classes, plus **30+ branded assets**.
- **Learned screen printing and color separation here** — this is where the
  printing craft started. The craft I picked up at Riyum became the
  production plate work in
  [kyd](/creative/print-and-design/kyd).

\`\`\`gallery
riyum
\`\`\`

## Stack

\`React\` · \`TypeScript\` · \`GraphQL\` · \`Node.js\` · \`WebSockets\` · \`Jest\` · \`RTL\`
`

const mcaAmityMd = `# MCA — Machine Learning & AI Specialization

**Amity University Online · 2023 – 2025**

Master of Computer Applications with a specialization in **Machine Learning
and Artificial Intelligence**.
`

const bcaGcuMd = `# BCA — Bachelor of Computer Applications

**Girijananda Chowdhary University · 2020 – 2023**

Bachelor of Computer Applications. This is the foundation for the later
full-stack, backend, and AI systems work.
`

const nervOrbitalMd = `# NERV-Orbital

> A WebGL satellite tracker with an Evangelion-inspired HUD.
> **Real data. Real orbits. Slightly dramatic UI.**

## What it does

- Fetches live **TLE orbital elements** from [CelesTrak](https://celestrak.org)
  for **500+ satellites** (Starlink, GPS, ISS, and friends).
- Propagates orbits client-side with **SGP4** and renders them on a
  Three.js globe at 60fps.
- Computes real **sun/moon positions** for an accurate day/night terminator
  and lighting.
- NERV-style HUD: per-group object counts, data-link status, boot sequence.

## Hard parts

1. **Rate limits.** CelesTrak 403s aggressive clients; the app degrades
   gracefully to cached group data instead of erroring.
2. **Perf.** 500+ satellites × 60fps means instanced meshes and zero
   per-frame allocation in the propagation loop.
3. **Time.** Everything is a function of UTC — scrubbing time rewinds
   the whole sky.

## Stack

\`Three.js\` · \`React\` · \`TypeScript\` · \`Vite\` · \`SGP4\` · \`CelesTrak API\`

[Source — github.com/nirupamc/evangalion-typeish](https://github.com/nirupamc/evangalion-typeish)
<!-- NOTE: rename repo to nerv-orbital first -->
`

const pwaAttendanceMd = `# PWA Attendance

> Offline-capable attendance tracking, built as a progressive web app.
> Built at **TanTech LLC** — see [experience/tantech](/experience/tantech).

## How it works

- The **admin panel displays a QR code**; employees scan it to clock in,
  and scan again to clock out.
- **WiFi-gated activation** — clock-ins only register on the office network,
  so "working from the parking lot" doesn't count.
- Admins see **employee location** at clock-in.
- Built-in **leave application flow** — request, review, approve, all in-app.
- **Offline-capable** — attendance events queue locally and sync when the
  connection returns.

## Stack

\`PWA\` · \`Service Workers\` · \`QR\` · \`Geolocation\` · \`React\`

[Source — github.com/nirupamc/pwa-attendance](https://github.com/nirupamc/pwa-attendance)
`

const thriftBazaarMd = `# ThriftBazaar

> Indian thrift culture runs on Instagram DMs and UPI screenshots.
> **ThriftBazaar turns that chaos into a real marketplace.** A passion project.

## What it is

A multi-vendor thrift marketplace:

- **MySpace-style storefronts** — vendors customize banners, stickers,
  marquee text and fonts. Every store looks like its owner.
- **Rich discovery** — buyers filter by rarity, era, fabric and city.
- **Multi-vendor cart** with **Razorpay** checkout and order tracking,
  split into per-vendor sub-orders.

## Tech highlights

- **Socket.io drop alerts** — store followers get real-time pings when a
  vendor lists new pieces.
- **Vendor dashboards** — revenue, sales, followers.
- **Admin panel** — vendor approval and payout management.

Built with **TypeScript + Node.js**.

## Why it exists

I print and manufacture garments, and I build software. This is the project
where both sides meet: the commerce infrastructure Indian thrift sellers
actually need.

## Links

[Live demo](https://thrift-store-ncng.vercel.app) ·
[Source — github.com/nirupamc/Thrift-store](https://github.com/nirupamc/Thrift-store) ·
[API docs](https://thrift-store-9h66.onrender.com/api/v1/docs)

\`\`\`gallery
thrift-bazaar
\`\`\`
`

const tantechDashboardMd = `# TanTech Dashboard

> Internal employee-work tracking database and dashboard, built at
> **TanTech LLC** — see [experience/tantech](/experience/tantech).

## What it does

- Central **database of employee work items** — who's doing what, and when
  it shipped.
- Dashboard views for tracking workload and progress across the team.
- Built for internal daily use — boring by design, fast by necessity.

## Stack

\`React\` · \`TypeScript\` · \`Database\` · \`Dashboards\`

[Source — github.com/nirupamc/database-t_t](https://github.com/nirupamc/database-t_t)
`

const autoApplyMd = `# AutoApply

> Human-in-the-loop application assistance and browser automation.

## What it is

AutoApply explores the repetitive parts of job applications: finding jobs,
extracting requirements, tailoring application material, and mapping answers
onto different browser forms. The system is in development at TanTech LLC.

## Workflow

\`Job discovery → eligibility filtering → JD extraction → resume / cover-letter generation → question engine → browser automation\`

The intended flow uses confidence thresholds and keeps sensitive fields out of
automatic inference. A person remains responsible for reviewing and deciding
what is submitted.

## Engineering decisions

- Use structured parsing and LLM function calling for variable form shapes.
- Treat browser automation as an execution boundary rather than letting a
  model directly control arbitrary page actions.
- Add confidence thresholds so uncertain field mappings can return to a human.
- Keep application data and sensitive fields explicit instead of guessing them.

## Current limitations

- This is a work in progress, not a claim of a finished application platform.
- Workday, Greenhouse, Lever, and similar sites can change their forms and
  automation constraints.
- Anti-bot controls and site terms limit where browser automation is
  appropriate.

## Stack

FastAPI, multi-user authentication, LLM function calling, structured parsing,
Playwright/Patchright browser automation, and application workflow logic.

[Source — github.com/nirupamc/auto-apply-](https://github.com/nirupamc/auto-apply-)
`

const gamusaMd = `# Gamusa, Reimagined

> A design experiment: a rap duo's logo, living inside a traditional
> Assamese textile's visual system.

## What a gamusa is

The **gamusa** is a hand-woven cotton textile from Assam — white with red
borders and woven motifs — and one of the most significant cultural symbols
of Assamese identity. It's offered as a gesture of respect, worn, gifted at
Bihu, draped over honoured guests. Everyone in Assam owns one; almost nobody
changes what's printed on it.

## What I actually did

I took a rap duo's existing logo and made it sit naturally inside the
gamusa's format — silhouette work in Photoshop/Illustrator, keeping the
proportions and the red-on-white language, swapping the traditional motif
for a modern mark in its place.

**Honest scope:** the logo belongs to the duo, not me. The design work here
is the adaptation — making a contemporary mark read like it belongs on a
hundred-year-old format instead of looking slapped on. Small project;
I like it anyway.

## Photos

\`\`\`gallery
gamusa
\`\`\`

**See more →** [instagram.com/smgggggggggggggggggg](https://instagram.com/smgggggggggggggggggg)
`

const kydMd = `# KYD — Color Separation

> Production color separation for the **KYD** brand — turning finished
> artwork into the exact plates a screen printer pulls, one ink at a time.

## What color separation is

A screen print is not printed "as an image" — it's rebuilt one solid ink
layer at a time. Separation is the craft of decomposing artwork into those
plates: an underbase so colors sit bright on dark fabric, then each ink in
print order, trapped and registered so nothing peeks where it shouldn't.

## The prints

Final artwork and prints from the separation work:

\`\`\`gallery
kyd
\`\`\`

## Toggle the plates

Once the per-plate exports land, this section becomes interactive — a
Photoshop-style layer stack where each eye icon shows or hides one real
ink plate.

\`\`\`separation
{ "folder": "kyd/plates" }
\`\`\`

<!-- TODO: NIRUPAM — export the real plates (transparent PNGs, same canvas size)
     into public/images/kyd/plates/, ordered by filename:
     0-underbase.png, 1-red.png, 2-black.png … the viewer appears automatically. -->

_Plate exports in progress — the gallery above shows the finished prints
in the meantime._

## Why it's on a developer portfolio

Separation is layer-based thinking under hard constraints — z-order,
compositing, registration tolerances. It's the same mental model as the
rendering work I do in WebGL, except the GPU is a human arm.
`

const experimentsMd = `# Experiments

> Small creative builds. One line each, all live.

| Experiment | Link |
| --- | --- |
|  **ASCII camera** — your webcam, rendered as text | [shiny-bublanina-01b086.netlify.app](https://shiny-bublanina-01b086.netlify.app) |
|  **Image-effect tools** — in-browser image manipulation | [zippy-pie-68bfbc.netlify.app](https://zippy-pie-68bfbc.netlify.app) |
|  **Camera effects** — real-time video filters | [elegant-ganache-06f9a9.netlify.app](https://elegant-ganache-06f9a9.netlify.app) |
|  **CodePen game recreation** — rebuilt from scratch | [stately-bublanina-28e235.netlify.app](https://stately-bublanina-28e235.netlify.app) |
|  **GSAP animations** — motion studies | [github.com/nirupamc/gsap_animations](https://github.com/nirupamc/gsap_animations) |
|  **Flight tracker** — live aircraft on a map | [flighttrackershortof.netlify.app](https://flighttrackershortof.netlify.app) |
|  **Three.js app** — 3D experiments | [github.com/nirupamc/usatheejs](https://github.com/nirupamc/usatheejs)  |

Half of these exist because "I wonder if the browser can do that" is a
dangerous sentence.



\`\`\`gallery
experiments
\`\`\`
`

const skillsJson = `{
  "name": "nirupam-changmai",
  "version": "2.0.0",
  "groups": {
    "Applied AI": [
      "LLM application development",
      "AI agents",
      "RAG",
      "retrieval",
      "embeddings",
      "reranking",
      "evaluation",
      "document intelligence",
      "local inference"
    ],
    "Backend": [
      "Python",
      "FastAPI",
      "REST APIs",
      "SQLite",
      "Alembic",
      "authentication",
      "streaming",
      "concurrency and admission control"
    ],
    "AI / Retrieval Infrastructure": [
      "llama.cpp",
      "ChromaDB",
      "BM25",
      "sentence-transformers",
      "cross-encoders",
      "Tesseract",
      "PyMuPDF"
    ],
    "Full Stack": [
      "TypeScript",
      "React",
      "Next.js",
      "Node.js",
      "Tailwind",
      "Playwright",
      "browser APIs"
    ],
    "Tools / Workflow": [
      "Git",
      "Vite",
      "Shiki",
      "screen printing",
      "color separation"
    ]
  }
}
`

const creditsMd = `# Credits

This site borrows joy from open projects. Credit where due:

- **[vscode-pets](https://github.com/tonybaloney/vscode-pets)** (MIT,
  Anthony Shaw & contributors) — the pet behavior is ported from it, and
  the panda + Totoro sprite GIFs come from its media set.
- **Panda sprite art** — Jessie Ferris.
- **Castle backdrop** — original pixel-art SVG drawn for this site
  (a nod to GuttyKreum's city scenes; none of his art is used here).
- **[Material Icon Theme](https://github.com/material-extensions/vscode-material-icon-theme)**
  (Apache-2.0) — file and folder icons.
- **[@vscode/codicons](https://github.com/microsoft/vscode-codicons)** — UI glyphs.
- **[Shiki](https://shiki.style)** — syntax highlighting with the \`dark-plus\` grammar.
- **JetBrains Mono** (OFL) — the editor font.

UI inspired by Visual Studio Code. Not affiliated with Microsoft.
`

const projectPath = (id: string) => projects.find((project) => project.id === id)?.bodyFileId ?? id
const projectSummary = (id: string) => projects.find((project) => project.id === id)?.summary ?? ''
const writingPath = (id: string) => writing.find((entry) => entry.id === id)?.bodyFileId ?? id

const readmeMd = `# Nirupam Changmai

**Applied AI / Backend Engineer**

I build LLM infrastructure, agent systems, retrieval pipelines, document
intelligence, and production AI backends.

My background also includes full-stack product engineering — from schema to
pixel — and a parallel practice in creative technology and screen printing.

## Selected Systems

### [Huginn](/${projectPath('huginn')})

${projectSummary('huginn')} Durable execution, resumable runs, tools, approval
gates, tracing, routing, and memory integration.

### [Syn](/${projectPath('syn')})

${projectSummary('syn')} An OpenAI-compatible gateway with llama.cpp,
authentication, streaming, admission control, quotas, and model routing.

### [Jung Archive](/${projectPath('jung-archive')})

${projectSummary('jung-archive')} Document intelligence with retrieval,
reranking, and evaluation built into the loop.

### [Munin](/${projectPath('munin')})

${projectSummary('munin')} Long-term agent memory with semantic retrieval,
admission, deduplication, consolidation, and auditability.

## More Engineering

**[Aletheia](/${projectPath('aletheia')})** — ${projectSummary('aletheia')}

**[AutoApply](/${projectPath('auto-apply')})** — ${projectSummary('auto-apply')}

**[RagParser](/${projectPath('ragparser')})** — ${projectSummary('ragparser')}

**[Absurd RAG](/${projectPath('absurd-rag')})** — ${projectSummary('absurd-rag')}

## Writing

I document the architecture, failures, experiments, and tradeoffs behind the
systems I build.

- [Jung Archive](/${writingPath('jung-archive')})
- [RagParser](/${writingPath('ragparser')})
- [Running / installing a local LLM](/${writingPath('local-llm')})
- [Absurd RAG](/${writingPath('absurd-rag')})

## Beyond AI

I started in full-stack product development and still make room for creative
technology, visual work, music/DJ experiments, and screen printing.

Explore [full-stack projects](/projects/full-stack/nerv-orbital),
[creative technology](/creative/technology/i-want-to-be-a-dj), and
[print & design](/creative/print-and-design/gamusa).

## Quick tour

Use the Explorer for the full tree, [about me](/about/me) for the longer
version, [contact](/about/contact) for professional links, and
\`skills.json\` for the working capability map.

<sub>UI inspired by Visual Studio Code. Not affiliated with Microsoft.</sub>
`

const aboutMeMd = `# About me

I'm **Nirupam Changmai**, an Applied AI / Backend Engineer based in
**Guwahati, Assam**. I started by building web products and full-stack systems:
React interfaces, APIs, databases, integrations, and the connective tissue
that turns a product idea into something people can use.

Over time, the backend questions became more interesting. Working with local
LLMs led me deeper into inference gateways, model interfaces, retrieval
pipelines, document intelligence, evaluation, and the practical failure modes
around AI agents. That progression is why my current focus is not just using a
model API, but building the systems around it: durable execution, memory,
streaming, admission control, observability, and reliable data boundaries.

Today I work across **Applied AI and backend engineering**. I am especially
interested in LLM infrastructure, agent runtimes, RAG systems, local
inference, and the engineering needed to make experiments inspectable and
repeatable. Python and FastAPI are central to the direction I am building
toward, alongside the TypeScript and React experience that lets me take a
system all the way to a usable product.

That history is intentionally not a clean single-track story. Full-stack
product work is still part of how I think, and I enjoy the boundary between a
backend system and the interface that makes it useful. Outside software, I
work with visual design, color separation, screen printing, and occasional
music/DJ experiments. Those are different ways of thinking about layers,
constraints, iteration, and craft.

The portfolio keeps all of those threads visible, while putting the current
specialization first.

→ Reach me: \`about/contact.md\`
`

const contactMd = `# Contact

For hiring conversations, backend work, Applied AI, or practical LLM systems,
the fastest ways to reach me are:

- **Email** — [${OWNER.email}](mailto:${OWNER.email})
- **GitHub** — [github.com/nirupamc](${OWNER.github})
- **LinkedIn** — [linkedin.com/in/nirupam-changmai-5642651ba](${OWNER.linkedin})
- **Resume** — open \`resume.pdf\` in the tree, or [download it](/resume.pdf)

**Location:** ${OWNER.location} · Open to remote opportunities.

**Open to:** Applied AI / backend roles, LLM and RAG systems, and product
engineering work.
`

const huginnMd = `# Huginn

> A durable, model-agnostic runtime for stateful AI agents.

## What it is

Huginn turns a multi-step agent task into a persisted run: typed tools and
model calls execute as steps, while state and traces remain available when a
run needs to pause, retry, or resume.

## Why I built it

An agent is difficult to trust when its useful state exists only in a process
memory or a chat transcript. Huginn explores the runtime layer around the
model: what ran, what failed, what needs approval, and what can safely resume.

## Architecture

\`Task → Run → Steps → Tool / Model execution → Persistent state + traces\`

The runtime supports typed tool discovery and execution, approval gates,
retry/error handling, tracing, model routing, and run-pinned model selection.
It can connect to OpenAI-compatible local or cloud endpoints, discover and
execute MCP-style tools, and integrate with Munin for memory.

## Engineering decisions

- Persist the run and step boundary so interruption is a recoverable state,
  not a lost request.
- Keep model selection separate from execution so a run can be pinned to the
  backend it started with.
- Treat tools as typed capabilities with explicit execution boundaries.
- Make approvals and traces part of the runtime state rather than UI-only
  conventions.

## Hard problems

Retries need to distinguish an execution error from a step that already
produced an external side effect. Resuming also requires enough persisted
context to reconstruct the run without pretending that an interrupted model
call completed.

## Evaluation / proof

The available project record reports **378 passing tests**.

## Current limitations

- Huginn is not a distributed workflow engine or Kubernetes orchestration
  platform.
- Provider and tool behavior still depends on the configured backends.
- The runtime remains oriented toward local-first and development constraints
  rather than claiming production-scale orchestration.

## Stack

Typed runtime components, OpenAI-compatible model endpoints, MCP-style tools,
persistent run state, tracing, and Munin memory integration.

## Links

See [Munin](/projects/ai-systems/munin) for the memory service Huginn can use.

`

const synMd = `# Syn

> A self-hosted, OpenAI-compatible inference gateway and control plane for
> local LLMs.

## What it is

Syn puts a stable API and policy layer in front of local inference. Clients use
OpenAI-shaped endpoints while Syn handles identity, model access, admission,
quotas, routing, streaming, and usage records.

## Architecture

\`Client → OpenAI-compatible API → Auth / policy → Admission / quota → Routing → llama.cpp → streaming response + usage record\`

The service exposes \`/v1/models\` and \`/v1/chat/completions\`, with both
non-streaming and SSE streaming responses. Runtime model detection keeps the
gateway aligned with the models available to the backend.

## Engineering decisions

- Keep the public contract OpenAI-compatible so clients do not need a custom
  SDK.
- Put FIFO admission control before inference, with limits for active work,
  queue size, and queue timeout.
- Make disconnect handling explicit so abandoned streams do not hold capacity.
- Record usage durably instead of treating tokens and requests as transient
  logs.
- Separate authentication, model policy, quotas, and routing so each can be
  inspected independently.

## Hard problems

Streaming combines resource ownership with a connection that can disappear at
any time. Queue timeouts, client disconnects, rate limits, and daily request or
token quotas all need to settle consistently when the model backend is busy.

## Current limitations

- Syn is a single-machine/local-inference control plane, not a distributed GPU
  scheduler.
- It depends on llama.cpp for inference; it is not an inference engine itself.
- Cloudflare tunneling is a connectivity option, not a substitute for a
  broader deployment or security model.

## Stack

FastAPI, Python, llama.cpp, OpenAI-compatible HTTP APIs, SSE, API keys,
authentication, FIFO admission control, quotas, usage accounting, and model
routing.

See [Huginn](/projects/ai-systems/huginn) for the agent runtime that can use
Syn as a model endpoint.

## Related writing

[Read the local LLM infrastructure summary](/writing/local-llm)
`

const jungArchiveMd = `# Jung Archive

> A local-first document intelligence, retrieval, evaluation, and
> evidence-inspection system built around Carl Jung's *The Undiscovered Self*.

## What it is

Jung Archive turns a source document into a searchable, inspectable corpus.
The system keeps document structure, retrieval candidates, reranking, answer
evidence, and provenance visible instead of treating retrieval as an invisible
prompting step.

## Architecture

The ingestion path routes native text and OCR through a canonical document IR,
preserving layout, reading order, and provenance. Retrieval combines Chroma
dense search with BM25 lexical search, fuses candidates with reciprocal rank
fusion, and can apply a cross-encoder reranker. Evidence packs and a knowledge
graph provide additional inspection paths.

## Engineering decisions

- Route native and OCR extraction separately so clean PDFs do not pay an OCR
  cost unnecessarily.
- Normalize both paths into one structure-aware IR before chunking.
- Keep dense and lexical retrieval available as separate baselines.
- Evaluate reranking independently so an attractive hybrid label does not hide
  a regression.
- Preserve spans and provenance with the result so evidence can be inspected.

## Evaluation / proof

The evaluated corpus contains **1 document and 211 chunks**:

| Retriever | Hit@1 |
| --- | ---: |
| Dense | 0.433 |
| BM25 | 0.567 |
| Hybrid | 0.500 |
| Hybrid + reranker | 0.767 |

The final evaluation reports **MRR 0.853**, **NDCG@5 0.761**, **17 graph
nodes**, **84 graph edges**, and **538 evidence spans**. Backend verification
reports **271 passing tests** and frontend verification reports **34 passing
tests**.

The useful result is not that hybrid retrieval automatically wins: in this
evaluation BM25 beats the basic hybrid run. Reranking is what materially
improves Hit@1. Retrieval quality was measured, not assumed.

## Current limitations

- The evaluation corpus is one document, so the scores do not establish
  behavior across a broad collection.
- Extraction and chunking heuristics are tuned to the current source shape.
- The system is local-first, with evaluation-size limitations that make larger
  generalization an open question.

## Stack

Native/OCR routing, Tesseract, PyMuPDF, canonical document IR, structure-aware
chunking, ChromaDB, BM25, reciprocal rank fusion, cross-encoder reranking,
evidence packs, provenance, and a knowledge graph.

See [RagParser](/projects/ai-systems/ragparser) for the earlier normalization
layer that led into this system.

## Related writing

[Read the Jung Archive engineering summary](/writing/jung-archive)
`

const muninMd = `# Munin

> Long-term memory infrastructure for AI agents.

## What it is

Munin is a memory service, not an agent runtime. It persists memory events,
applies admission and policy decisions, and returns relevant context through
semantic and temporal retrieval.

## Architecture

\`Agent event → Admission → Dedup / reinforcement / contradiction handling → Persistent memory → semantic + temporal retrieval → Agent context\`

The memory model supports policy, privacy, scoring, auditability, namespace
isolation, and categories such as working, conversational, episodic, semantic,
and user knowledge where configured.

## Engineering decisions

- Put admission before persistence so every observed event does not become
  long-term memory.
- Handle duplicates and reinforcement as explicit memory operations.
- Keep contradiction detection visible rather than silently overwriting facts.
- Combine semantic relevance with temporal relevance for context that is both
  related and current.
- Isolate namespaces and retain audit information for inspectable behavior.

## Hard problems

Memory quality is a policy problem as much as a storage problem. A useful
service must decide what deserves persistence, how repeated observations
reinforce a memory, and what to return when memories conflict.

## Current limitations

- Memory quality depends on admission and retrieval policies.
- Semantic contradiction resolution is not perfect.
- Munin provides memory infrastructure; it does not replace the agent runtime
  or model provider.

## Stack

Persistent memory events, semantic search, scoring, policy and audit layers,
deduplication, reinforcement, contradiction detection, consolidation,
temporal relevance, and namespace isolation.

See [Huginn](/projects/ai-systems/huginn) for the runtime integration point.

`

const aletheiaMd = `# Aletheia

> Local-first LLM benchmarking and profiling work.

Aletheia explores how local model configuration, runtime behavior, and serving
choices affect inference. The project belongs in the portfolio as active
benchmarking/profiling work rather than as a finished serving platform.

## Scope

- compare local model configurations and runtime behavior
- profile inference characteristics
- record the tradeoffs involved in local serving

## Current limitations

The available portfolio evidence does not establish a completed benchmark
suite or a production serving deployment, so no performance number is claimed
here.
`

const aionMd = `# AION

AION remains in the project index, but this repository does not contain enough
verified implementation detail to describe its purpose or technology stack
responsibly.
`

const djMd = `# I Want to Be a DJ

> A browser-based creative technology experiment around a 3D DJ controller.

The project explores a DDJ-FLX4-inspired interaction model in the browser,
with 3D controller work and React / Three.js where implemented. It is kept as
creative technology rather than presented as an AI or backend system.

## Scope

The portfolio evidence supports the controller and visual interaction
direction. Audio integration and additional functional controls are treated as
work in progress where they are not demonstrated by the current project
record.
`

const ragParserMd = `# RagParser

> A local-first document normalization and parser layer for RAG pipelines.

## What it is

RagParser solves the problem before retrieval: turning inconsistent document
inputs into a canonical representation that later systems can chunk, search,
and cite.

## Pipeline

Documents are classified as **NATIVE**, **OCR**, **HYBRID**, **EMPTY**,
**SUSPICIOUS**, or **FAILED**. Native extraction and Tesseract OCR feed a
canonical IR with provenance, layout, structure detection, and reading order.

## Why it matters

Retrieval cannot repair a document that was normalized incorrectly. RagParser
is the earlier document-normalization layer that led into
[Jung Archive](/projects/ai-systems/jung-archive), where retrieval and
evaluation were added around the corpus.

## Current limitations

Classification and structure heuristics remain dependent on the input document
shapes they were designed around. This is a focused parser layer, not a
general-purpose document understanding product.
`

const absurdRagMd = `# Absurd RAG

> Earlier local RAG experimentation around Albert Camus.

Absurd RAG explored a fully local direction for asking questions over PDF
material: ingestion, OCR, chunking, embeddings, ChromaDB retrieval, and the
llama.cpp direction for generation.

It is useful engineering lineage rather than a finished production system.
The work paused before a fully completed end-to-end system was established,
which is why the project remains a supporting entry.

The experiment led toward the more deliberate document normalization in
[RagParser](/projects/ai-systems/ragparser) and the measured retrieval work in
[Jung Archive](/projects/ai-systems/jung-archive).

## Related writing

[Read the RagParser engineering summary](/writing/ragparser)
`

const jungArchiveWritingMd = `# Jung Archive

I started this project because I did not want to assume that a plausible RAG
answer meant the retrieval was good. The article follows the work from a
single source document through extraction, chunking, dense and lexical
retrieval, reranking, and evidence inspection.

## What I wrote about

- why retrieval quality needs an explicit evaluation set
- the difference between dense, BM25, hybrid, and reranked retrieval
- provenance and evidence packs as debugging tools
- the practical limits of evaluating a one-document corpus

The measured result was more useful than a generic “hybrid is better” story:
BM25 beat the basic hybrid run, while reranking moved Hit@1 from **0.433 to
0.767**. The evaluation also reports **MRR 0.853** and **NDCG@5 0.761**.

## Related system

[Jung Archive](/projects/ai-systems/jung-archive)
`

const ragParserWritingMd = `# RagParser

PDFs are not documents in the tidy sense a downstream RAG pipeline wants.
Some contain usable native text, some need OCR, and some produce output that
looks valid until reading order or layout is inspected.

## What I wrote about

- routing native, OCR, hybrid, empty, suspicious, and failed inputs
- normalizing extraction into a canonical intermediate representation
- preserving layout, reading order, and provenance
- why parser quality is a prerequisite for retrieval quality

The article describes the layer that came before the retrieval evaluation:
make the input inspectable first, then ask whether search is working.

## Related system

[RagParser](/projects/ai-systems/ragparser)
`

const localLlmWritingMd = `# Running a Local LLM

This entry is about the practical work of installing and running a local model,
not a retroactive rewrite of that work as an inference platform.

## What I wrote about

- getting a llama.cpp-based runtime installed and usable
- hardware and memory constraints that shape model choice
- CUDA/runtime setup and the difference between “installed” and “serving”
- the performance reality of local inference
- the deployment questions that later led toward Syn

The useful lesson was that local inference is a systems problem: model files,
runtime support, memory, throughput, and an API boundary all matter together.

## Related system

[Syn](/projects/ai-systems/syn)
`

const absurdRagWritingMd = `# Absurd RAG

Absurd RAG was an earlier local experiment around an Albert Camus corpus. It
started with the appealingly simple loop—ingest a PDF, split it, embed it,
search it locally—and exposed how many decisions sit inside that loop.

## What I wrote about

- OCR and PDF ingestion problems
- chunking and embedding tradeoffs
- ChromaDB retrieval and the llama.cpp direction
- what broke before a complete end-to-end system was established
- why the next iteration needed better document normalization and evaluation

This was lineage, not a finished production system. The lessons led into
[RagParser](/projects/ai-systems/ragparser) and later the measured retrieval
work in [Jung Archive](/projects/ai-systems/jung-archive).

## Related system

[Absurd RAG](/projects/ai-systems/absurd-rag)
`

export const files: PortfolioFile[] = [
  {
    id: 'readme',
    name: 'README.md',
    path: 'README.md',
    language: 'markdown',
    icon: 'md',
    viewer: 'markdown',
    content: readmeMd,
  },
  {
    id: 'about/me',
    name: 'me.md',
    path: 'about/me.md',
    language: 'markdown',
    icon: 'md',
    viewer: 'markdown',
    content: aboutMeMd,
  },
  {
    id: 'about/contact',
    name: 'contact.md',
    path: 'about/contact.md',
    language: 'markdown',
    icon: 'md',
    viewer: 'markdown',
    content: contactMd,
  },
  {
    id: 'experience/tantech',
    name: 'tantech.md',
    path: 'experience/tantech.md',
    language: 'markdown',
    icon: 'md',
    viewer: 'markdown',
    content: tantechMd,
  },
  {
    id: 'experience/xo-clothing',
    name: 'xo-clothing.md',
    path: 'experience/xo-clothing.md',
    language: 'markdown',
    icon: 'md',
    viewer: 'markdown',
    content: xoClothingMd,
  },
  {
    id: 'experience/freelance',
    name: 'freelance.md',
    path: 'experience/freelance.md',
    language: 'markdown',
    icon: 'md',
    viewer: 'markdown',
    content: freelanceMd,
  },
  {
    id: 'experience/watawi',
    name: 'watawi.md',
    path: 'experience/watawi.md',
    language: 'markdown',
    icon: 'md',
    viewer: 'markdown',
    content: watawiMd,
  },
  {
    id: 'experience/riyum',
    name: 'riyum.md',
    path: 'experience/riyum.md',
    language: 'markdown',
    icon: 'md',
    viewer: 'markdown',
    content: riyumMd,
  },
  {
    id: 'education/mca-amity',
    name: 'mca-amity.md',
    path: 'education/mca-amity.md',
    language: 'markdown',
    icon: 'md',
    viewer: 'markdown',
    content: mcaAmityMd,
  },
  {
    id: 'education/bca-gcu',
    name: 'bca-gcu.md',
    path: 'education/bca-gcu.md',
    language: 'markdown',
    icon: 'md',
    viewer: 'markdown',
    content: bcaGcuMd,
  },
  {
    id: 'projects/full-stack/nerv-orbital',
    name: 'nerv-orbital.md',
    path: 'projects/full-stack/nerv-orbital.md',
    language: 'markdown',
    icon: 'md',
    viewer: 'markdown',
    content: nervOrbitalMd,
  },
  {
    id: 'projects/full-stack/pwa-attendance',
    name: 'pwa-attendance.md',
    path: 'projects/full-stack/pwa-attendance.md',
    language: 'markdown',
    icon: 'md',
    viewer: 'markdown',
    content: pwaAttendanceMd,
  },
  {
    id: 'projects/full-stack/thrift-bazaar',
    name: 'thrift-bazaar.md',
    path: 'projects/full-stack/thrift-bazaar.md',
    language: 'markdown',
    icon: 'md',
    viewer: 'markdown',
    content: thriftBazaarMd,
  },
  {
    id: 'projects/tantech-dashboard',
    name: 'tantech-dashboard.md',
    path: 'projects/tantech-dashboard.md',
    language: 'markdown',
    icon: 'md',
    viewer: 'markdown',
    content: tantechDashboardMd,
  },
  {
    id: 'projects/products/auto-apply',
    name: 'auto-apply.md',
    path: 'projects/products/auto-apply.md',
    language: 'markdown',
    icon: 'md',
    viewer: 'markdown',
    content: autoApplyMd,
  },
  {
    id: 'creative/print-and-design/gamusa',
    name: 'gamusa.md',
    path: 'creative/print-and-design/gamusa.md',
    language: 'markdown',
    icon: 'md',
    viewer: 'markdown',
    content: gamusaMd,
  },
  {
    id: 'creative/print-and-design/kyd',
    name: 'kyd.md',
    path: 'creative/print-and-design/kyd.md',
    language: 'markdown',
    icon: 'md',
    viewer: 'markdown',
    content: kydMd,
  },
  ...[
    ['projects/ai-systems/huginn', 'huginn.md', huginnMd],
    ['projects/ai-systems/syn', 'syn.md', synMd],
    ['projects/ai-systems/jung-archive', 'jung-archive.md', jungArchiveMd],
    ['projects/ai-systems/munin', 'munin.md', muninMd],
    ['projects/ai-systems/aletheia', 'aletheia.md', aletheiaMd],
    ['projects/ai-systems/aion', 'aion.md', aionMd],
    ['projects/ai-systems/ragparser', 'ragparser.md', ragParserMd],
    ['projects/ai-systems/absurd-rag', 'absurd-rag.md', absurdRagMd],
    ['creative/technology/i-want-to-be-a-dj', 'i-want-to-be-a-dj.md', djMd],
    ['creative/print-and-design/screen-printing', 'screen-printing.md', '# Screen Printing\n\nScreen-printing work and process documentation.'],
    ['writing/jung-archive', 'jung-archive.md', jungArchiveWritingMd],
    ['writing/ragparser', 'ragparser.md', ragParserWritingMd],
    ['writing/local-llm', 'local-llm.md', localLlmWritingMd],
    ['writing/absurd-rag', 'absurd-rag.md', absurdRagWritingMd],
  ].map(([id, name, content]) => ({
    id,
    name,
    path: `${id}.md`,
    language: 'markdown',
    icon: 'md' as const,
    viewer: 'markdown' as const,
    content,
  })),
  {
    id: 'projects/experiments',
    name: 'experiments.md',
    path: 'projects/experiments.md',
    language: 'markdown',
    icon: 'md',
    viewer: 'markdown',
    content: experimentsMd,
  },
  {
    id: 'credits',
    name: 'CREDITS.md',
    path: 'CREDITS.md',
    language: 'markdown',
    icon: 'md',
    viewer: 'markdown',
    content: creditsMd,
  },
  {
    id: 'skills',
    name: 'skills.json',
    path: 'skills.json',
    language: 'json',
    icon: 'json',
    viewer: 'code',
    content: skillsJson,
  },
  {
    id: 'resume',
    name: 'resume.pdf',
    path: 'resume.pdf',
    language: 'pdf',
    icon: 'pdf',
    viewer: 'pdf',
    content: '',
  },
]

export const fileById = new Map(files.map((f) => [f.id, f]))

/** Legacy routes kept working while the Explorer adopts the new IA. */
export const fileAliases: Record<string, string> = {
  'projects/nerv-orbital': 'projects/full-stack/nerv-orbital',
  'projects/pwa-attendance': 'projects/full-stack/pwa-attendance',
  'projects/thrift-bazaar': 'projects/full-stack/thrift-bazaar',
  'projects/auto-apply': 'projects/products/auto-apply',
  'projects/gamusa-reimagined': 'creative/print-and-design/gamusa',
  'projects/kyd-color-separation': 'creative/print-and-design/kyd',
}

export function resolveFileId(id: string): string {
  return fileAliases[id] ?? id
}

function projectTreeFiles(category: 'ai-systems' | 'products' | 'full-stack' | 'creative-tech' | 'creative'): TreeNode[] {
  return projects
    .filter((project) => project.category === category)
    .sort((a, b) => a.order - b.order)
    .map((project) => ({ kind: 'file' as const, fileId: project.bodyFileId }))
}

// Explorer order: folders as listed, then root files.
// Experience files newest-first.
export const tree: TreeNode[] = [
  { kind: 'file', fileId: 'readme' },
  {
    kind: 'folder',
    name: 'about',
    children: [
      { kind: 'file', fileId: 'about/me' },
      { kind: 'file', fileId: 'about/contact' },
    ],
  },
  {
    kind: 'folder',
    name: 'experience',
    children: [
      { kind: 'file', fileId: 'experience/tantech' },
      { kind: 'file', fileId: 'experience/xo-clothing' },
      { kind: 'file', fileId: 'experience/freelance' },
      { kind: 'file', fileId: 'experience/watawi' },
      { kind: 'file', fileId: 'experience/riyum' },
    ],
  },
  {
    kind: 'folder',
    name: 'education',
    children: [
      { kind: 'file', fileId: 'education/mca-amity' },
      { kind: 'file', fileId: 'education/bca-gcu' },
    ],
  },
  {
    kind: 'folder',
    name: 'projects',
    children: [
      {
        kind: 'folder',
        name: 'ai-systems',
        children: projectTreeFiles('ai-systems'),
      },
      {
        kind: 'folder',
        name: 'products',
        children: projectTreeFiles('products'),
      },
      {
        kind: 'folder',
        name: 'full-stack',
        children: projectTreeFiles('full-stack'),
      },
      { kind: 'file', fileId: 'projects/tantech-dashboard' },
      { kind: 'file', fileId: 'projects/experiments' },
    ],
  },
  {
    kind: 'folder',
    name: 'creative',
    children: [
      {
        kind: 'folder',
        name: 'technology',
        children: projectTreeFiles('creative-tech'),
      },
      {
        kind: 'folder',
        name: 'print-and-design',
        children: projectTreeFiles('creative'),
      },
    ],
  },
  {
    kind: 'folder',
    name: 'writing',
    children: [
      { kind: 'file', fileId: 'writing/jung-archive' },
      { kind: 'file', fileId: 'writing/ragparser' },
      { kind: 'file', fileId: 'writing/local-llm' },
      { kind: 'file', fileId: 'writing/absurd-rag' },
    ],
  },
  { kind: 'file', fileId: 'credits' },
  { kind: 'file', fileId: 'skills' },
  { kind: 'file', fileId: 'resume' },
]
