import { ReactNode } from "react";

type SectionProps = {
  heading?: string;
  kicker?: string;
  children: ReactNode;
};

export default function Section({ heading, kicker, children }: SectionProps) {
  return (
    <section className="mx-auto max-w-6xl px-6 py-12 md:py-16">
      <div className="card p-8 md:p-10">
        {kicker ? (
          <div className="mb-2 text-sm font-semibold uppercase tracking-[0.08em] text-accent">
            {kicker}
          </div>
        ) : null}
        {heading ? <h1 className="mb-6 text-3xl font-semibold text-ink md:text-4xl">{heading}</h1> : null}
        <div className="prose max-w-none">{children}</div>
      </div>
    </section>
  );
}
