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
  changelog: { version: string; notes: string }[];
  features: string[];
};

export const APPS: AppItem[] = [
  {
    slug: "northroom",
    title: "Northroom",
    tagline: "Pemutar lokal. Tanpa iklan, tanpa akun.",
    description:
      "Contoh app Android di XyApps. Installer resmi hanya lewat gerbang dl.xyapps.my.id. Source berlisensi XySANC-1.0: boleh dipakai dan dipelajari, dilarang dijual ulang.",
    platform: "Android",
    category: "Musik",
    stack: ["Kotlin"],
    sourceKind: "xysanc",
    version: "1.4.2",
    size: "28 MB",
    developer: "XyStudio",
    initials: "N7",
    accent: "#7C3AED",
    changelog: [
      { version: "1.4.2", notes: "Perbaikan unduhan tiket & mode gelap." },
      { version: "1.4.0", notes: "Antrian lagu, sleep timer." },
    ],
    features: ["Offline library", "Tidak ada iklan", "XySANC-1.0"],
  },
  {
    slug: "vaultline",
    title: "Vaultline",
    tagline: "Source private. Tiket unduh 10 menit.",
    description:
      "Contoh produk berbayar. Repo tidak public. Tombol beli belum hidup — sengaja, biar UX-nya terasa terkunci dengan jujur.",
    platform: "Desktop",
    category: "Tools",
    stack: ["Rust", "Tauri"],
    sourceKind: "paid",
    version: "0.9.1",
    size: "14 MB",
    developer: "XyStudio",
    initials: "VL",
    accent: "#A78BFA",
    changelog: [{ version: "0.9.1", notes: "Build internal. Belum dijual." }],
    features: ["Repo private", "Signed ticket", "Lisensi proprietary"],
  },
  {
    slug: "kilometer",
    title: "Kilometer",
    tagline: "Web tool. Satu tombol: buka demo.",
    description:
      "Tidak ada file unduhan. Tidak ada source di listing ini. UX-nya harus terasa ringan — jangan paksa user lewat alur install.",
    platform: "Web",
    category: "Tools",
    stack: ["TypeScript"],
    sourceKind: "none",
    version: "2.0.0",
    size: "Web",
    developer: "XyStudio",
    initials: "KM",
    accent: "#6EE7B7",
    changelog: [{ version: "2.0.0", notes: "Tulis ulang UI." }],
    features: ["Tanpa akun", "Langsung di browser"],
  },
  {
    slug: "field-notes",
    title: "Field Notes",
    tagline: "Catatan cepat, sinkron belakangan.",
    description:
      "Listing dummy untuk ngetes grid, filter, dan halaman kosong. Source XySANC.",
    platform: "Android",
    category: "Produktivitas",
    stack: ["Kotlin", "SQLDelight"],
    sourceKind: "xysanc",
    version: "0.3.0",
    size: "9 MB",
    developer: "XyStudio",
    initials: "FN",
    accent: "#818CF8",
    changelog: [{ version: "0.3.0", notes: "Mock data saja." }],
    features: ["Markdown", "Export teks"],
  },
  {
    slug: "lantern",
    title: "Lantern",
    tagline: "Dashboard status mesin. Demo only.",
    description:
      "Untuk ngetes kartu Demo only di samping yang berbayar dan yang XySANC.",
    platform: "Web",
    category: "Developer",
    stack: ["React"],
    sourceKind: "none",
    version: "0.1.0",
    size: "Web",
    developer: "XyStudio",
    initials: "LN",
    accent: "#F472B6",
    changelog: [{ version: "0.1.0", notes: "Prototype." }],
    features: ["Status chip", "Tanpa login"],
  },
];

export function getApp(slug: string) {
  return APPS.find((a) => a.slug === slug);
}

export function sourceLabel(kind: SourceKind) {
  if (kind === "xysanc")
    return { text: "XySANC · jangan jual", tone: "free" as const };
  if (kind === "paid")
    return { text: "Source berbayar", tone: "paid" as const };
  return { text: "Demo only", tone: "mute" as const };
}

export function toPublicApp(app: AppItem) {
  return {
    slug: app.slug,
    title: app.title,
    tagline: app.tagline,
    description: app.description,
    platform: app.platform,
    category: app.category,
    stack: app.stack,
    sourceKind: app.sourceKind,
    version: app.version,
    size: app.size,
    developer: app.developer,
    initials: app.initials,
    accent: app.accent,
    changelog: app.changelog,
    features: app.features,
  };
}
