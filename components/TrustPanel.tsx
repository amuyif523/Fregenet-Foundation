type Props = {
  title?: string;
  highlights: string[];
};

export default function TrustPanel({ title = "Governance commitments", highlights }: Props) {
  if (!highlights.length) return null;

  return (
    <div className="mt-10 rounded-xl border border-ink/10 bg-gradient-to-br from-white via-white/80 to-accent/5 p-6 shadow-md">
      <div className="text-sm font-semibold uppercase tracking-[0.08em] text-accent">{title}</div>
      <ul className="mt-4 space-y-3 text-ink-muted">
        {highlights.map((item) => (
          <li key={item} className="flex items-start gap-3 leading-relaxed">
            <span className="mt-1 h-2 w-2 rounded-full bg-accent" aria-hidden="true" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
