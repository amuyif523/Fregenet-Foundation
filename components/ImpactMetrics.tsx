type Metric = {
  label: string;
  value: string;
  detail?: string;
};

type Props = {
  metrics: Metric[];
};

export default function ImpactMetrics({ metrics }: Props) {
  if (!metrics.length) return null;
  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <div className="grid gap-4 rounded-2xl border border-ink/5 bg-white/85 p-6 shadow-sm md:grid-cols-4">
        {metrics.map((metric) => (
          <div key={metric.label} className="rounded-xl bg-gradient-to-br from-ink/5 via-white to-accent/10 p-4">
            <div className="text-3xl font-semibold text-ink">{metric.value}</div>
            <div className="text-sm font-semibold uppercase tracking-[0.08em] text-accent mt-1">{metric.label}</div>
            {metric.detail ? <div className="mt-2 text-sm text-ink-muted">{metric.detail}</div> : null}
          </div>
        ))}
      </div>
    </div>
  );
}
