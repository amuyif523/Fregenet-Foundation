import type { Metadata } from "next";
import PageContent from "@/components/PageContent";
import { getContent } from "@/lib/content";
import { getCachedSiteConfig } from "@/lib/site";
import { buildPageMetadata } from "@/lib/metadata";

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const [content, site] = await Promise.all([getContent("impact"), getCachedSiteConfig()]);
  return buildPageMetadata(content, site);
}

export default async function ImpactPage() {
  const content = await getContent("impact");
  return <PageContent content={content} />;
}
