import Link from "next/link";
import type { SiteConfig } from "@/lib/site";

type Props = {
  site: SiteConfig;
};

export default function Header({ site }: Props) {
  return (
    <header className="border-b border-ink/5 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-lg font-semibold tracking-tight text-ink">
          {site.siteName}
        </Link>
        <nav className="hidden gap-6 text-sm font-medium text-ink-muted md:flex">
          {site.nav.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-ink">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Link
            href="/get-involved"
            className="rounded-full bg-ink px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-ink/90"
          >
            {site.nav.find((n) => n.href === "/get-involved")?.label ?? "Get Involved"}
          </Link>
        </div>
      </div>
    </header>
  );
}
