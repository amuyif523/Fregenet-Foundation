import CTA from "./CTA";
import Hero from "./Hero";
import Section from "./Section";
import TrustPanel from "./TrustPanel";
import type { PageContent } from "@/lib/content";

type Props = {
  content: PageContent;
  trustHighlights?: string[];
  heroImage?: {
    src: string;
    alt: string;
  };
};

export default function PageContent({ content, trustHighlights, heroImage }: Props) {
  return (
    <>
      <Hero
        kicker={content.kicker}
        title={content.title}
        description={content.description}
        ctaLabel={content.ctaLabel}
        ctaHref={content.ctaHref}
        imageSrc={heroImage?.src}
        imageAlt={heroImage?.alt}
      />
      <Section>
        <article dangerouslySetInnerHTML={{ __html: content.html }} />
        {trustHighlights ? <TrustPanel highlights={trustHighlights} /> : null}
      </Section>
    </>
  );
}
