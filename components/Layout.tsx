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
      <Header site={site} />
      <main className="flex-1">{children}</main>
      <TrustStrip trustHighlights={site.trustHighlights} />
      <Footer site={site} />
    </div>
  );
}
