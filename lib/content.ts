import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import { cache } from "react";
import { renderMarkdown } from "./markdown";

export type PageContent = {
  slug: string;
  title: string;
  description: string;
  html: string;
  kicker?: string;
  ctaLabel?: string;
  ctaHref?: string;
  ctaSecondaryLabel?: string;
  ctaSecondaryHref?: string;
  canonical?: string;
  navLabel?: string;
  heroImage?: string;
  heroImageAlt?: string;
  heroImageCaption?: string;
  heroImageCredit?: string;
  images?: {
    src: string;
    alt: string;
    caption?: string;
    credit?: string;
  }[];
  metrics?: {
    label: string;
    value: string;
    detail?: string;
  }[];
  keywords?: string[];
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

  const htmlContent = await renderMarkdown(content);

  const title = assertString(data.title, "title");
  const description = assertString(data.description, "description");
  const ctaLabel = assertString(data.ctaLabel, "ctaLabel", false);
  const ctaHref = assertString(data.ctaHref, "ctaHref", false);
  const ctaSecondaryLabel = assertString(data.ctaSecondaryLabel, "ctaSecondaryLabel", false);
  const ctaSecondaryHref = assertString(data.ctaSecondaryHref, "ctaSecondaryHref", false);
  const kicker = assertString(data.kicker, "kicker", false);
  const canonical = assertString(data.canonical, "canonical", false);
  const navLabel = assertString(data.navLabel, "navLabel", false);
  const heroImage = assertString(data.heroImage, "heroImage", false);
  const heroImageAlt = assertString(data.heroImageAlt, "heroImageAlt", false);
  const heroImageCaption = assertString(data.heroImageCaption, "heroImageCaption", false);
  const heroImageCredit = assertString(data.heroImageCredit, "heroImageCredit", false);
  const images = Array.isArray(data.images)
    ? data.images
        .map((item: any, index: number) => {
          if (!item || typeof item !== "object") {
            throw new Error(`Content frontmatter images entry at index ${index} must be an object`);
          }
          const src = assertString(item.src, `images[${index}].src`);
          const alt = assertString(item.alt, `images[${index}].alt`);
          const caption = assertString(item.caption, `images[${index}].caption`, false);
          const credit = assertString(item.credit, `images[${index}].credit`, false);
          return { src: src as string, alt: alt as string, caption: caption || undefined, credit: credit || undefined };
        })
        .filter(Boolean)
    : undefined;
  const metrics = Array.isArray(data.metrics)
    ? data.metrics
        .map((item: any, index: number) => {
          if (!item || typeof item !== "object") {
            throw new Error(`Content frontmatter metrics entry at index ${index} must be an object`);
          }
          const label = assertString(item.label, `metrics[${index}].label`);
          const value = assertString(item.value, `metrics[${index}].value`);
          const detail = assertString(item.detail, `metrics[${index}].detail`, false);
          return { label: label as string, value: value as string, detail: detail || undefined };
        })
        .filter(Boolean)
    : undefined;
  const keywords = Array.isArray(data.keywords)
    ? data.keywords.map((k: unknown) => assertString(k, "keywords", true) as string).filter(Boolean)
    : undefined;

  if (ctaHref && !ctaLabel) {
    throw new Error(`Content frontmatter for "${slug}" has ctaHref without ctaLabel`);
  }
  if (ctaLabel && !ctaHref) {
    throw new Error(`Content frontmatter for "${slug}" has ctaLabel without ctaHref`);
  }
  if (ctaSecondaryHref && !ctaSecondaryLabel) {
    throw new Error(`Content frontmatter for "${slug}" has ctaSecondaryHref without ctaSecondaryLabel`);
  }
  if (ctaSecondaryLabel && !ctaSecondaryHref) {
    throw new Error(`Content frontmatter for "${slug}" has ctaSecondaryLabel without ctaSecondaryHref`);
  }

  return {
    slug,
    title: title || "Fregenet Foundation",
    description: description || "",
    kicker,
    ctaLabel: ctaLabel || undefined,
    ctaHref: ctaHref || undefined,
    ctaSecondaryLabel: ctaSecondaryLabel || undefined,
    ctaSecondaryHref: ctaSecondaryHref || undefined,
    canonical: canonical || undefined,
    navLabel: navLabel || undefined,
    heroImage: heroImage || undefined,
    heroImageAlt: heroImageAlt || undefined,
    heroImageCaption: heroImageCaption || undefined,
    heroImageCredit: heroImageCredit || undefined,
    images,
    metrics,
    keywords,
    html: htmlContent
  };
}

export const getContent = cache(loadContent);
