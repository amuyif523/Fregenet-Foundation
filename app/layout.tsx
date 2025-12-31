import type { Metadata } from "next";
import { Source_Sans_3, Merriweather } from "next/font/google";
import "./globals.css";
import Layout from "@/components/Layout";
import { getSiteConfig } from "@/lib/site";
import { getSiteUrl } from "@/lib/metadata";
import Script from "next/script";

const sans = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap"
});

const serif = Merriweather({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["300", "400", "700"],
  display: "swap"
});

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSiteConfig();
  const siteUrl = getSiteUrl();
  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: site.siteName,
      template: `%s | ${site.siteName}`
    },
    description: site.tagline,
    openGraph: {
      title: site.siteName,
      description: site.tagline,
      siteName: site.siteName,
      url: siteUrl,
      type: "website"
    },
    twitter: {
      card: "summary_large_image",
      title: site.siteName,
      description: site.tagline
    },
    manifest: "/site.webmanifest",
    icons: {
      icon: "/favicon.svg",
      shortcut: "/favicon.svg",
      apple: "/favicon.svg"
    }
  };
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const site = await getSiteConfig();
  const siteUrl = getSiteUrl();

  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "NonprofitOrganization",
    name: site.siteName,
    url: siteUrl,
    description: site.tagline,
    foundingDate: "2004",
    areaServed: "Ethiopia"
  };

  const campusesJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Fregenet Foundation Schools",
    itemListElement: [
      {
        "@type": "School",
        name: "Fregenet Kidan Lehitsanat - Addis Ababa (Kirkos Sub-City)",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Addis Ababa",
          addressCountry: "Ethiopia"
        }
      },
      {
        "@type": "School",
        name: "Fregenet Dembi Elementary - Bishoftu",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Bishoftu",
          addressCountry: "Ethiopia"
        }
      }
    ]
  };

  return (
    <html lang="en">
      <body className={`${sans.variable} ${serif.variable} font-sans`}>
        <Layout site={site}>{children}</Layout>
        <Script
          id="ld-organization"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify([organizationJsonLd, campusesJsonLd]) }}
        />
      </body>
    </html>
  );
}
