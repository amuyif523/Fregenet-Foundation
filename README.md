# Fregenet Foundation Site

Institutional website for the Fregenet Foundation (Ethiopia) built with Next.js App Router, TypeScript, Tailwind CSS, and Markdown-driven content. Pages and metadata are sourced from `/content` to keep long-form copy editable and auditable.

## Tech Stack
- Next.js (App Router) + React + TypeScript
- Tailwind CSS
- Markdown content via `gray-matter` + `remark`
- Deployed on any Next-ready host (e.g., Vercel)

## Getting Started
```bash
npm install
npm run dev
```
Visit http://localhost:3000.

## Scripts
- `npm run dev` – start dev server
- `npm run lint` – ESLint via Next
- `npm run typecheck` – TypeScript type checks
- `npm run build` – production build
- `npm start` – run compiled app

## Content Model
- All long-form copy lives in `/content/*.md` with frontmatter for `title`, `description`, and CTAs.
- Components read Markdown via `lib/content.ts`; avoid hardcoding narrative text in components.

## Environment Variables
Create `.env.local` from `.env.example`.
- `CONTACT_WEBHOOK_URL` – optional. If set, contact form submissions POST here; otherwise they are logged server-side.

## Project Structure (key paths)
- `/app` – Next.js routes
- `/components` – UI components
- `/content` – Markdown sources for pages
- `/lib` – shared helpers (content loader)

## Deployment
- Ensure env vars are configured on the host.
- Run `npm run build` to verify locally.
- Deploy to Vercel or another Next-capable host; include `CONTACT_WEBHOOK_URL` if needed.

## Contributing
- Use feature branches and open PRs.
- CI runs lint, typecheck, and build on push/PR.
- Keep the lockfile (`package-lock.json`) committed for reproducible installs.
