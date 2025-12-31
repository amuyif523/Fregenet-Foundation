# Contributing to Fregenet Foundation Site

## Branching & PRs
- Create feature branches from `main`.
- Keep PRs focused and small; include context and screenshots when relevant.
- Use the PR template; mark checkboxes for lint/typecheck/build and note any env vars.

## Setup
```bash
npm install
npm run lint
npm run typecheck
npm test
npm run dev
```

## Testing & Quality
- Required before merge: `npm run lint`, `npm run typecheck`, `npm test`.
- For content changes, ensure text lives in `/content` and frontmatter stays valid.
- If adding images, use `next/image` and provide meaningful `alt` text.

## Monitoring & Ops
- Health endpoint: `/api/health` returns `{ ok: true }`. Configure uptime monitors (e.g., UptimeRobot/StatusCake) to check it.
- Logs: contact intake logs to server console; ensure hosting platform retains logs.

## Deployments
- Vercel (recommended): connect repo, set env vars (`SITE_URL`, SMTP/contact vars), build with `npm run build`.
- Roll forward: deploy the fix to `main` and redeploy.
- Roll back: redeploy previous successful build/commit from your host dashboard.

## Image Guidance
- Use `next/image` for all new images and supply `width`, `height`, and `alt`.
- Optimize assets; prefer SVG for patterns/icons and keep hero assets lightweight.
