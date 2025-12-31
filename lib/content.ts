import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import { cache } from "react";

export type PageContent = {
  slug: string;
  title: string;
  description: string;
  html: string;
  kicker?: string;
  ctaLabel?: string;
  ctaHref?: string;
  canonical?: string;
  navLabel?: string;
};

const contentDir = path.join(process.cwd(), "content");

function assertString(field: unknown, name: string, required = true): string | undefined {
  if (field === undefined || field === null) {
    if (required) {
      throw new Error(`Content frontmatter missing required field: ${name}`);
    }
    return undefined;
  }
  if (typeof field !== "string") {
    throw new Error(`Content frontmatter field "${name}" must be a string`);
  }
  return field;
}

export async function loadContent(slug: string): Promise<PageContent> {
  const filePath = path.join(contentDir, `${slug}.md`);
  const file = await fs.readFile(filePath, "utf-8");
  const { content, data } = matter(file);

  const processed = await remark().use(html).process(content);
  const htmlContent = processed.toString();

  const title = assertString(data.title, "title");
  const description = assertString(data.description, "description");
  const ctaLabel = assertString(data.ctaLabel, "ctaLabel", false);
  const ctaHref = assertString(data.ctaHref, "ctaHref", false);
  const kicker = assertString(data.kicker, "kicker", false);
  const canonical = assertString(data.canonical, "canonical", false);
  const navLabel = assertString(data.navLabel, "navLabel", false);

  if (ctaHref && !ctaLabel) {
    throw new Error(`Content frontmatter for "${slug}" has ctaHref without ctaLabel`);
  }
  if (ctaLabel && !ctaHref) {
    throw new Error(`Content frontmatter for "${slug}" has ctaLabel without ctaHref`);
  }

  return {
    slug,
    title: title || "Fregenet Foundation",
    description: description || "",
    kicker,
    ctaLabel: ctaLabel || undefined,
    ctaHref: ctaHref || undefined,
    canonical: canonical || undefined,
    navLabel: navLabel || undefined,
    html: htmlContent
  };
}

export const getContent = cache(loadContent);
