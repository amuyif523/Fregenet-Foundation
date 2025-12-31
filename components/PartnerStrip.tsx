import Image from "next/image";
import type { Partner } from "@/lib/site";

type Props = {
  partners: Partner[];
};

export default function PartnerStrip({ partners }: Props) {
  if (!partners.length) return null;
  return (
    <div className="mt-8 grid grid-cols-2 gap-6 rounded-xl border border-ink/5 bg-white/80 p-6 shadow-sm md:grid-cols-4">
      {partners.map((partner) => (
        <a
          key={partner.name}
          href={partner.href || "#"}
          className="flex flex-col items-center gap-2 text-center text-sm text-ink-muted focus-ring"
          aria-label={partner.name}
        >
          <div className="flex h-16 w-full items-center justify-center rounded-lg border border-ink/5 bg-gradient-to-r from-ink/5 to-accent/10">
            <Image src={partner.logo} alt={partner.alt || partner.name} width={160} height={64} className="h-auto w-32 object-contain" />
          </div>
          <span className="text-ink">{partner.name}</span>
        </a>
      ))}
    </div>
  );
}
