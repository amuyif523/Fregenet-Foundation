import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import TrustStrip from "./TrustStrip";
import type { SiteConfig } from "@/lib/site";

type LayoutProps = {
  children: ReactNode;
  site: SiteConfig;
};

export default function Layout({ children, site }: LayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-sand">
      <a
        href="#main-content"
        className="absolute left-3 top-3 z-50 -translate-y-16 rounded-md bg-ink px-3 py-2 text-sm font-semibold text-white shadow focus-visible:translate-y-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      >
        Skip to main content
      </a>
      <Header site={site} />
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <TrustStrip trustHighlights={site.trustHighlights} />
      <Footer site={site} />
    </div>
  );
}
