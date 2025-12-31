import type { Metadata } from "next";
import PageContent from "@/components/PageContent";
import { loadContent } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  const content = await loadContent("programs");
  return {
    title: `${content.title} | Fregenet Foundation`,
    description: content.description
  };
}

export default async function ProgramsPage() {
  const content = await loadContent("programs");
  return <PageContent content={content} kicker="Addis Ababa and Bishoftu" />;
}
