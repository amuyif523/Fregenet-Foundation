import type { Metadata } from "next";
import PageContent from "@/components/PageContent";
import { loadContent } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  const content = await loadContent("governance");
  return {
    title: `${content.title} | Fregenet Foundation`,
    description: content.description
  };
}

export default async function GovernancePage() {
  const content = await loadContent("governance");
  return <PageContent content={content} kicker="Transparent oversight" />;
}
