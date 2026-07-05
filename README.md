# Lab Notebook Portfolio

A portfolio site framed like a computer-vision lab notebook: projects are
logged as experiments, articles are logged as field notes. Built with
Next.js 14 (App Router) + TypeScript + Tailwind + Framer Motion.

## Run it

```bash
npm install
npm run dev
```

Then open http://localhost:3000

## Structure

- `app/page.tsx` — home page, with the signature "detection frame" hero
- `app/projects/page.tsx` — grid of all projects
- `app/projects/[slug]/page.tsx` — one page per project, auto-generated from `lib/projects.ts`
- `app/notes/page.tsx` — list of articles
- `app/notes/[slug]/page.tsx` — one page per article, auto-generated from `content/notes/*.md`
- `components/Scanner.tsx` — the bounding-box / confidence-score animation used on the homepage hero

## Add a new project

Open `lib/projects.ts` and add a new object to the `projects` array. A new
page at `/projects/your-slug` appears automatically — no new file needed.

## Write a new article

Add a new `.md` file to `content/notes/`, e.g. `content/notes/my-new-post.md`:

```md
---
title: "Your title"
date: "2026-07-04"
tag: "computer-vision"
excerpt: "One line description shown in the list."
---

Your article content in normal markdown.
```

It will show up automatically on `/notes` and get its own page at
`/notes/my-new-post`.

## Customizing the look

Colors, fonts, and the grid background are defined as design tokens in
`tailwind.config.ts`:

- `ink` — background
- `paper` — main text
- `signal` — accent (bounding-box orange)
- `confidence` — secondary accent (used only for score/data readouts)
- `line` — hairline dividers/borders

Fonts are loaded in `app/layout.tsx` via `next/font/google`:
Fraunces (display), Inter (body), JetBrains Mono (labels/data).

## Notes

- No CMS, no database — projects and notes are just data files, so it stays
  fast and free to host (Vercel, Netlify, or any static-friendly host).
- If you later want richer article formatting (embedded React components,
  code blocks with syntax highlighting), swap `marked` for `next-mdx-remote`
  — the `lib/notes.ts` loader is the only place that would need to change.
