import type { Metadata } from "next";
import PageContent from "@/components/PageContent";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";
import { getContent } from "@/lib/content";
import { getCachedSiteConfig } from "@/lib/site";
import { buildPageMetadata, getSiteUrl } from "@/lib/metadata";

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const [content, site] = await Promise.all([getContent("get-involved"), getCachedSiteConfig()]);
  return buildPageMetadata(content, site);
}

export default async function GetInvolvedPage() {
  const content = await getContent("get-involved");
  const siteUrl = getSiteUrl();
  const heroImage = { src: "/hero-pattern.svg", alt: "Abstract pattern referencing Ethiopian textiles" };
  return (
    <>
      <BreadcrumbJsonLd
        items={[{ name: "Home", url: siteUrl }, { name: content.title, url: `${siteUrl}/get-involved` }]}
      />
      <PageContent content={content} heroImage={heroImage} />
    </>
  );
}
