import type { Metadata } from "next";
import CTA from "@/components/CTA";
import ContactForm from "@/components/ContactForm";
import Section from "@/components/Section";
import Hero from "@/components/Hero";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";
import { getContent } from "@/lib/content";
import { getCachedSiteConfig } from "@/lib/site";
import { buildPageMetadata, getSiteUrl } from "@/lib/metadata";

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const [content, site] = await Promise.all([getContent("contact"), getCachedSiteConfig()]);
  return buildPageMetadata(content, site);
}

export default async function ContactPage() {
  const content = await getContent("contact");
  const siteUrl = getSiteUrl();
  const heroImage = { src: "/hero-pattern.svg", alt: "Abstract pattern referencing Ethiopian textiles" };

  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Home", url: siteUrl }, { name: content.title, url: `${siteUrl}/contact` }]} />
      <Hero
        kicker={content.kicker}
        title={content.title}
        description={content.description}
        ctaLabel={content.ctaLabel}
        ctaHref={content.ctaHref}
        imageSrc="/hero-pattern.svg"
        imageAlt="Abstract pattern referencing Ethiopian textiles"
      />
      <Section>
        <article dangerouslySetInnerHTML={{ __html: content.html }} />
        <ContactForm />
      </Section>
    </>
  );
}
