import type { SiteConfig } from "@/lib/site";

type Props = {
  site: SiteConfig;
};

export default function Footer({ site }: Props) {
  return (
    <footer className="border-t border-ink/5 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-8 text-sm text-ink-muted md:flex-row md:items-center md:justify-between">
        <div>
          <div className="font-semibold text-ink">{site.siteName}</div>
          {site.tagline ? <div>{site.tagline}</div> : null}
        </div>
        <div className="flex flex-col items-start gap-1 text-left md:items-end md:text-right">
          {site.footer.map((line) => (
            <div key={line}>{line}</div>
          ))}
          {site.contactEmail ? (
            <a className="text-ink" href={`mailto:${site.contactEmail}`}>
              {site.contactEmail}
            </a>
          ) : null}
        </div>
      </div>
    </footer>
  );
}
