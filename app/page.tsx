import type { Metadata } from "next";
import PageContent from "@/components/PageContent";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";
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
    </>
  );
}
