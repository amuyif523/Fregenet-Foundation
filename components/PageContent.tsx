import CTA from "./CTA";
import Hero from "./Hero";
import Section from "./Section";
import TrustPanel from "./TrustPanel";
import type { PageContent } from "@/lib/content";
import Image from "next/image";

type Props = {
  content: PageContent;
  trustHighlights?: string[];
  heroImage?: {
    src: string;
    alt: string;
  };
};

export default function PageContent({ content, trustHighlights, heroImage }: Props) {
  const derivedHero = heroImage || (content.heroImage ? { src: content.heroImage, alt: content.heroImageAlt || "" } : undefined);

  return (
    <>
      <Hero
        kicker={content.kicker}
        title={content.title}
        description={content.description}
        ctaLabel={content.ctaLabel}
        ctaHref={content.ctaHref}
        imageSrc={derivedHero?.src}
        imageAlt={derivedHero?.alt}
      />
      <Section>
        <article dangerouslySetInnerHTML={{ __html: content.html }} />
        {content.images && content.images.length ? (
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {content.images.map((img) => (
              <figure
                key={img.src + img.alt}
                className="overflow-hidden rounded-xl border border-ink/5 bg-white/80 shadow-sm"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={800}
                  height={500}
                  className="h-56 w-full object-cover"
                  loading="lazy"
                />
                {(img.caption || img.credit) && (
                  <figcaption className="px-4 py-3 text-sm text-ink-muted">
                    {img.caption}
                    {img.credit ? <span className="ml-2 text-ink/60">Credit: {img.credit}</span> : null}
                  </figcaption>
                )}
              </figure>
            ))}
          </div>
        ) : null}
        {trustHighlights ? <TrustPanel highlights={trustHighlights} /> : null}
      </Section>
    </>
  );
}
