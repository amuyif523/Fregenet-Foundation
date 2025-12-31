import { getSiteUrl } from "@/lib/metadata";

const routes = [
  "/",
  "/about",
  "/model",
  "/programs",
  "/impact",
  "/capital-campaign",
  "/governance",
  "/get-involved",
  "/contact"
];

export default function sitemap() {
  const siteUrl = getSiteUrl();
  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date()
  }));
}
