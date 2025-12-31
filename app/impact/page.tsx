import type { Metadata } from "next";
import PageContent from "@/components/PageContent";
import { loadContent } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  const content = await loadContent("impact");
  return {
    title: `${content.title} | Fregenet Foundation`,
    description: content.description
  };
}

export default async function ImpactPage() {
  const content = await loadContent("impact");
  return <PageContent content={content} kicker="Steady outcomes since 2004" />;
}
