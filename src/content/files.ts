import type { PortfolioFile, TreeNode } from './types'

/* =========================================================================
 * All portfolio content lives here as a typed virtual file system.
 * Remaining owner inputs are marked `TODO: NIRUPAM`.
 * ========================================================================= */

const readmeMd = `# Nirupam Changmai

**Full-Stack Developer · AI Engineer** — Guwahati, Assam, India 🇮🇳

> Full-stack developer and AI engineer from Guwahati — I ship production apps,
> integrate LLMs, and screen-print textiles for brands I help manufacture.

Building for 5+ years — freelancing since college, 2+ years in professional roles.

---

## Now

Senior Software Developer at **TanTech LLC** (remote, USA) — building React /
TypeScript / Next.js products with AI integrations across OpenAI, Anthropic
and Gemini APIs.

## The timeline

| When | What |
| ---- | ---- |
| Jan 2026 – present | **TanTech LLC** — Senior Software Developer (remote, USA) |
| Jul 2025 – Jan 2026 | **XO Clothing** — Web & Digital Operations |
| Jan 2025 – Jul 2025 | **Full-time freelance stretch** + **Watawi** product & manufacturing |
| Mar 2024 – Jan 2025 | **Riyum** — Full-Stack Developer (Guwahati) |
| 2020 – present | **Freelancing since college** (BCA 2020–2023) — ongoing |

## Quick tour

| Where | What |
| ----- | ---- |
| \`about/\` | Who I am + how to reach me |
| \`experience/\` | One file per role, newest first |
| \`projects/\` | Software, AI agents — and actual physical textiles |
| \`skills.json\` | The stack, as a dependencies block |
| \`resume.pdf\` | The formal version |

**Pro tips:** press \`Ctrl+P\` to fuzzy-find any file · press \`\`Ctrl+\` \`\` and type \`help\`
in the terminal · ask the Claude panel on the right about me · pet the cat.

## The unusual part

Most developers have side projects. Mine include **screen-printed garments**:
I design in Figma/Photoshop, do the color separation myself, and print on
silk screens — see \`projects/gamusa-reimagined.md\` and
\`projects/kyd-color-separation.md\`.

---

<sub>UI inspired by Visual Studio Code. Not affiliated with Microsoft.
Built with React, Vite, Tailwind and Shiki — no Monaco, all handmade.</sub>
`

const aboutMeMd = `# About me

<img src="/images/about/profile.jpg" align="right" width="150" alt="Nirupam Changmai" style="border: 1px solid rgba(255,255,255,0.15); border-radius: 4px; margin: 4px 0 12px 16px;" />

I'm **Nirupam Changmai**, a full-stack developer and AI engineer from
**Guwahati, Assam**. Building for 5+ years — freelancing since college,
2+ years in professional roles. Right now: Senior Software Developer at
TanTech LLC (remote, USA).

## What I do

- **Full-stack product work** — React, TypeScript, Next.js, Node.js, Python,
  GraphQL. Schema to pixel.
- **AI engineering** — LLM integrations with OpenAI, Anthropic and Gemini:
  prompt engineering, function calling, RAG, structured output parsing.
  MCA with an ML & AI specialization.
- **Physical products** — I design, color-separate and screen-print textiles,
  and manage manufacturing for the Watawi apparel brand. Design file to
  shipped garment.

## Why the mix works

Printing demands the same discipline as shipping software: plan the layers,
respect the medium, iterate on proofs, then commit. Except in printing there
is no hotfix after the ink hits the fabric.

→ Reach me: \`about/contact.md\`
`

const contactMd = `# Contact

The fastest ways to reach me:

-  **Email** — <!-- TODO: NIRUPAM — add email --> nirupamchangmai99@gmail.com
-  **GitHub** — [github.com/nirupamc](https://github.com/nirupamc)
-  **LinkedIn** — [linkedin.com/in/nirupam-changmai-5642651ba](https://www.linkedin.com/in/nirupam-changmai-5642651ba)
-  **Resume** — open \`resume.pdf\` in the tree, or [download it](/resume.pdf)

**Location:** Guwahati, Assam, India (UTC+5:30) — remote-friendly, currently
working US hours for TanTech.

**Open to:** full-time roles, AI/LLM integration work, and conversations about
Three.js or screen printing (ideally both).

Response time: usually < 24h.
`

const tantechMd = `# TanTech LLC — Senior Software Developer

**Jan 2026 – Present · Remote (USA)**

## Highlights

- Architected and shipped **3 React/TypeScript/Next.js applications**
  end-to-end — **zero critical bugs in production**.
- **AI integrations** with OpenAI, Anthropic and Gemini APIs: prompt
  engineering, function calling, structured output parsing.
- Built **5+ GraphQL/REST integrations**; cut API latency by **40%**.
- Created a **component library / design system** that cut UI development
  time by **45%**.
- **35% performance improvement** via code splitting, lazy loading and
  memoization.
- CI/CD pipelines with **GitHub Actions**.

## Tools I've built at TanTech

-  **Internal employee-work dashboard** — the team's daily tracking
  database → [tantech-dashboard](/projects/tantech-dashboard)
-  **PWA attendance system** — QR clock-in/out, geolocation, leave flow
  → [pwa-attendance](/projects/pwa-attendance)
-  **Autonomous job-application agent** (in development)
  → [auto-apply](/projects/auto-apply)

## Before / after

The site I inherited and rebuilt — the old version is still up as a museum
piece: [tantechllc.netlify.app](https://tantechllc.netlify.app)

## Stack

\`React\` · \`TypeScript\` · \`Next.js\` · \`GraphQL\` · \`OpenAI\` · \`Anthropic\` · \`Gemini\` · \`GitHub Actions\`
`

const xoClothingMd = `# XO Clothing — Web & Digital Operations

**Jul 2025 – Jan 2026**

## Highlights

- **Rebuilt the company website** — **+25% organic traffic** within 4 months.
- Managed the content pipeline across **3 platforms** — **+18% following**.
- Produced social media content that generated **10M+ views in one month**.
- Streamlined client communications — **−40% turnaround time**.

## Receipts

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
  printing craft started. The craft I picked up at Riyum became
  [gamusa-reimagined](/projects/gamusa-reimagined) and the production plate
  work in [kyd-color-separation](/projects/kyd-color-separation).

\`\`\`gallery
riyum
\`\`\`

## Stack

\`React\` · \`TypeScript\` · \`GraphQL\` · \`Node.js\` · \`WebSockets\` · \`Jest\` · \`RTL\`
`

const mcaAmityMd = `# MCA — Machine Learning & AI Specialization

**Amity University Online · 2023 – 2025**

Master of Computer Applications with a specialization in **Machine Learning
and Artificial Intelligence** — pursued while working full-time, which is
its own kind of distributed systems problem.

## Relevant to the day job

The specialization underpins the professional LLM work: understanding what's
under the API (embeddings, transformers, evaluation) makes prompt
engineering, RAG design and function-calling schemas less cargo-cult and
more engineering.
`

const bcaGcuMd = `# BCA — Bachelor of Computer Applications

**Girijananda Chowdhary University · 2020 – 2023**

The foundation years — data structures, databases, networks, and the first
"it works on my machine" incidents.

Learned at least as much from side projects as from the syllabus; several of
the experiments in \`projects/experiments.md\` date back to this era.
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

const autoApplyMd = `# Auto-Apply

> An autonomous job-application agent. **AI agents doing the boring part.**
> _Status: in development, at **TanTech LLC** — see
> [experience/tantech](/experience/tantech)._

## The idea

Applying to jobs is a loop of reading forms, extracting requirements, and
filling in the same information with slight variations. That's an agent
problem:

- **LLM-driven form understanding** — parse arbitrary application forms.
- **Autonomous form filling** — map profile data onto whatever fields the
  form invents.
- **Application submission** — the agent completes the loop end-to-end.

## Why it matters (to me)

This is the practical edge of my AI work: not a chatbot demo, but an agent
that perceives (form structure), decides (field mapping) and acts (submits) —
with all the guardrail and reliability questions that come with autonomy.

## Stack

\`LLM function calling\` · \`Structured parsing\` · \`Automation\`

[Source — github.com/nirupamc/auto-apply-](https://github.com/nirupamc/auto-apply-)
`

const gamusaMd = `# Gamusa, Reimagined

> A case study: traditional Assamese textile × modern graphic language,
> screen-printed by hand.

## What a gamusa is

The **gamusa** is a hand-woven cotton textile from Assam — white with red
borders and woven motifs — and one of the most significant cultural symbols
of Assamese identity. It's offered as a gesture of respect, worn, gifted at
Bihu, draped over honoured guests. Everyone in Assam owns one; almost nobody
redesigns one.

## My modern twist

I kept the format sacred — the proportions, the red-on-white language — and
replaced the graphics with contemporary illustration: modern linework and
composition that reads as *now* without disrespecting the object it lives on.


## Photos

Finished pieces and process shots:

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
  "description": "Everything installed in production (my head)",
  "dependencies": {
    "react": "*",
    "typescript": "*",
    "nextjs": "*",
    "nodejs": "*",
    "python": "*",
    "graphql": "*",
    "tailwindcss": "*",
    "websockets": "*"
  },
  "aiDependencies": {
    "openai": "*",
    "anthropic-claude": "*",
    "gemini": "*",
    "prompt-engineering": "*",
    "function-calling": "*",
    "rag": "*"
  },
  "peerDependencies": {
    "photoshop": "*",
    "illustrator": "*",
    "figma": "*",
    "screen-printing": "physical",
    "color-separation": "expert",
    "video-editing": "*",
    "aws": "*",
    "gcp": "*",
    "docker": "*",
    "github-actions": "*"
  },
  "scripts": {
    "hire": "open about/contact.md"
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
    id: 'projects/nerv-orbital',
    name: 'nerv-orbital.md',
    path: 'projects/nerv-orbital.md',
    language: 'markdown',
    icon: 'md',
    viewer: 'markdown',
    content: nervOrbitalMd,
  },
  {
    id: 'projects/pwa-attendance',
    name: 'pwa-attendance.md',
    path: 'projects/pwa-attendance.md',
    language: 'markdown',
    icon: 'md',
    viewer: 'markdown',
    content: pwaAttendanceMd,
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
    id: 'projects/auto-apply',
    name: 'auto-apply.md',
    path: 'projects/auto-apply.md',
    language: 'markdown',
    icon: 'md',
    viewer: 'markdown',
    content: autoApplyMd,
  },
  {
    id: 'projects/gamusa-reimagined',
    name: 'gamusa-reimagined.md',
    path: 'projects/gamusa-reimagined.md',
    language: 'markdown',
    icon: 'md',
    viewer: 'markdown',
    content: gamusaMd,
  },
  {
    id: 'projects/kyd-color-separation',
    name: 'kyd-color-separation.md',
    path: 'projects/kyd-color-separation.md',
    language: 'markdown',
    icon: 'md',
    viewer: 'markdown',
    content: kydMd,
  },
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

// Explorer order: folders as listed, then root files.
// Experience files newest-first.
export const tree: TreeNode[] = [
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
      { kind: 'file', fileId: 'projects/nerv-orbital' },
      { kind: 'file', fileId: 'projects/pwa-attendance' },
      { kind: 'file', fileId: 'projects/tantech-dashboard' },
      { kind: 'file', fileId: 'projects/auto-apply' },
      { kind: 'file', fileId: 'projects/gamusa-reimagined' },
      { kind: 'file', fileId: 'projects/kyd-color-separation' },
      { kind: 'file', fileId: 'projects/experiments' },
    ],
  },
  { kind: 'file', fileId: 'credits' },
  { kind: 'file', fileId: 'readme' },
  { kind: 'file', fileId: 'skills' },
  { kind: 'file', fileId: 'resume' },
]
