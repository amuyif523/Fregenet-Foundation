import type { Metadata } from "next";
import { Source_Sans_3, Merriweather } from "next/font/google";
import "./globals.css";
import Layout from "@/components/Layout";
import { getSiteConfig } from "@/lib/site";
import { getSiteUrl } from "@/lib/metadata";

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
    }
  };
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const site = await getSiteConfig();

  return (
    <html lang="en">
      <body className={`${sans.variable} ${serif.variable} font-sans`}>
        <Layout site={site}>{children}</Layout>
      </body>
    </html>
  );
}
