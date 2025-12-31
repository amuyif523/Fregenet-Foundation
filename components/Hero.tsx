import CTA from "./CTA";

type HeroProps = {
  kicker?: string;
  title: string;
  description?: string;
  ctaLabel?: string;
  ctaHref?: string;
};

export default function Hero({ kicker, title, description, ctaLabel, ctaHref }: HeroProps) {
  return (
    <div className="border-b border-ink/5 bg-white/90">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-12 md:flex-row md:items-center md:justify-between">
        <div className="max-w-3xl">
          {kicker ? (
            <div className="mb-3 text-xs font-semibold uppercase tracking-[0.12em] text-accent">{kicker}</div>
          ) : null}
          <h1 className="text-3xl font-semibold text-ink md:text-4xl lg:text-5xl">{title}</h1>
          {description ? <p className="mt-4 text-lg text-ink-muted md:text-xl">{description}</p> : null}
        </div>
        {ctaLabel && ctaHref ? (
          <div className="flex items-center gap-3">
            <CTA href={ctaHref} label={ctaLabel} />
          </div>
        ) : null}
      </div>
    </div>
  );
}
