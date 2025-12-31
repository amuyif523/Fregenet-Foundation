import type { Metadata } from "next";
import PageContent from "@/components/PageContent";
import { loadContent } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  const content = await loadContent("home");
  return {
    title: `${content.title} | Fregenet Foundation`,
    description: content.description
  };
}

export default async function HomePage() {
  const content = await loadContent("home");

  return <PageContent content={content} kicker="Established 2004" />;
}
