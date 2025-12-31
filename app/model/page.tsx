import type { Metadata } from "next";
import PageContent from "@/components/PageContent";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";
import ModelAtGlance from "@/components/ModelAtGlance";
import Timeline from "@/components/Timeline";
import { getContent } from "@/lib/content";
import { getCachedSiteConfig } from "@/lib/site";
import { buildPageMetadata, getSiteUrl } from "@/lib/metadata";

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const [content, site] = await Promise.all([getContent("model"), getCachedSiteConfig()]);
  return buildPageMetadata(content, site);
}

export default async function ModelPage() {
  const content = await getContent("model");
  const siteUrl = getSiteUrl();
  const heroImage = { src: "/hero-pattern.svg", alt: "Abstract pattern referencing Ethiopian textiles" };
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Home", url: siteUrl }, { name: content.title, url: `${siteUrl}/model` }]} />
      <PageContent content={content} heroImage={heroImage} />
      <ModelAtGlance graphicSrc={content.modelGraphic} graphicAlt={content.modelGraphicAlt} pillars={content.pillars} />
      {content.timeline ? <Timeline entries={content.timeline} /> : null}
    </>
  );
}
