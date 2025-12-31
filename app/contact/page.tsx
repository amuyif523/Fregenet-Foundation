import type { Metadata } from "next";
import CTA from "@/components/CTA";
import ContactForm from "@/components/ContactForm";
import Section from "@/components/Section";
import { getContent } from "@/lib/content";
import { getCachedSiteConfig } from "@/lib/site";
import { buildPageMetadata } from "@/lib/metadata";

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const [content, site] = await Promise.all([getContent("contact"), getCachedSiteConfig()]);
  return buildPageMetadata(content, site);
}

export default async function ContactPage() {
  const content = await getContent("contact");

  return (
    <Section heading={content.title} kicker={content.kicker}>
      <article dangerouslySetInnerHTML={{ __html: content.html }} />
      {content.ctaLabel && content.ctaHref ? (
        <div className="mt-6">
          <CTA href={content.ctaHref} label={content.ctaLabel} />
        </div>
      ) : null}
      <ContactForm />
    </Section>
  );
}
