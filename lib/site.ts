import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import { cache } from "react";

export type NavItem = {
  label: string;
  href: string;
};

export type SiteConfig = {
  siteName: string;
  tagline?: string;
  contactEmail?: string;
  nav: NavItem[];
  footer: string[];
  trustHighlights: string[];
  partners: Partner[];
};

const siteConfigPath = path.join(process.cwd(), "content", "site.md");

function assertString(value: unknown, field: string, required = true): string | undefined {
  if (value === undefined || value === null) {
    if (required) {
      throw new Error(`Site config missing required field: ${field}`);
    }
    return undefined;
  }
  if (typeof value !== "string") {
    throw new Error(`Site config field "${field}" must be a string`);
  }
  return value;
}

function assertStringArray(value: unknown, field: string): string[] {
  if (!Array.isArray(value)) {
    throw new Error(`Site config field "${field}" must be an array`);
  }
  return value.map((item, index) => {
    if (typeof item !== "string") {
      throw new Error(`Site config "${field}" item at index ${index} must be a string`);
    }
    return item;
  });
}

function parseNav(value: unknown): NavItem[] {
  if (!Array.isArray(value)) {
    throw new Error('Site config field "nav" must be an array');
  }
  return value.map((item, index) => {
    if (!item || typeof item !== "object") {
      throw new Error(`Site config nav entry at index ${index} must be an object`);
    }
    const label = assertString((item as any).label, `nav[${index}].label`);
    const href = assertString((item as any).href, `nav[${index}].href`);
    return { label: label as string, href: href as string };
  });
}

export type Partner = {
  name: string;
  logo: string;
  alt?: string;
  href?: string;
};

function parsePartners(value: unknown): Partner[] {
  if (!value) return [];
  if (!Array.isArray(value)) {
    throw new Error('Site config field "partners" must be an array');
  }
  return value.map((item, index) => {
    if (!item || typeof item !== "object") {
      throw new Error(`Site config partners entry at index ${index} must be an object`);
    }
    const name = assertString((item as any).name, `partners[${index}].name`);
    const logo = assertString((item as any).logo, `partners[${index}].logo`);
    const alt = assertString((item as any).alt, `partners[${index}].alt`, false);
    const href = assertString((item as any).href, `partners[${index}].href`, false);
    return { name: name as string, logo: logo as string, alt, href };
  });
}

export async function getSiteConfig(): Promise<SiteConfig> {
  const file = await fs.readFile(siteConfigPath, "utf-8");
  const { data } = matter(file);

  const siteName = assertString(data.siteName, "siteName") as string;
  const tagline = assertString(data.tagline, "tagline", false);
  const contactEmail = assertString(data.contactEmail, "contactEmail", false);
  const nav = parseNav(data.nav);
  const footer = assertStringArray(data.footer, "footer");
  const trustHighlights = assertStringArray(data.trustHighlights, "trustHighlights");
  const partners = parsePartners(data.partners);

  return {
    siteName,
    tagline,
    contactEmail,
    nav,
    footer,
    trustHighlights,
    partners
  };
}

export const getCachedSiteConfig = cache(getSiteConfig);
