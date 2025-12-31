import Image from "next/image";
import CTA from "./CTA";

type HeroProps = {
  kicker?: string;
  title: string;
  description?: string;
  ctaLabel?: string;
  ctaHref?: string;
  ctaSecondaryLabel?: string;
  ctaSecondaryHref?: string;
  imageSrc?: string;
  imageAlt?: string;
  compact?: boolean;
};

export default function Hero({
  kicker,
  title,
  description,
  ctaLabel,
  ctaHref,
  ctaSecondaryLabel,
  ctaSecondaryHref,
  imageSrc,
  imageAlt,
  compact = false
}: HeroProps) {
  return (
    <div className={`border-b border-ink/5 ${compact ? "bg-white" : "bg-gradient-to-br from-white via-sand to-white"}`}>
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-8 px-6 py-14 md:grid-cols-2 md:py-18">
        <div className="space-y-4">
          {kicker ? (
            <div className="text-xs font-semibold uppercase tracking-[0.12em] text-accent">{kicker}</div>
          ) : null}
          <h1 className="text-3xl font-semibold text-ink md:text-4xl lg:text-5xl">{title}</h1>
          {description ? <p className="text-lg text-ink-muted md:text-xl">{description}</p> : null}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            {ctaLabel && ctaHref ? <CTA href={ctaHref} label={ctaLabel} /> : null}
            {ctaSecondaryLabel && ctaSecondaryHref ? (
              <CTA href={ctaSecondaryHref} label={ctaSecondaryLabel} variant="ghost" />
            ) : null}
          </div>
        </div>
        {imageSrc ? (
          <div className="relative w-full">
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-accent/15 via-white to-ink/10 blur-xl" aria-hidden />
            <Image
              src={imageSrc}
              alt={imageAlt || ""}
              width={1200}
              height={800}
              className="relative h-auto w-full rounded-2xl border border-ink/10 bg-white/80 object-cover shadow-lg"
              priority={!compact}
              aria-hidden={!imageAlt}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
}
