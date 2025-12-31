import Image from "next/image";
import type { Leader } from "@/lib/site";

type Props = {
  leaders: Leader[];
};

export default function LeadershipGrid({ leaders }: Props) {
  if (!leaders.length) return null;
  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <div className="text-sm font-semibold uppercase tracking-[0.08em] text-accent mb-4">Leadership & Board</div>
      <div className="grid gap-6 md:grid-cols-3">
        {leaders.map((leader) => (
          <div key={leader.name} className="rounded-2xl border border-ink/5 bg-white/90 p-5 shadow-sm">
            {leader.photo ? (
              <div className="mb-4 overflow-hidden rounded-xl border border-ink/5 bg-ink/5">
                <Image
                  src={leader.photo}
                  alt={leader.photoAlt || leader.name}
                  width={400}
                  height={300}
                  className="h-48 w-full object-cover"
                />
              </div>
            ) : null}
            <div className="text-base font-semibold text-ink">{leader.name}</div>
            <div className="text-sm font-semibold uppercase tracking-[0.08em] text-accent">{leader.role}</div>
            <p className="mt-2 text-sm text-ink-muted">{leader.bio}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
