"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import type { SiteConfig } from "@/lib/site";

type Props = {
  site: SiteConfig;
};

export default function Header({ site }: Props) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const ctaLabel = site.nav.find((n) => n.href === "/get-involved")?.label ?? "Get Involved";

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener("keydown", onKeyDown);
    }
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const container = menuRef.current;
    if (!container) return;
    const focusable = container.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    first?.focus();

    function handleTab(event: KeyboardEvent) {
      if (event.key !== "Tab" || focusable.length === 0) return;
      if (event.shiftKey) {
        if (document.activeElement === first) {
          event.preventDefault();
          (last || first).focus();
        }
      } else if (document.activeElement === last) {
        event.preventDefault();
        (first || last).focus();
      }
    }

    document.addEventListener("keydown", handleTab);
    return () => document.removeEventListener("keydown", handleTab);
  }, [open]);

  return (
    <header className="border-b border-ink/5 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-lg font-semibold tracking-tight text-ink focus-ring">
          {site.siteName}
        </Link>
        <nav id="site-nav" aria-label="Primary" className="hidden items-center gap-6 text-sm font-semibold text-ink-muted md:flex">
          {site.nav.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-ink focus-ring">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-full bg-ink px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-ink/90 focus-ring md:hidden"
            onClick={() => setOpen((prev) => !prev)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          >
            Menu
          </button>
          <Link
            href="/get-involved"
            className="hidden rounded-full bg-ink px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-ink/90 focus-ring md:inline-flex"
          >
            {ctaLabel}
          </Link>
        </div>
      </div>
      {open ? (
        <div id="mobile-menu" ref={menuRef} className="border-t border-ink/5 bg-white px-6 py-4 md:hidden">
          <div className="flex flex-col gap-3 text-sm font-semibold text-ink">
            {site.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-lg px-2 py-2 hover:bg-ink/5 focus-ring"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/get-involved"
              className="rounded-full bg-ink px-4 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-ink/90 focus-ring"
              onClick={() => setOpen(false)}
            >
              {ctaLabel}
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  );
}
