import type { Metadata } from "next";
import PageContent from "@/components/PageContent";
import { loadContent } from "@/lib/content";
import { getSiteConfig } from "@/lib/site";
import { buildPageMetadata } from "@/lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const [content, site] = await Promise.all([loadContent("about"), getSiteConfig()]);
  return buildPageMetadata(content, site);
}

export default async function AboutPage() {
  const content = await loadContent("about");
  return <PageContent content={content} />;
}
