"use client";

import { useEffect } from "react";
import Hero from "@/components/Hero";
import Section from "@/components/Section";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <>
      <Hero title="Something went wrong" description="An unexpected error occurred. Please retry or contact the team." />
      <Section>
        <div className="flex flex-col gap-4">
          <button
            type="button"
            onClick={reset}
            className="inline-flex max-w-xs items-center justify-center rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-ink/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            Retry
          </button>
          <p className="text-ink-muted">
            If the issue persists, please reach out through the contact page with a short note on what you were trying to do.
          </p>
        </div>
      </Section>
    </>
  );
}
