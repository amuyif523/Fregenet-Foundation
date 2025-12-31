type Props = {
  title?: string;
  highlights: string[];
};

export default function TrustPanel({ title = "Governance commitments", highlights }: Props) {
  if (!highlights.length) return null;

  return (
    <div className="mt-8 rounded-xl border border-ink/5 bg-white/80 p-6 shadow-sm">
      <div className="text-sm font-semibold uppercase tracking-[0.08em] text-accent">{title}</div>
      <ul className="mt-4 space-y-2 text-ink-muted">
        {highlights.map((item) => (
          <li key={item} className="leading-relaxed">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
