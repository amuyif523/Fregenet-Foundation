type Entry = {
  year: string;
  label: string;
  detail?: string;
};

type Props = {
  entries: Entry[];
};

export default function Timeline({ entries }: Props) {
  if (!entries.length) return null;
  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <div className="rounded-2xl border border-ink/5 bg-white/85 p-6 shadow-sm">
        <div className="text-sm font-semibold uppercase tracking-[0.08em] text-accent mb-4">Milestones</div>
        <ol className="relative space-y-6 border-l border-ink/10 pl-6">
          {entries.map((entry) => (
            <li key={entry.year + entry.label} className="relative">
              <span className="absolute -left-[11px] mt-1 h-3 w-3 rounded-full bg-accent" aria-hidden />
              <div className="text-sm font-semibold uppercase tracking-[0.08em] text-ink">{entry.year}</div>
              <div className="text-base font-semibold text-ink mt-1">{entry.label}</div>
              {entry.detail ? <div className="text-sm text-ink-muted mt-1">{entry.detail}</div> : null}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
