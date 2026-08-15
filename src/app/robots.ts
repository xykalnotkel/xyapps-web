import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/verify", "/me", "/library"],
    },
    sitemap: "https://xyapps.xystudio.my.id/sitemap.xml",
  };
}
