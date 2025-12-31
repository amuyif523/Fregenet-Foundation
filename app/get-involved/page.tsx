import type { Metadata } from "next";
import PageContent from "@/components/PageContent";
import { loadContent } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  const content = await loadContent("get-involved");
  return {
    title: `${content.title} | Fregenet Foundation`,
    description: content.description
  };
}

export default async function GetInvolvedPage() {
  const content = await loadContent("get-involved");
  return <PageContent content={content} kicker="Collaborate with confidence" />;
}
