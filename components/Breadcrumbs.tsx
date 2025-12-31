import Link from "next/link";
import { usePathname } from "next/navigation";

type Crumb = {
  href: string;
  label: string;
};

const labelMap: Record<string, string> = {
  "": "Home",
  about: "About",
  model: "Model",
  programs: "Programs",
  impact: "Impact",
  "capital-campaign": "Capital Campaign",
  governance: "Governance",
  "get-involved": "Get Involved",
  contact: "Contact"
};

export default function Breadcrumbs() {
  const pathname = usePathname();
  if (!pathname) return null;
  const parts = pathname.split("/").filter(Boolean);
  const crumbs: Crumb[] = [
    { href: "/", label: "Home" },
    ...parts.map((part, index) => ({
      href: `/${parts.slice(0, index + 1).join("/")}`,
      label: labelMap[part] || part
    }))
  ];

  if (crumbs.length <= 1) return null;

  return (
    <nav aria-label="Breadcrumb" className="border-b border-ink/5 bg-white/80">
      <ol className="mx-auto flex max-w-6xl flex-wrap items-center gap-2 px-6 py-2 text-sm text-ink-muted">
        {crumbs.map((crumb, index) => {
          const isLast = index === crumbs.length - 1;
          return (
            <li key={crumb.href} className="flex items-center gap-2">
              {!isLast ? (
                <Link href={crumb.href} className="hover:text-ink focus-ring">
                  {crumb.label}
                </Link>
              ) : (
                <span aria-current="page" className="text-ink">
                  {crumb.label}
                </span>
              )}
              {!isLast ? <span className="text-ink/30">/</span> : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
