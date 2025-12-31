import type { Metadata } from "next";
import PageContent from "@/components/PageContent";
import { loadContent } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  const content = await loadContent("about");
  return {
    title: `${content.title} | Fregenet Foundation`,
    description: content.description
  };
}

export default async function AboutPage() {
  const content = await loadContent("about");
  return <PageContent content={content} kicker="Founded by Tafesse Woubshet and Melesech Gebbre" />;
}
