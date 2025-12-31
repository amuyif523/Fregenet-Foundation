import type { Metadata } from "next";
import PageContent from "@/components/PageContent";
import { loadContent } from "@/lib/content";
import { getSiteConfig } from "@/lib/site";
import { buildPageMetadata } from "@/lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const [content, site] = await Promise.all([loadContent("get-involved"), getSiteConfig()]);
  return buildPageMetadata(content, site);
}

export default async function GetInvolvedPage() {
  const content = await loadContent("get-involved");
  return <PageContent content={content} />;
}
