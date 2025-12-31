import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

export type PageContent = {
  slug: string;
  title: string;
  description: string;
  html: string;
  ctaLabel?: string;
  ctaHref?: string;
};

const contentDir = path.join(process.cwd(), "content");

export async function loadContent(slug: string): Promise<PageContent> {
  const filePath = path.join(contentDir, `${slug}.md`);
  const file = await fs.readFile(filePath, "utf-8");
  const { content, data } = matter(file);

  const processed = await remark().use(html).process(content);
  const htmlContent = processed.toString();

  return {
    slug,
    title: data.title || "Fregenet Foundation",
    description: data.description || "",
    ctaLabel: data.ctaLabel,
    ctaHref: data.ctaHref,
    html: htmlContent
  };
}
