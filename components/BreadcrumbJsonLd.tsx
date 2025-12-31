import Script from "next/script";
import { getSiteUrl } from "@/lib/metadata";

type Item = {
  name: string;
  url: string;
};

type Props = {
  items: Item[];
};

export default function BreadcrumbJsonLd({ items }: Props) {
  if (!items.length) return null;
  const siteUrl = getSiteUrl();
  const normalized = items.map((item) => ({
    ...item,
    url: item.url.startsWith("http") ? item.url : new URL(item.url, siteUrl).toString()
  }));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: normalized.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  };

  return <Script id="breadcrumb-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />;
}
