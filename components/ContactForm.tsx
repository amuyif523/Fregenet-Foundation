"use client";

import { FormEvent, useState } from "react";

type Status = "idle" | "submitting" | "sent" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setError(null);
    setInfo(null);

    const form = event.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: formData.get("name")?.toString().trim(),
      organization: formData.get("organization")?.toString().trim(),
      email: formData.get("email")?.toString().trim(),
      topic: formData.get("topic")?.toString().trim(),
      message: formData.get("message")?.toString().trim()
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const body = await response.json();
        throw new Error(body.error || "Unable to submit inquiry.");
      }

      const body = await response.json();
      setStatus("sent");
      form.reset();
      if (body?.message) {
        setInfo(body.message);
        setError(null);
      }
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Unable to submit inquiry.");
    }
  }

  return (
    <div className="card mt-10 p-8">
      <form id="contact-form" className="space-y-6" onSubmit={handleSubmit} aria-live="polite">
        <div className="grid gap-6 md:grid-cols-2">
          <label className="block text-sm font-medium text-ink">
            Name
            <input
              name="name"
              type="text"
              required
              className="mt-2 w-full rounded-lg border border-ink/10 bg-white px-3 py-2 text-ink shadow-sm focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30"
            />
          </label>
          <label className="block text-sm font-medium text-ink">
            Organization (optional)
            <input
              name="organization"
              type="text"
              className="mt-2 w-full rounded-lg border border-ink/10 bg-white px-3 py-2 text-ink shadow-sm focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30"
            />
          </label>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <label className="block text-sm font-medium text-ink">
            Email
            <input
              name="email"
              type="email"
              required
              className="mt-2 w-full rounded-lg border border-ink/10 bg-white px-3 py-2 text-ink shadow-sm focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30"
              aria-describedby="contact-hint"
            />
          </label>
          <label className="block text-sm font-medium text-ink">
            Topic (optional)
            <input
              name="topic"
              type="text"
              className="mt-2 w-full rounded-lg border border-ink/10 bg-white px-3 py-2 text-ink shadow-sm focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30"
            />
          </label>
        </div>
        <label className="block text-sm font-medium text-ink">
          Message
          <textarea
            name="message"
            rows={5}
            required
            className="mt-2 w-full rounded-lg border border-ink/10 bg-white px-3 py-2 text-ink shadow-sm focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30"
          />
        </label>
        <p id="contact-hint" className="text-xs text-ink-muted">
          We reply within 3 business days. Your details are used only to respond to your inquiry.
        </p>
        <div className="flex items-center gap-4">
          <button
            type="submit"
            disabled={status === "submitting"}
            className="inline-flex items-center justify-center rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-ink/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:opacity-50"
          >
            {status === "submitting" ? "Sending..." : "Submit inquiry"}
          </button>
          <span className="sr-only" aria-live="assertive">
            {status === "sent" ? "Submitted. We will reply within 3 business days." : null}
            {status === "error" && error ? `Error: ${error}` : null}
          </span>
          {status === "sent" ? (
            <span className="text-sm text-ink" role="status" aria-live="polite">
              {info || "Received. We will reply within 3 business days."}
            </span>
          ) : null}
          {status === "error" && error ? (
            <span className="text-sm text-red-700" role="status" aria-live="assertive">
              {error}
            </span>
          ) : null}
        </div>
      </form>
    </div>
  );
}
