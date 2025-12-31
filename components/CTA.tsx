import Link from "next/link";

type CTAProps = {
  href: string;
  label: string;
  variant?: "primary" | "ghost";
};

export default function CTA({ href, label, variant = "primary" }: CTAProps) {
  const base =
    "inline-flex items-center justify-center rounded-full text-sm font-semibold transition duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";
  const styles =
    variant === "primary"
      ? "bg-ink text-white px-5 py-2.5 shadow-sm hover:bg-ink/90 hover:-translate-y-0.5"
      : "border border-ink/10 bg-white/80 px-5 py-2.5 text-ink hover:border-ink/20 hover:-translate-y-0.5";

  return (
    <Link href={href} className={`${base} ${styles}`}>
      {label}
    </Link>
  );
}
