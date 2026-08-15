import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "XyApps",
    short_name: "XyApps",
    description:
      "Toko aplikasi resmi XySpace. Unduh dengan aman lewat gerbang resmi.",
    start_url: "/",
    display: "standalone",
    background_color: "#050506",
    theme_color: "#7c3aed",
    icons: [
      {
        src: "/gen/icons/northroom.webp",
        sizes: "192x192",
        type: "image/webp",
        purpose: "any",
      },
    ],
  };
}
