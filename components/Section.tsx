import { ReactNode } from "react";

type SectionProps = {
  heading?: string;
  kicker?: string;
  children: ReactNode;
};

export default function Section({ heading, kicker, children }: SectionProps) {
  return (
    <section className="mx-auto max-w-6xl px-6 py-14 md:py-18">
      <div className="card relative overflow-hidden p-8 md:p-12">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(196,125,48,0.08)_0,_transparent_45%),radial-gradient(circle_at_bottom_right,_rgba(15,23,42,0.08)_0,_transparent_45%)]" />
        <div className="relative">
          {kicker ? (
            <div className="mb-2 text-sm font-semibold uppercase tracking-[0.08em] text-accent">
              {kicker}
            </div>
          ) : null}
          {heading ? <h1 className="mb-6 text-3xl font-semibold text-ink md:text-4xl">{heading}</h1> : null}
          <div className="prose max-w-none">{children}</div>
        </div>
      </div>
    </section>
  );
}
