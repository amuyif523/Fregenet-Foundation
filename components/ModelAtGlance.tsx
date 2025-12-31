"use client";

import Image from "next/image";

type Pillar = {
  title: string;
  detail: string;
};

type Props = {
  graphicSrc?: string;
  graphicAlt?: string;
  pillars?: Pillar[];
};

export default function ModelAtGlance({ graphicSrc, graphicAlt, pillars = [] }: Props) {
  if (!graphicSrc && !pillars.length) return null;

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <div className="grid gap-8 md:grid-cols-2">
        {graphicSrc ? (
          <div className="relative">
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-accent/15 via-white to-ink/10 blur-xl" aria-hidden />
            <Image
              src={graphicSrc}
              alt={graphicAlt || ""}
              width={1200}
              height={800}
              className="relative h-auto w-full rounded-2xl border border-ink/10 bg-white/80 object-cover shadow-lg"
            />
          </div>
        ) : null}
        {pillars.length ? (
          <div className="space-y-4 rounded-2xl border border-ink/5 bg-white/90 p-6 shadow-sm">
            <div className="text-sm font-semibold uppercase tracking-[0.08em] text-accent">Model at a glance</div>
            <ul className="space-y-3 text-ink-muted">
              {pillars.map((pillar) => (
                <li key={pillar.title} className="rounded-xl border border-ink/5 bg-ink/3 p-4">
                  <div className="text-base font-semibold text-ink">{pillar.title}</div>
                  <div className="text-sm text-ink-muted mt-1">{pillar.detail}</div>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </div>
  );
}
