import CTA from "./CTA";
import Section from "./Section";
import type { PageContent } from "@/lib/content";

type Props = {
  content: PageContent;
  kicker?: string;
};

export default function PageContent({ content, kicker }: Props) {
  return (
    <Section heading={content.title} kicker={kicker}>
      <article dangerouslySetInnerHTML={{ __html: content.html }} />
      {content.ctaLabel && content.ctaHref ? (
        <div className="mt-8">
          <CTA href={content.ctaHref} label={content.ctaLabel} />
        </div>
      ) : null}
    </Section>
  );
}
