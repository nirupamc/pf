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

## Highlights

- Architected and shipped **3 React/TypeScript/Next.js applications**
  end-to-end.
- Integrated OpenAI, Anthropic, and Gemini APIs for prompt workflows,
  function calling, and structured output parsing.
- Built **5+ GraphQL/REST integrations**, reducing API latency by **~40%**.
- Created a reusable component library/design system and improved frontend
  performance with code splitting, lazy loading, and memoization.
- Built an internal employee-work tracking dashboard with React, TypeScript,
  a central work-item database, and workload/progress views.
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

## Highlights

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

`

const riyumMd = `# Riyum — Full-Stack Developer

**Mar 2024 – Jan 2025 · Guwahati**

## Engineering

- Built a **production LMS** — React, TypeScript, GraphQL — serving
  **120+ users with zero downtime**.
- Built a **real-time communications platform** — Node.js + WebSockets,
  **30+ concurrent users**, **−35% response time**.
- Created a **reusable component library** — **−45% feature dev time**.
- **Jest / React Testing Library** suites caught **15 critical bugs** before
  release.

## Creative / production

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

const autoApplyMd = `# Kairos

Kairos is a human-in-the-loop recruitment workflow platform designed to help
organize, tailor, and automate job application workflows across modern job
platforms. It combines job discovery, eligibility analysis, resume tailoring,
browser automation, application tracking, and structured review rather than
simply auto-submitting applications.

Kairos grew out of the internal AutoApply project. The product is built as a
multi-user system that keeps the applicant involved whenever confidence is low
or information is sensitive.

## Why I Built It

The problem was not simply applying faster. It was repeatedly performing the
same workflow across different job boards and recruitment sites: finding
relevant jobs, checking eligibility, tailoring resumes, answering repetitive
application questions, navigating different ATS forms, and tracking what
happened afterward.

Kairos grew into a system for orchestrating that workflow while keeping the
applicant involved whenever a decision needs context, review, or confirmation.

## What Exists Today

**Discovery & matching**

Job discovery, normalized job records, eligibility filtering, and relevance
and matching logic.

**Application intelligence**

Job-description extraction, applicant and profile context, resume tailoring,
cover-letter generation, and structured application-question handling.

**Controlled automation**

Browser-based application workflows using Playwright and Patchright, with human
confirmation when the system does not have enough confidence to proceed safely.

**Multi-user product layer**

JWT authentication, isolated user profiles and resumes, application state, and
user-specific application data.

**Application history**

Application tracking, case files, generated artifacts, question decisions, and
automation events remain traceable after an application attempt.

## Human-in-the-Loop Design

Kairos automates repetitive application work without assuming every decision
should be made autonomously. High-confidence reusable information can flow
through automatically, while ambiguous answers are surfaced for confirmation
and sensitive information is never silently inferred. The applicant remains
responsible for the final application.

## Platform Support

Kairos is designed around job-application workflows across job boards,
recruitment websites, company career pages, ATS platforms, and browser-based
application forms rather than around one specific website. Current adapters
and targeted flows include platforms such as LinkedIn, Indeed, Workday,
Greenhouse, and Lever; this is not a claim of universal compatibility.

## Architecture

Frontend

React · TypeScript · Vite

↓

Backend API

FastAPI · Python

↓

Job Discovery

JobSpy + platform adapters

↓

Intelligence Layer

Local LLM · Optional NVIDIA NIM

↓

Automation Layer

Playwright / Patchright browser workflows

↓

Persistence

SQLite + per-user data isolation

Jinja2 is used for resume and cover-letter templating. Passwords use bcrypt
hashing, and user-specific application data stays isolated.

## Explainability & Tracking

Every application becomes a traceable record rather than a black-box action.
Kairos keeps an application timeline, automation events, generated artifacts,
question decisions, a tracker, and a case file so the workflow can be reviewed
after an application attempt.

## In Use Today

Kairos has moved beyond being only a development prototype. It is packaged as
a working Windows desktop application and is currently being used by a
recruitment agency as part of a real recruitment workflow.

That external usage creates a feedback loop that isolated testing cannot fully
reproduce. Real application flows expose brittle selectors, unusual form
states, missing question categories, browser edge cases, and workflow
assumptions. Bug reports and operational feedback from the agency feed directly
into continued product iteration.

The public Kairos website documents the product, architecture, and workflow.
The application itself remains a desktop product rather than a publicly hosted
web demo.

[Visit the Kairos website](https://saaskairos.vercel.app/)

## Operational Realities

Browser automation against third-party recruitment systems is inherently a
moving target. Job boards, career sites, and ATS providers can change DOM
structures, authentication flows, forms, and anti-bot behavior, so adapters
require continued maintenance.

Some application questions intentionally remain human decisions. Sensitive
information and low-confidence answers should be confirmed rather than silently
inferred, while model output quality depends on the applicant and job context
available to the system.

The current application is desktop-first while development continues.

## Stack

**Frontend:** React, TypeScript, Vite

**Backend:** Python, FastAPI

**Automation:** Playwright / Patchright

**Job discovery:** JobSpy and platform adapters

**AI:** Local LLM, optional NVIDIA NIM

**Application layer:** JWT, bcrypt, Jinja2

**Persistence:** SQLite with per-user data isolation
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

const screenPrintingMd = `# Screen Printing

> A hands-on practice in turning digital artwork into physical layers of ink.

Screen printing is where visual design becomes a production problem. A file
has to survive separation, screens, ink, registration, fabric, and the small
decisions that determine whether the final print feels intentional.

## The process

The work begins with preparing artwork for a physical result: separating
colors, deciding what each layer needs to do, and keeping the print order in
mind. From there, the process moves through screens or plates, registration,
test prints, and iteration until the layers sit together as one image.

That workflow is visible in the production work for [KYD](/creative/print-and-design/kyd)
and the visual adaptation explored in [Gamusa](/creative/print-and-design/gamusa).

## What I like about it

The constraints are tangible. A misregistered layer cannot be patched after
the fact, and a color that looks right on screen still has to work as ink on
fabric. The process rewards preparation, careful iteration, and respect for
the material.

It is a different medium from software, but the thinking is familiar: make the
layers explicit, understand the constraints, test an assumption, and improve
the result one pass at a time.

## Related work

- [Gamusa, Reimagined](/creative/print-and-design/gamusa)
- [KYD — Color Separation](/creative/print-and-design/kyd)
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

## Creative Technology

### [AION](/${projectPath('aion')})

${projectSummary('aion')} Import, enrichment, transition scoring, and
optimized DJ flows.

### [I Want to Be a DJ](/${projectPath('i-want-to-be-a-dj')})

An interactive 3D controller experiment for the browser.

## More Engineering

**[Aletheia](/${projectPath('aletheia')})** — ${projectSummary('aletheia')}

**[Kairos](/${projectPath('auto-apply')})** — ${projectSummary('auto-apply')}

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

I'm **Nirupam Changmai**, an **Applied AI / Backend Engineer** based in
**Guwahati, Assam**. I build the systems around useful model behavior: runtimes,
inference boundaries, retrieval pipelines, and backend services that are easier
to inspect when they fail.

## What I build

My current focus is LLM infrastructure, agent runtimes, local inference,
RAG and document intelligence. That includes durable execution, memory,
streaming, admission control, provenance, and evaluation—not just calling a
model API and hoping the answer looks plausible.

I work mainly with Python and FastAPI on the backend, alongside the TypeScript
and React experience that lets me carry a system through to a usable interface.

## How I got here

I started with full-stack product work: React interfaces, APIs, databases,
integrations, and the connective tissue that turns a product idea into
something people can use. The backend questions became more interesting over
time, especially when I began running local LLMs and had to understand the
runtime, hardware, API, and failure modes around them.

That progression led from local inference experiments into gateways, retrieval
systems, document parsing, agent execution, and long-term memory. I like work
where the interesting part is making a boundary reliable and making the
system's behavior visible enough to improve.

## What I care about technically

I care about durable state instead of lost runs, evidence instead of vague
confidence, and explicit constraints instead of hidden magic. Evaluation,
provenance, inspectable data boundaries, and local-first experimentation keep
showing up in the projects I build because they make difficult systems easier
to reason about.

## Outside the backend

Full-stack product work is still part of how I think, and so are visual design,
music intelligence, DJ experiments, color separation, and screen printing. They
are not a separate persona from the engineer in the rest of this portfolio:
they are other ways of thinking about layers, constraints, iteration, and craft.

→ Reach me: [about/contact.md](/about/contact)
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

> A local-first workspace for comparing model configurations and understanding
> how runtime choices change inference behavior.

Aletheia is about the layer between “the model runs” and “the model is useful.”
It keeps configuration, runtime behavior, profiling, and serving questions
together so local inference can be compared deliberately.

## What I am measuring

- how model and runtime configuration changes behavior
- how context size, maximum output, and temperature affect a run when configured
- latency and throughput observations under local hardware constraints
- the practical difference between an installed runtime and a usable service

## How a benchmark run works

The working direction is to hold a model/runtime combination and its settings
explicit, run a comparable workload, and record the behavior rather than
remembering a single impressive result. That makes configuration tradeoffs
visible before they become serving assumptions.

## Why I built it

Local models are constrained by memory, runtime support, hardware, and the
shape of the API around them. Aletheia is a place to understand those
constraints and the optimization choices they force.

## Current state

This remains active benchmarking and profiling work, not a claim of a finished
benchmark suite or a distributed serving platform. Its questions led naturally
toward the gateway and policy work in [Syn](/projects/ai-systems/syn).

## Stack

Local LLM runtimes, model profiling, benchmark configuration, inference
serving, and runtime observation.
`

const aionMd = `# AION

> A browser-based music intelligence and DJ workflow system.

## What it is

AION imports a music library, enriches tracks with musical metadata, analyzes
the library visually, scores DJ transitions, recommends what should come next,
and generates optimized multi-track DJ flows. It started as a Spotify playlist
and DJ-sorting idea before growing into a provider-independent musical
intelligence platform.

## Why I built it

DJ decisions often depend on several signals at once: BPM, key, energy, mood,
vibe, and the role a track should play in a set. AION turns those signals into
inspectable recommendations instead of leaving the next-track decision to a
single opaque similarity score.

## Architecture

The system is a modular monolith with provider-independent domain models. Its
main flow is:

\`Provider import → Canonical Track Model → Metadata Enrichment → Music Theory
→ Mood / Vibe Inference → Library DNA → Transition Intelligence → Best Next
Track → Smart Flow → Saved Flows / Export\`

Spotify occurrences are normalized into canonical tracks, then enriched through
MusicBrainz, Soundcharts, and GetSongBPM. The domain layer does not depend on a
single provider's response shape.

## Music intelligence

Tracks can carry BPM, key, energy, Camelot mapping, harmonic compatibility,
mood/vibe inference, and a set role. Each value keeps provenance and confidence
where available, so missing or weaker enrichment remains visible in the result.

Library DNA turns those track-level signals into a visual view of the
collection, while the analysis layers provide the inputs for recommendations
and sequencing.

## Transition intelligence

A transition receives a score from 0–100 with a visible breakdown:

- Harmonic compatibility — 30%
- BPM compatibility — 25%
- Energy compatibility — 20%
- Vibe similarity — 10%
- Mood similarity — 10%
- Set-role compatibility — 5%

Recommendations include reasons, warnings, and the component scores, with
maintain, build, and drop intents available for the transition context.

## Smart Flow

Smart Flow uses beam-search sequencing to explore several possible track orders
instead of greedily taking the best next track. A flow can target a length and
an energy shape: maintain, build, drop, wave, peak_middle, or peak_end.

The objective combines transition quality and energy shape:

\`0.5 × average transition score + 0.3 × minimum transition score + 0.2 ×
energy-shape fit\`

Saved flows support CRUD operations and export to TXT, CSV, and JSON. A Spotify
playlist export path exists but is currently blocked by a live API 403.

## Explainability

AION keeps the source, confidence, analysis/model version, transition
components, recommendation reasons, and missing-data warnings close to the
result. That makes it possible to inspect why a track was recommended and
which parts of the decision are still heuristic.

## Proof / current system

- **343 backend tests passing**
- Frontend typecheck passing
- Frontend build passing
- **3,186 canonical tracks** from **3,211 Spotify occurrences**
- **25 Soundcharts-enriched tracks** (~0.8%)

The low Soundcharts coverage is part of the system's current reality, not a
number hidden behind the analytics UI.

## Stack

Frontend: Next.js 14, React 18, TypeScript, Tailwind CSS, and Recharts.

Backend: FastAPI, Python 3.11+, SQLAlchemy 2, and Alembic.

Database: SQLite.

Providers: Spotify, Soundcharts, GetSongBPM, and MusicBrainz.

Architecture principle: modular monolith with provider-independent domain
models.

## Current limitations

- Enrichment coverage is currently low.
- No phrase detection, beat-grid alignment, cue-point detection, waveform
  analysis, or vocal-clash detection yet.
- Mood and vibe inference remains heuristic.
- Spotify playlist export is blocked by a live API 403.
- The interface is currently desktop-first.
`

const djMd = `# I Want to Be a DJ

> A browser-based DJ application experiment built around a DDJ-FLX4-inspired
> 3D controller.

I started this to explore what a familiar piece of music hardware feels like
when its interaction model is rebuilt in the browser. Tribe XR was an
inspiration, but the goal is a controller that remains usable as software.

## Why I started it

The DDJ-FLX4 is a useful reference because its layout is legible: two decks,
transport controls, jog wheels, faders, and knobs all have a physical place.
Rebuilding that relationship in a browser makes the visual model, hit areas,
and interaction state part of the same engineering problem.

## What exists today

- a browser-based controller interface
- a DDJ-FLX4-inspired layout and interaction direction
- 3D controller work built with React and Three.js

## 3D controller reconstruction

The controller is being built as a collection of parts rather than one
monolithic model. Knobs, faders, jog wheels, and buttons need to be
individually addressable so they can animate, receive focus, and expose state
without turning every interaction into a mesh-wide transform. The asset work
is therefore animation-ready reconstruction: establish proportions, separate
the controls, and keep the browser scene responsive enough for direct input.

## Interaction model

Physical gestures map to browser interactions: pointer targets sit over the
controls, visual positions reflect the current value, and the scene provides
feedback as a user drags, clicks, or turns a control. Preserving usable
interaction zones matters as much as matching the reference silhouette.

## What makes it hard

The difficult work is reconstructing proportions from a physical reference,
separating controls cleanly, and coordinating visual state with control state.
A beautiful model that cannot be reached or understood by a pointer is not a
working controller.

## What I am exploring next

Audio integration, more functional controls, and a richer DJ workflow remain
in progress. They are deliberately not presented as implemented features.

## Stack

React, Three.js, browser interaction, and 3D controller work.
`

const ragParserMd = `# RagParser

> A local-first document normalization and parser layer for RAG pipelines.

## The problem

PDFs are not documents in the clean logical sense a RAG pipeline wants. A page
may contain selectable text, a scan, a mixture of both, or almost nothing
useful. Treating every page as the same input makes later chunking and
retrieval inherit silent extraction errors.

## Routing

RagParser classifies each page as **NATIVE**, **OCR**, **HYBRID**, **EMPTY**,
**SUSPICIOUS**, or **FAILED**. Native pages stay on the PyMuPDF path; scanned
regions route through Tesseract; hybrid pages preserve both signals. Empty,
suspicious, and failed outcomes remain explicit diagnostics instead of being
silently indexed.

## Canonical IR

Every route becomes one canonical intermediate representation. That IR carries
text blocks, page identity, reading order, layout information, and extraction
diagnostics so downstream code can operate on a stable shape without knowing
which extraction path produced it.

## Layout and structure

The parser detects reading order and structural cues such as headings,
headers, footers, and page numbers. Those cues let later chunkers preserve
document hierarchy instead of cutting through a heading or repeating a footer
as if it were content.

## Provenance

Each extracted unit remains traceable to its source page and region. That
provenance is essential for debugging a bad chunk and for showing evidence
when a retrieval result is inspected.

## Why it matters for RAG

Retrieval cannot repair bad normalization. RagParser was deliberately designed
as a standalone parser before retrieval, then became the foundation for
[Jung Archive](/projects/ai-systems/jung-archive), where retrieval and
evaluation were added around a corpus.

## Validation and limitations

By milestone M5, the test suite reached **142 passed, 2 skipped**. The
classification and structure heuristics remain dependent on the input shapes
they were designed around; this is a focused parser layer, not a general
document-understanding platform.

## Related writing

[Read the RagParser engineering summary](/writing/ragparser)

`

const absurdRagMd = `# Absurd RAG

> A fully local RAG experiment around Albert Camus.

## Why I built it

I wanted a local question-answering loop over a small literary corpus, without
outsourcing the documents or inference to a hosted service. The project was a
useful way to make every stage visible: what entered the system, how it was
split, what was embedded, and what a local model could retrieve.

## Corpus

The corpus contained **five PDFs**. Document quality quickly became part of
the project: some pages had usable text while *The Fall* required OCR. That
made it impossible to treat PDF extraction as a single reliable operation.

## Pipeline

The pipeline moved from PDF ingestion with **PyMuPDF** to page
classification, OCR/Tesseract routing where needed, and structure-aware
chunking. It produced **840 chunks**, generally **100–900 tokens** with most
chunks around **400–700 tokens** and roughly **50 tokens of overlap**. Chunks
were embedded with **all-MiniLM-L6-v2** and stored in **ChromaDB**. The intended
generation direction was local inference through **llama.cpp**.

## What broke

Scanned pages, inconsistent extraction, and OCR output exposed chunk-quality
problems that retrieval alone could not hide. The embeddings stage then ran
into environment and runtime issues on Windows, and the experiment paused
before a polished end-to-end system was established. Those failures were
useful signals: the ingestion boundary needed its own design and tests.

## What I learned

The project made document normalization a first-class problem. Page routing,
provenance, and structure-aware chunks mattered more than adding another
retrieval trick. That insight led directly to a standalone parser.

## Project lineage

**Absurd RAG → [RagParser](/projects/ai-systems/ragparser) → [Jung Archive](/projects/ai-systems/jung-archive)**

## Current state

Absurd RAG stopped at the embeddings/runtime stage rather than becoming a
production RAG system. It remains an important precursor project: a concrete
experiment that shaped the document intelligence work that followed.

## Stack

PyMuPDF, Tesseract, structure-aware chunking, ChromaDB,
all-MiniLM-L6-v2, and the llama.cpp local-inference direction.

## Related writing

[Read the Absurd RAG engineering summary](/writing/absurd-rag)
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
    ['creative/technology/aion', 'aion.md', aionMd],
    ['projects/ai-systems/ragparser', 'ragparser.md', ragParserMd],
    ['projects/ai-systems/absurd-rag', 'absurd-rag.md', absurdRagMd],
    ['creative/technology/i-want-to-be-a-dj', 'i-want-to-be-a-dj.md', djMd],
    ['creative/print-and-design/screen-printing', 'screen-printing.md', screenPrintingMd],
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
  'projects/ai-systems/aion': 'creative/technology/aion',
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
