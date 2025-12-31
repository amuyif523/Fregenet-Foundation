import type { Metadata } from "next";
import PageContent from "@/components/PageContent";
import { loadContent } from "@/lib/content";
import { getSiteConfig } from "@/lib/site";
import { buildPageMetadata } from "@/lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const [content, site] = await Promise.all([loadContent("impact"), getSiteConfig()]);
  return buildPageMetadata(content, site);
}

export default async function ImpactPage() {
  const content = await loadContent("impact");
  return <PageContent content={content} />;
}
