import type { Metadata } from "next";
import { Source_Sans_3, Merriweather } from "next/font/google";
import "./globals.css";
import Layout from "@/components/Layout";

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

export const metadata: Metadata = {
  title: "Fregenet Foundation | Whole Child Education in Ethiopia",
  description:
    "Institutional home of the Fregenet Foundation, serving Ethiopian students since 2004 through whole-child education and trusted governance."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${sans.variable} ${serif.variable} font-sans`}>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
