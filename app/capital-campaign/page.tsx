import type { Metadata } from "next";
import PageContent from "@/components/PageContent";
import { loadContent } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  const content = await loadContent("capital-campaign");
  return {
    title: `${content.title} | Fregenet Foundation`,
    description: content.description
  };
}

export default async function CapitalCampaignPage() {
  const content = await loadContent("capital-campaign");
  return <PageContent content={content} kicker="Permanent campus development" />;
}
