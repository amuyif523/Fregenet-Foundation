import Link from "next/link";
import Hero from "@/components/Hero";
import Section from "@/components/Section";

export default function NotFound() {
  return (
    <>
      <Hero title="Page not found" description="The page you are looking for does not exist." ctaLabel="Return home" ctaHref="/" />
      <Section>
        <p className="text-ink-muted">If you followed a link, it may be outdated. Please use the navigation to find the right page.</p>
        <Link
          href="/contact"
          className="mt-4 inline-flex rounded-full bg-ink px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-ink/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          Contact the foundation
        </Link>
      </Section>
    </>
  );
}
