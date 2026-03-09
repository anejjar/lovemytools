# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This repository is in the **planning phase** for a free, SEO-first developer tools website (50+ browser-based utilities). The planning documents are:
- `project.txt` — Website requirements, content strategy, and tool catalog
- `plan.txt` — Technical sprint plan, architecture decisions, and implementation timeline

## Planned Tech Stack

- **Framework:** Next.js 15 (App Router, TypeScript)
- **Styling:** Tailwind CSS v4 + shadcn/ui
- **Database:** PostgreSQL via Neon + Drizzle ORM
- **Auth:** Clerk
- **Caching/Rate Limiting:** Upstash Redis
- **Testing:** Vitest (unit) + Playwright (e2e)
- **Deployment:** Vercel

## Planned Commands (once project is initialized)

```bash
pnpm dev             # Start dev server (Turbopack)
pnpm build           # Production build
pnpm lint            # ESLint
pnpm format          # Prettier
pnpm test            # Vitest unit tests
pnpm test:e2e        # Playwright e2e tests
pnpm db:generate     # Generate Drizzle migration files
pnpm db:push         # Push schema to DB (dev, no migration file)
pnpm db:migrate      # Run migrations (prod)
pnpm db:studio       # Drizzle Studio GUI
```

## Architecture

### Tool Registry Pattern (Architectural Linchpin)

Every tool lives under `src/tools/[category]/[tool-slug]/` with three files:
- `logic.ts` — Pure functions (no React, easily testable)
- `index.tsx` — React UI component
- `meta.ts` — SEO metadata, FAQs, related tools

`src/tools/_registry.ts` is the master list that powers: static site generation, dynamic routing (`generateStaticParams`), sitemap, search indexing, and related tool suggestions. Adding a new tool only requires implementing these three files and registering it here.

The `ToolMeta` shape (from `src/types/tool.ts`):
```typescript
export const meta: ToolMeta = {
  slug: "json-formatter",
  name: "JSON Formatter & Validator",
  tagline: "Format, validate, and beautify JSON instantly",
  description: "...",          // 150–160 chars for meta description
  category: "json",
  keywords: ["json formatter", "json beautifier"],
  faqs: [{ q: "...", a: "..." }],   // 5–7 items
  relatedTools: ["json-minifier", "json-diff-checker"],
  howToSteps: ["Paste your JSON...", "Click Format..."],
  lastUpdated: "2025-01-01",
};
```

The `_registry.ts` simply imports and re-exports all metas as `toolRegistry`.

### Routing

```
/                    → Home (hero, categories, FAQs)
/tools               → All tools index
/tools/[slug]        → Individual tool pages (SSG)
/api/og              → Dynamic OG image generation
/api/tools/[slug]    → Usage tracking
/api/feedback        → Tool ratings
/api/search          → Server-side search
```

### Tool Categories (10 total, 50+ tools)

JSON, Encoding, CSS, Color, Text, Security, Numbers, JavaScript, HTML, Network/API

All tools execute **client-side only** — no backend processing for tool logic.

### Key Directories

```
src/
├── tools/           # Tool implementations + _registry.ts
├── components/
│   ├── ui/          # shadcn/ui primitives
│   ├── layout/      # Header, footer, sidebar
│   ├── tool/        # Tool page template components
│   └── shared/      # CopyButton, FileDropZone, CodeEditor
├── lib/             # utils, analytics, rate-limit, redis, email
├── hooks/           # use-copy-to-clipboard, use-local-storage, use-debounce
├── db/              # Drizzle schema + migrations
├── types/           # Tool, DB, API types
└── config/          # site.ts metadata, tools registry export
```

## Environment Variables

```bash
DATABASE_URL=                          # Neon Postgres connection string
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=     # Clerk auth
CLERK_SECRET_KEY=
UPSTASH_REDIS_REST_URL=                # Upstash Redis
UPSTASH_REDIS_REST_TOKEN=
NEXT_PUBLIC_POSTHOG_KEY=               # PostHog analytics
NEXT_PUBLIC_POSTHOG_HOST=
RESEND_API_KEY=                        # Transactional email
SENTRY_DSN=                            # Error tracking
NEXT_PUBLIC_SITE_URL=
NEXT_PUBLIC_CHROME_EXTENSION_URL=
```

## Git Branching

```
main   ← production (auto-deploys to Vercel)
  └── dev     ← staging
        └── feature/[name]
        └── fix/[name]
```

Commit convention: `feat:`, `fix:`, `chore:`, `docs:`, `perf:`, `test:`

## Definition of Done (per tool)

A tool is complete when:
- Interactive tool works correctly in browser
- `/tools/[slug]` page renders with full template (hero, workspace, about, how-to, related, FAQs, extension CTA)
- `generateMetadata()` returns correct title/description/OG image
- JSON-LD schema is valid (FAQPage + WebApplication + BreadcrumbList)
- Related tools section shows 4+ tools
- FAQs section has 5–7 questions
- Lighthouse SEO score > 95
- Copy button works, mobile responsive
- Unit test exists for the core logic function in `logic.ts`

## Development Phases

Sprint 0 (setup) → Sprint 1 (home + registry) → Sprints 2–3 (50 tools) → Sprint 4 (extension landing) → Sprints 5–6 (SEO, perf, testing, launch)
