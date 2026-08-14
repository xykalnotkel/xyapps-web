export type SourceKind = "xysanc" | "paid" | "none";
export type Platform = "Android" | "Web" | "Desktop";

export type AppItem = {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  platform: Platform;
  category: string;
  stack: string[];
  sourceKind: SourceKind;
  version: string;
  size: string;
  developer: string;
  initials: string;
  accent: string;
  accent2: string;
  age: string;
  updated: string;
  changelog: { version: string; notes: string }[];
  features: string[];
};

export const APPS: AppItem[] = [
  {
    slug: "northroom",
    title: "Northroom",
    tagline: "Pemutar lokal. Tanpa iklan, tanpa akun.",
    description:
      "Pemutar musik lokal. Installer resmi hanya lewat gerbang dl.xyapps.my.id. Source XySANC-1.0: boleh dipakai dan dipelajari, dilarang dijual ulang.",
    platform: "Android",
    category: "Musik",
    stack: ["Kotlin"],
    sourceKind: "xysanc",
    version: "1.4.2",
    size: "28 MB",
    developer: "XyStudio",
    initials: "N7",
    accent: "#7C3AED",
    accent2: "#1E1B4B",
    age: "3+",
    updated: "12 Agu 2026",
    changelog: [
      { version: "1.4.2", notes: "Perbaikan unduhan tiket dan mode gelap." },
      { version: "1.4.0", notes: "Antrian lagu, sleep timer." },
    ],
    features: ["Offline library", "Tidak ada iklan", "XySANC-1.0"],
  },
  {
    slug: "vaultline",
    title: "Vaultline",
    tagline: "Source private. Tiket unduh 10 menit.",
    description:
      "Produk berbayar. Repo tidak public. Tombol beli belum hidup — sengaja, biar UX-nya terasa terkunci dengan jujur.",
    platform: "Desktop",
    category: "Tools",
    stack: ["Rust", "Tauri"],
    sourceKind: "paid",
    version: "0.9.1",
    size: "14 MB",
    developer: "XyStudio",
    initials: "VL",
    accent: "#A78BFA",
    accent2: "#2E1065",
    age: "12+",
    updated: "2 Agu 2026",
    changelog: [{ version: "0.9.1", notes: "Build internal. Belum dijual." }],
    features: ["Repo private", "Signed ticket", "Lisensi proprietary"],
  },
  {
    slug: "kilometer",
    title: "Kilometer",
    tagline: "Web tool. Satu tombol: buka demo.",
    description:
      "Tidak ada file unduhan. Tidak ada source di listing ini. UX-nya harus terasa ringan.",
    platform: "Web",
    category: "Tools",
    stack: ["TypeScript"],
    sourceKind: "none",
    version: "2.0.0",
    size: "Web",
    developer: "XyStudio",
    initials: "KM",
    accent: "#6EE7B7",
    accent2: "#042F2E",
    age: "3+",
    updated: "28 Jul 2026",
    changelog: [{ version: "2.0.0", notes: "Tulis ulang UI." }],
    features: ["Tanpa akun", "Langsung di browser"],
  },
  {
    slug: "field-notes",
    title: "Field Notes",
    tagline: "Catatan cepat, sinkron belakangan.",
    description:
      "Catatan markdown ringan. Source XySANC. Listing dummy untuk ngetes list dan filter.",
    platform: "Android",
    category: "Produktivitas",
    stack: ["Kotlin", "SQLDelight"],
    sourceKind: "xysanc",
    version: "0.3.0",
    size: "9 MB",
    developer: "XyStudio",
    initials: "FN",
    accent: "#818CF8",
    accent2: "#1E1B4B",
    age: "3+",
    updated: "1 Agu 2026",
    changelog: [{ version: "0.3.0", notes: "Mock data saja." }],
    features: ["Markdown", "Export teks"],
  },
  {
    slug: "lantern",
    title: "Lantern",
    tagline: "Dashboard status mesin. Demo only.",
    description:
      "Preview status scan. Demo only, tanpa file unduhan.",
    platform: "Web",
    category: "Developer",
    stack: ["React"],
    sourceKind: "none",
    version: "0.1.0",
    size: "Web",
    developer: "XyStudio",
    initials: "LN",
    accent: "#C084FC",
    accent2: "#3B0764",
    age: "12+",
    updated: "20 Jul 2026",
    changelog: [{ version: "0.1.0", notes: "Prototype." }],
    features: ["Status chip", "Tanpa login"],
  },
];

export function getApp(slug: string) {
  return APPS.find((a) => a.slug === slug);
}

export function sourceLabel(kind: SourceKind) {
  if (kind === "xysanc")
    return { text: "XySANC", tone: "free" as const };
  if (kind === "paid") return { text: "Berbayar", tone: "paid" as const };
  return { text: "Demo", tone: "mute" as const };
}

export function ctaLabel(kind: SourceKind) {
  if (kind === "xysanc") return "Install";
  if (kind === "paid") return "Terkunci";
  return "Buka";
}

export function toPublicApp(app: AppItem) {
  const {
    slug,
    title,
    tagline,
    description,
    platform,
    category,
    stack,
    sourceKind,
    version,
    size,
    developer,
    initials,
    accent,
    accent2,
    age,
    updated,
    changelog,
    features,
  } = app;
  return {
    slug,
    title,
    tagline,
    description,
    platform,
    category,
    stack,
    sourceKind,
    version,
    size,
    developer,
    initials,
    accent,
    accent2,
    age,
    updated,
    changelog,
    features,
  };
}
