import type { MetadataRoute } from "next";
import { APPS, DEVELOPERS } from "@/lib/data";

const BASE = "https://xyapps.xystudio.my.id";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    "",
    "/apps",
    "/games",
    "/search",
    "/age-rating",
    "/developer",
    "/help",
    "/legal",
    "/trust",
    "/login",
    "/console",
  ].map((p) => ({
    url: `${BASE}${p}`,
    lastModified: new Date("2026-08-15"),
    changeFrequency: "weekly",
    priority: p === "" ? 1 : 0.7,
  }));

  const appPages: MetadataRoute.Sitemap = APPS.map((a) => ({
    url: `${BASE}/apps/${a.slug}`,
    lastModified: new Date(a.sortDate),
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  const devPages: MetadataRoute.Sitemap = DEVELOPERS.map((d) => ({
    url: `${BASE}/profile/dev/${d.id}`,
    lastModified: new Date("2026-08-15"),
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  return [...staticPages, ...appPages, ...devPages];
}
