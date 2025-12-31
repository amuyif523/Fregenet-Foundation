import type { SiteConfig } from "@/lib/site";

type Props = {
  site: SiteConfig;
};

export default function Footer({ site }: Props) {
  return (
    <footer className="border-t border-ink/5 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-10 text-sm text-ink-muted md:flex-row md:items-start md:justify-between">
        <div className="space-y-2">
          <div className="font-semibold text-ink">{site.siteName}</div>
          {site.tagline ? <div>{site.tagline}</div> : null}
          {site.contactEmail ? (
            <a
              className="text-ink underline decoration-accent/30 underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              href={`mailto:${site.contactEmail}`}
            >
              {site.contactEmail}
            </a>
          ) : null}
        </div>
        <div className="flex flex-col gap-2 text-left md:text-right">
          <div className="font-semibold text-ink">Governance & Contact</div>
          <div className="flex flex-col gap-1">
            <a
              href="/governance"
              className="hover:text-ink underline decoration-accent/30 underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              Governance
            </a>
            <a
              href="/contact"
              className="hover:text-ink underline decoration-accent/30 underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              Contact
            </a>
            <a
              href="/get-involved"
              className="hover:text-ink underline decoration-accent/30 underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              Get Involved
            </a>
          </div>
        </div>
        <div className="flex flex-col gap-1 text-left md:text-right">
          <div className="font-semibold text-ink">Registrations</div>
          {site.footer.map((line) => (
            <div key={line}>{line}</div>
          ))}
        </div>
      </div>
    </footer>
  );
}
