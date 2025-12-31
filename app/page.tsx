import type { Metadata } from "next";
import PageContent from "@/components/PageContent";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";
import PartnerStrip from "@/components/PartnerStrip";
import ImpactMetrics from "@/components/ImpactMetrics";
import { getContent } from "@/lib/content";
import { getCachedSiteConfig } from "@/lib/site";
import { buildPageMetadata, getSiteUrl } from "@/lib/metadata";

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const [content, site] = await Promise.all([getContent("home"), getCachedSiteConfig()]);
  return buildPageMetadata(content, site);
}

export default async function HomePage() {
  const [content, site] = await Promise.all([getContent("home"), getCachedSiteConfig()]);
  const siteUrl = getSiteUrl();
  const heroImage = { src: "/hero-pattern.svg", alt: "Abstract pattern referencing Ethiopian textiles" };
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Home", url: siteUrl }]} />
      <PageContent content={content} trustHighlights={site.trustHighlights} heroImage={heroImage} />
      {content.metrics ? <ImpactMetrics metrics={content.metrics} /> : null}
      <section className="mx-auto max-w-6xl px-6 pb-12">
        <h2 className="text-lg font-semibold uppercase tracking-[0.08em] text-accent">Partners & collaborators</h2>
        <PartnerStrip partners={site.partners} />
      </section>
    </>
  );
}
