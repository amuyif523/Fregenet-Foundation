import type { GovernanceDoc } from "@/lib/site";

type Props = {
  docs: GovernanceDoc[];
};

export default function GovernanceDocs({ docs }: Props) {
  if (!docs.length) return null;
  return (
    <div className="mx-auto max-w-6xl px-6 pb-10">
      <div className="rounded-2xl border border-ink/5 bg-white/90 p-6 shadow-sm">
        <div className="text-sm font-semibold uppercase tracking-[0.08em] text-accent mb-4">Governance materials</div>
        <div className="grid gap-4 md:grid-cols-3">
          {docs.map((doc) => (
            <a
              key={doc.title}
              href={doc.href}
              className="rounded-xl border border-ink/5 bg-ink/3 p-4 text-ink hover:border-accent/50 focus-ring"
            >
              <div className="text-base font-semibold">{doc.title}</div>
              {doc.description ? <div className="mt-2 text-sm text-ink-muted">{doc.description}</div> : null}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
