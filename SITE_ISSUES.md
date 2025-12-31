# Current Issues in the Fregenet Site

- **Repository setup**: Not a git repo (`git status` fails); no README or contribution guide; `.gitignore` excludes lockfiles (`package-lock.json`, `yarn.lock`, `pnpm-lock.yaml`), so dependency versions would drift and cannot be pinned in git; no CI or lint/test workflow defined.
- **Dependencies/security**: Using `next@14.2.5` which has a published security advisory; several transient deprecated packages surfaced during install; no lockfile tracked for reproducible builds; no npm audit plan documented.
- **Content architecture**: Some narrative copy is hardcoded in components (`components/Header.tsx`, `components/Footer.tsx`, page kickers in `app/*/page.tsx`) instead of Markdown, violating the “all long-form copy in .md/.mdx” rule.
- **Markdown rendering risk**: `lib/content.ts` pipes Markdown through `remark-html` and injects it via `dangerouslySetInnerHTML` without sanitization, enabling potential XSS if content is ever user-editable.
- **Routing/UX**: Navigation is hidden on small screens (nav only renders at `md` and up) so mobile users cannot reach most pages; no active state or breadcrumb; no 404 or error page; no sitemap/robots.
- **Page structure/design**: Each page is a single card block with no hero, secondary sections, or trust signals; typography and layout are minimal and do not yet convey the “institutional, embassy-ready” design requested; no imagery or cultural cues; limited spacing hierarchy on long pages.
- **Accessibility**: No skip link; mobile nav absent; contact form lacks clear success/error annunciation for screen readers; color contrast not verified; buttons/links lack focus-visible styles on nav items.
- **SEO**: Metadata only sets `title` and `description`; no canonical URLs, Open Graph/Twitter tags, structured data, or sitemap/robots; no per-page keywords or alt tags since there are no images.
- **Contact/inquiry flow**: `app/api/contact/route.ts` just logs and optionally posts to a webhook; no delivery guarantee (email/storage), no validation beyond presence checks, no spam/rate-limit, no confirmation email, no privacy copy; `ContactForm.tsx` shows only “Submitted.” without context.
- **Performance/deployment**: No caching/revalidation strategy defined; FS reads on each request could block edge deployment; no asset optimization or image handling; no environment template for `CONTACT_WEBHOOK_URL`.

## Proposed Sprints (to reach an international-grade NGO site)

1) **Repo + Hygiene**
   - Initialize git and commit current state with a lockfile.
   - Add README with purpose, stack, setup, env vars, and deploy steps.
   - Add `.env.example` covering `CONTACT_WEBHOOK_URL` and future keys.
   - Ensure `.gitignore` keeps build artifacts but allows the lockfile.
   - Set up CI (GitHub Actions) for lint, type-check, and build on push/PR.
   - Add basic PR/issue templates for governance.

2) **Security & Dependencies**
   - Upgrade to the patched Next version; align `eslint-config-next` and TypeScript versions.
   - Regenerate the lockfile; run `npm audit` and address flagged issues.
   - Add `npm run lint` to CI gate; document security update cadence.

3) **Content Architecture & Metadata**
   - Move all narrative text (nav labels, footer lines, page kickers, CTA labels) into Markdown/frontmatter.
   - Create a content schema helper to enforce required frontmatter fields.
   - Add per-page metadata objects (title, description, canonical, OG/Twitter) sourced from content.
   - Add governance/trust snippets as reusable partials or content blocks.

4) **Layout, Navigation & Structure**
   - Build a responsive header with mobile menu, skip link, and focus-visible states.
   - Design a hero + sectional layout per page (intro, key facts, trust blocks, CTAs).
   - Add a global “Trust strip” for registrations/partners and a footer with contact/governance links.
   - Create 404 and error boundaries styled to match the brand.

5) **Accessibility & UX Polish**
   - Run an a11y pass (keyboard only, screen reader cues, form aria-live for success/error).
   - Verify color contrast; tune palette or add alternate theme tokens if needed.
   - Add focus outlines to nav/menu buttons; ensure mobile menu is trap/focus-managed.
   - Provide descriptive statuses on the contact form (“Received; we’ll reply in X timeframe”).

6) **SEO & Trust Signals**
   - Add canonical tags, OG/Twitter cards, and JSON-LD for organization + localBusiness (schools).
   - Generate sitemap.xml and robots.txt; set default metadata in `layout.tsx`.
   - Embed governance details (registrations, president self-funds travel, partner types) on key pages.
   - Add favicons/app icons and manifest.

7) **Contact & Intake Pipeline**
   - Replace webhook-only handler with a deliverable channel (e.g., email via SMTP/API or database).
   - Add server-side validation, spam/rate limiting, and audit logging.
   - Provide user feedback/next steps, confirmation email, and privacy/disclosure text.
   - Add admin alerting and a lightweight queue/retry for failed deliveries.

8) **Performance, Caching & Deployment**
   - Adopt static generation or ISR for content pages; ensure Markdown parsing is build-time where possible.
   - Add HTTP caching hints, image optimization pipeline, and font loading strategy.
   - Document deploy pipeline (e.g., Vercel) with environment setup and secrets management.
   - Add lightweight monitoring/uptime hooks and a roll-forward/rollback note.
