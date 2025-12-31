import type { Metadata } from "next";
import type { PageContent } from "./content";
import type { SiteConfig } from "./site";

export function getSiteUrl(): string {
  const env = process.env.SITE_URL;
  if (env) {
    return env.replace(/\/$/, "");
  }
  return "http://localhost:3000";
}

export function buildPageMetadata(content: PageContent, site: SiteConfig): Metadata {
  const siteUrl = getSiteUrl();
  const canonicalPath =
    content.canonical || (content.slug === "home" ? "/" : `/${content.slug.replace(/^\//, "")}`);
  const canonicalUrl = new URL(canonicalPath, siteUrl);
  const title = `${content.title} | ${site.siteName}`;

  return {
    title,
    description: content.description,
    alternates: {
      canonical: canonicalUrl.toString()
    },
    openGraph: {
      title,
      description: content.description,
      url: canonicalUrl.toString(),
      siteName: site.siteName,
      type: "website",
      locale: "en_US"
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: content.description
    }
  };
}
