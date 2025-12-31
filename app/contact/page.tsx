import type { Metadata } from "next";
import CTA from "@/components/CTA";
import ContactForm from "@/components/ContactForm";
import Section from "@/components/Section";
import { loadContent } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  const content = await loadContent("contact");
  return {
    title: `${content.title} | Fregenet Foundation`,
    description: content.description
  };
}

export default async function ContactPage() {
  const content = await loadContent("contact");

  return (
    <Section heading={content.title} kicker="Institutional inquiries">
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
