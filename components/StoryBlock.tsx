type Props = {
  title: string;
  left: string;
  right: string;
};

export default function StoryBlock({ title, left, right }: Props) {
  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <div className="rounded-2xl border border-ink/5 bg-gradient-to-r from-ink/3 via-white to-accent/5 p-8 shadow-sm">
        <div className="text-sm font-semibold uppercase tracking-[0.08em] text-accent mb-4">{title}</div>
        <div className="grid gap-6 md:grid-cols-2">
          <p className="text-ink-muted leading-relaxed">{left}</p>
          <p className="text-ink-muted leading-relaxed">{right}</p>
        </div>
      </div>
    </div>
  );
}
