type Props = {
  trustHighlights: string[];
};

export default function TrustStrip({ trustHighlights }: Props) {
  if (!trustHighlights.length) return null;

  return (
    <div className="border-t border-ink/5 bg-white/80">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-3 px-6 py-4 text-xs font-semibold uppercase tracking-[0.08em] text-ink-muted">
        {trustHighlights.map((item) => (
          <span key={item} className="rounded-full bg-ink/5 px-3 py-1">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
