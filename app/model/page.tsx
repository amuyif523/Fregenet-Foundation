import type { Metadata } from "next";
import PageContent from "@/components/PageContent";
import { loadContent } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  const content = await loadContent("model");
  return {
    title: `${content.title} | Fregenet Foundation`,
    description: content.description
  };
}

export default async function ModelPage() {
  const content = await loadContent("model");
  return <PageContent content={content} kicker="Whole Child / Obstacle Removal" />;
}
