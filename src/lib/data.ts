export type SourceKind = "xysanc" | "paid" | "none";
export type Platform = "Android" | "Web" | "Desktop";

export type Screenshot = {
  src: string;
  label: string;
  /** true = orientasi lanskap (app desktop), false = potret ponsel. */
  landscape?: boolean;
};

export type ReviewItem = {
  id: string;
  user: string;
  hue: number;
  rating: number;
  date: string;
  /** Timestamp untuk sort "Terbaru" (mock, urutan relatif). */
  ts?: number;
  text: string;
  helpful: number;
  reply?: { user: string; date: string; text: string };
};

export type ChangelogEntry = {
  version: string;
  date: string;
  notes: string[];
};

export type AppItem = {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  platform: Platform;
  category: string;
  /** Genre khusus game (Arkade, Balapan, ...). App biasa tidak punya. */
  genre?: string;
  stack: string[];
  sourceKind: SourceKind;
  version: string;
  size: string;
  developer: string;
  initials: string;
  accent: string;
  accent2: string;
  age: string;
  /** Arsitektur/perangkat yang didukung. Dipakai engine kompatibilitas. */
  compat: string[];
  updated: string;
  /** ISO untuk pengurutan. */
  sortDate: string;
  released: string;
  changelog: ChangelogEntry[];
  features: string[];
  icon: string;
  screenshots: Screenshot[];
  /** 0 = belum dinilai. */
  rating: number;
  ratingCount: number;
  installs: string;
  containsAds: boolean;
  /** Ada pembelian dalam app (IAP). Ditampilkan sebagai catatan di detail. */
  inAppPurchases?: boolean;
  /** Jumlah ulasan per bintang, indeks 0 = bintang 5. */
  ratingBreakdown: [number, number, number, number, number];
  reviews: ReviewItem[];
  permissions: string[];
  dataSafety: string[];
  similar: string[];
  moreFromDev: string[];
  website?: string;
  supportEmail: string;
  repoUrl?: string;
};

export const APPS: AppItem[] = [
  {
    slug: "northroom",
    title: "Northroom",
    tagline: "Pemutar lokal. Tanpa iklan, tanpa akun.",
    description:
      "Pemutar musik offline untuk file lokal. Tanpa iklan, tanpa akun, tanpa telemetri. Installer resmi hanya lewat gerbang dl.xystudio.my.id — user tidak pernah menyentuh GitHub. Source XySANC-1.0: boleh dipakai dan dipelajari, dilarang dijual ulang.",
    platform: "Android",
    category: "Musik",
    stack: ["Kotlin"],
    sourceKind: "xysanc",
    version: "1.4.2",
    size: "28 MB",
    developer: "XyStudio",
    initials: "N7",
    compat: ["arm64-v8a", "armeabi-v7a", "x86_64"],
    accent: "#7C3AED",
    accent2: "#1E1B4B",
    age: "7+",
    updated: "12 Agu 2026",
    sortDate: "2026-08-12",
    released: "2 Mar 2026",
    icon: "/gen/icons/northroom.webp",
    screenshots: [
      { src: "/gen/shots/northroom-1.jpg", label: "Library offline" },
      { src: "/gen/shots/northroom-2.jpg", label: "Pemutar" },
      { src: "/gen/shots/northroom-3.jpg", label: "Sleep timer" },
      { src: "/gen/shots/northroom-4.jpg", label: "Equalizer" },
    ],
    changelog: [
      {
        version: "1.4.2",
        date: "12 Agu 2026",
        notes: [
          "Perbaikan alur tiket unduh lewat gerbang resmi",
          "Mode gelap menyeluruh, tanpa titik terang tersisa",
          "Pemindaian library sekitar 30 persen lebih cepat",
        ],
      },
      {
        version: "1.4.0",
        date: "2 Agu 2026",
        notes: ["Antrian lagu", "Sleep timer", "Equalizer 8 pita"],
      },
      {
        version: "1.3.1",
        date: "21 Jul 2026",
        notes: ["Perbaikan crash saat memindai folder besar"],
      },
    ],
    features: ["Offline library", "Tidak ada iklan", "XySANC-1.0"],
    rating: 4.8,
    ratingCount: 1247,
    installs: "100 rb+",
    containsAds: false,
    ratingBreakdown: [1012, 168, 34, 12, 21],
    reviews: [
      {
        id: "nr-1",
        user: "Raka S.",
        hue: 262,
        rating: 5,
        date: "12 Agu 2026",
        ts: 1767686400000,
        text: "Baru nyoba versi 1.4.2. Sleep timer-nya nolong banget buat dengerin musik sebelum tidur. Install lewat tiket agak beda dari toko lain, tapi sekali setup langsung kebiasa.",
        helpful: 34,
        reply: {
          user: "XyStudio",
          date: "13 Agu 2026",
          text: "Makasih Raka. Tiket 10 menit itu gerbang distribusi resmi, bukan bug — file di-stream dari dl.xystudio.my.id supaya URL asal tidak bocor.",
        },
      },
      {
        id: "nr-2",
        user: "Nadia",
        hue: 320,
        rating: 5,
        date: "9 Agu 2026",
        ts: 1767427200000,
        text: "Tanpa iklan beneran. Library offline-nya cepet, ga ada loading nyangkut pas ganti lagu.",
        helpful: 21,
      },
      {
        id: "nr-3",
        user: "Fajar",
        hue: 210,
        rating: 4,
        date: "4 Agu 2026",
        ts: 1766995200000,
        text: "Mantap buat file lokal. Minta fitur queue seret-tarik dan lyric timer di rilis berikutnya.",
        helpful: 12,
        reply: {
          user: "XyStudio",
          date: "5 Agu 2026",
          text: "Antrian seret-tarik sudah masuk roadmap 1.5. Lyric timer kami timbang, karena butuh format lrc yang rapi di folder lokal.",
        },
      },
      {
        id: "nr-4",
        user: "Sinta",
        hue: 24,
        rating: 3,
        date: "28 Jul 2026",
        ts: 1766390400000,
        text: "Di HP lama saya animasi equalizer agak berat. Mode hemat performa tolong dibikin biar tetap mulus.",
        helpful: 8,
      },
    ],
    permissions: [
      "Media audio — memutar file lokal",
      "Penyimpanan — membaca folder musik",
      "Tanpa akses jaringan — app ini offline",
    ],
    dataSafety: [
      "Tidak ada data dikumpulkan",
      "Semua pemrosesan di perangkat",
      "Tidak ada iklan",
      "Tidak ada akun",
    ],
    similar: ["field-notes", "kilometer"],
    moreFromDev: ["field-notes", "kilometer", "lantern"],
    website: "northroom.xystudio.my.id",
    supportEmail: "studio@xystudio.my.id",
  },
  {
    slug: "vaultline",
    title: "Vaultline",
    tagline: "Brankas file terenkripsi. Belum dirilis.",
    description:
      "Produk berbayar XyStudio. Repo tidak public, installer belum dijual. Tombol beli sengaja mati — UX-nya harus jujur: halaman ini menampilkan app yang terkunci, bukan app yang pura-pura bisa diunduh.",
    platform: "Desktop",
    category: "Tools",
    stack: ["Rust", "Tauri"],
    sourceKind: "paid",
    version: "0.9.1",
    size: "14 MB",
    developer: "XyStudio",
    initials: "VL",
    compat: ["Windows x64", "Linux x64", "macOS ARM64"],
    accent: "#A78BFA",
    accent2: "#2E1065",
    age: "16+",
    updated: "2 Agu 2026",
    sortDate: "2026-08-02",
    released: "Belum dirilis",
    icon: "/gen/icons/vaultline.webp",
    screenshots: [
      { src: "/gen/shots/vaultline-1.svg", label: "Dashboard", landscape: true },
      { src: "/gen/shots/vaultline-2.svg", label: "Brankas", landscape: true },
      { src: "/gen/shots/vaultline-3.svg", label: "Terminal", landscape: true },
    ],
    changelog: [
      {
        version: "0.9.1",
        date: "2 Agu 2026",
        notes: ["Build internal", "Tiket unduh bertanda tangan, masa aktif 10 menit"],
      },
    ],
    features: ["Repo private", "Signed ticket", "Lisensi proprietary"],
    rating: 0,
    ratingCount: 0,
    installs: "Belum dirilis",
    containsAds: false,
    inAppPurchases: true,
    ratingBreakdown: [0, 0, 0, 0, 0],
    reviews: [],
    permissions: ["Tidak dipublikasikan — app belum rilis"],
    dataSafety: [
      "Enkripsi AES-256 di sisi klien",
      "Kunci tidak pernah dikirim ke server",
      "Lisensi proprietary",
    ],
    similar: ["lantern", "northroom"],
    moreFromDev: ["northroom", "field-notes", "kilometer"],
    supportEmail: "studio@xystudio.my.id",
  },
  {
    slug: "kilometer",
    title: "Kilometer",
    tagline: "Catat lari. Tanpa akun, langsung jalan.",
    description:
      "Web tool pencatat lari. Tanpa akun, tanpa sinkron cloud — data tersimpan di browser. Tidak ada file unduhan dan tidak ada source di listing ini. UX-nya harus terasa ringan: buka, catat, tutup.",
    platform: "Web",
    category: "Tools",
    stack: ["TypeScript"],
    sourceKind: "none",
    version: "2.0.0",
    size: "Web",
    developer: "XyStudio",
    initials: "KM",
    compat: ["Browser modern"],
    accent: "#6EE7B7",
    accent2: "#042F2E",
    age: "3+",
    updated: "28 Jul 2026",
    sortDate: "2026-07-28",
    released: "14 Mei 2026",
    icon: "/gen/icons/kilometer.webp",
    screenshots: [
      { src: "/gen/shots/kilometer-1.svg", label: "Peta lari" },
      { src: "/gen/shots/kilometer-2.svg", label: "Statistik" },
      { src: "/gen/shots/kilometer-3.svg", label: "Riwayat" },
    ],
    changelog: [
      {
        version: "2.0.0",
        date: "28 Jul 2026",
        notes: ["Tulis ulang UI", "Ringkasan mingguan", "Riwayat lari"],
      },
    ],
    features: ["Tanpa akun", "Langsung di browser", "Data di perangkat"],
    rating: 4.5,
    ratingCount: 89,
    installs: "10 rb+",
    containsAds: false,
    ratingBreakdown: [58, 22, 5, 2, 2],
    reviews: [
      {
        id: "km-1",
        user: "Aldi",
        hue: 160,
        rating: 5,
        date: "11 Agu 2026",
        ts: 1767600000000,
        text: "Ringan, langsung kebuka tanpa akun. Grafik mingguannya bersih dan gampang dibaca.",
        helpful: 9,
      },
      {
        id: "km-2",
        user: "Tia",
        hue: 200,
        rating: 4,
        date: "30 Jul 2026",
        ts: 1766563200000,
        text: "Buat lari santai cukup. Export GPX masih ditunggu biar bisa dipindah ke app lain.",
        helpful: 5,
      },
    ],
    permissions: [
      "Lokasi — hanya saat sesi lari aktif",
      "Sensor langkah — opsional",
    ],
    dataSafety: [
      "Data tersimpan di browser",
      "Tidak ada server",
      "Tidak ada iklan",
    ],
    similar: ["lantern", "field-notes"],
    moreFromDev: ["northroom", "field-notes", "lantern"],
    supportEmail: "studio@xystudio.my.id",
    website: "kilometer.xystudio.my.id",
  },
  {
    slug: "field-notes",
    title: "Field Notes",
    tagline: "Catatan markdown cepat. Sinkron menyusul.",
    description:
      "Catatan markdown ringan untuk Android. Source XySANC-1.0. Listing ini dummy untuk menguji alur list, filter, rating, dan ulasan — semua field mock, tidak ada yang dipalsukan sebagai produksi.",
    platform: "Android",
    category: "Produktivitas",
    stack: ["Kotlin", "SQLDelight"],
    sourceKind: "xysanc",
    version: "0.3.0",
    size: "9 MB",
    developer: "XyStudio",
    initials: "FN",
    compat: ["arm64-v8a", "armeabi-v7a"],
    accent: "#818CF8",
    accent2: "#1E1B4B",
    age: "3+",
    updated: "1 Agu 2026",
    sortDate: "2026-08-01",
    released: "18 Jun 2026",
    icon: "/gen/icons/field-notes.webp",
    screenshots: [
      { src: "/gen/shots/field-notes-1.jpg", label: "Daftar catatan" },
      { src: "/gen/shots/field-notes-2.svg", label: "Editor markdown" },
      { src: "/gen/shots/field-notes-3.svg", label: "Pencarian" },
    ],
    changelog: [
      {
        version: "0.3.0",
        date: "1 Agu 2026",
        notes: ["Editor markdown", "Pencarian teks penuh", "Export teks"],
      },
      {
        version: "0.2.1",
        date: "20 Jul 2026",
        notes: ["Perbaikan hilang baris saat simpan cepat"],
      },
    ],
    features: ["Markdown", "Export teks", "Pencarian penuh"],
    rating: 4.2,
    ratingCount: 51,
    installs: "5 rb+",
    containsAds: false,
    ratingBreakdown: [27, 13, 6, 3, 2],
    reviews: [
      {
        id: "fn-1",
        user: "Bima",
        hue: 240,
        rating: 4,
        date: "8 Agu 2026",
        ts: 1767340800000,
        text: "Markdown-nya nyaman dipakai tiap hari. Sinkron antar perangkat belum ada, semoga masuk di 0.4.",
        helpful: 6,
      },
      {
        id: "fn-2",
        user: "Yuni",
        hue: 300,
        rating: 5,
        date: "25 Jul 2026",
        ts: 1766131200000,
        text: "Simpel, ga ribet. Export teks langsung jalan tanpa langkah aneh.",
        helpful: 4,
      },
    ],
    permissions: [
      "Penyimpanan — menyimpan catatan",
      "Tanpa akses jaringan",
    ],
    dataSafety: ["Tidak ada data dikumpulkan", "Semua data di perangkat", "Tidak ada iklan"],
    similar: ["northroom", "lantern"],
    moreFromDev: ["northroom", "kilometer", "lantern"],
    website: "fieldnotes.xystudio.my.id",
    supportEmail: "studio@xystudio.my.id",
  },
  {
    slug: "lantern",
    title: "Lantern",
    tagline: "Dashboard status mesin. Demo only.",
    description:
      "Preview dashboard status layanan: API, scan queue, dan unduhan. Demo only, tanpa file unduhan. Kalau produksi nanti, data di sini yang dipakai XyConsole sebagai papan status internal.",
    platform: "Web",
    category: "Developer",
    stack: ["React"],
    sourceKind: "none",
    version: "0.1.0",
    size: "Web",
    developer: "XyStudio",
    initials: "LN",
    compat: ["Browser modern"],
    accent: "#C084FC",
    accent2: "#3B0764",
    age: "12+",
    updated: "20 Jul 2026",
    sortDate: "2026-07-20",
    released: "30 Jun 2026",
    icon: "/gen/icons/lantern.webp",
    screenshots: [
      { src: "/gen/shots/lantern-1.svg", label: "Semua layanan" },
      { src: "/gen/shots/lantern-2.svg", label: "Detail layanan" },
    ],
    changelog: [
      {
        version: "0.1.0",
        date: "20 Jul 2026",
        notes: ["Prototype awal", "Status chip per layanan"],
      },
    ],
    features: ["Status chip", "Tanpa login"],
    rating: 3.9,
    ratingCount: 23,
    installs: "1 rb+",
    containsAds: false,
    ratingBreakdown: [9, 8, 4, 1, 1],
    reviews: [
      {
        id: "ln-1",
        user: "Dio",
        hue: 280,
        rating: 4,
        date: "31 Jul 2026",
        ts: 1766649600000,
        text: "Status chip jelas dilihat sekilas. Kadang masih harus refresh manual, auto-poll menyusul ya.",
        helpful: 3,
      },
      {
        id: "ln-2",
        user: "Rani",
        hue: 12,
        rating: 3,
        date: "18 Jul 2026",
        ts: 1765526400000,
        text: "Masih demo, jangan dipakai buat produksi dulu. Struktur halamannya sudah oke.",
        helpful: 2,
      },
    ],
    permissions: ["Tidak ada — baca status lewat API publik"],
    dataSafety: ["Data status publik", "Tidak ada akun"],
    similar: ["kilometer", "vaultline"],
    moreFromDev: ["northroom", "field-notes", "kilometer"],
    website: "lantern.xystudio.my.id",
    supportEmail: "studio@xystudio.my.id",
  },
  {
    slug: "pixel-plunge",
    title: "Pixel Plunge",
    tagline: "Arkade turun-naik. Tanpa iklan, sekali bayar.",
    description:
      "Game arkade satu jari: terjun melewati portal, kumpulkan orb, jangan kena laser. Installer resmi lewat gerbang dl.xystudio.my.id. Source XySANC-1.0, dilarang dijual ulang.",
    platform: "Android",
    category: "Game",
    genre: "Arkade",
    stack: ["Kotlin"],
    sourceKind: "xysanc",
    version: "0.9.0",
    size: "31 MB",
    developer: "XyStudio",
    initials: "PP",
    compat: ["arm64-v8a", "armeabi-v7a"],
    accent: "#C084FC",
    accent2: "#3B0764",
    age: "3+",
    updated: "10 Agu 2026",
    sortDate: "2026-08-10",
    released: "5 Jul 2026",
    icon: "/gen/icons/pixel-plunge.webp",
    screenshots: [
      { src: "/gen/shots/pixel-plunge-1.svg", label: "Level 1" },
      { src: "/gen/shots/pixel-plunge-2.svg", label: "Papan skor" },
    ],
    changelog: [
      {
        version: "0.9.0",
        date: "10 Agu 2026",
        notes: ["8 level baru", "Skin portal", "Perbaikan hitbox laser"],
      },
      {
        version: "0.8.2",
        date: "28 Jul 2026",
        notes: ["Mode hemat baterai", "Simpan progres lokal"],
      },
    ],
    features: ["Satu jari", "Tanpa iklan", "Offline"],
    rating: 4.6,
    ratingCount: 512,
    installs: "50 rb+",
    containsAds: false,
    ratingBreakdown: [398, 74, 22, 8, 10],
    reviews: [
      {
        id: "pp-1",
        user: "Galih",
        hue: 285,
        rating: 5,
        date: "9 Agu 2026",
        ts: 1767427200000,
        text: "Satu jari doang tapi bikin nagih. Hitbox laser udah jauh lebih adil dibanding versi 0.8.",
        helpful: 18,
      },
      {
        id: "pp-2",
        user: "Karin",
        hue: 320,
        rating: 4,
        date: "1 Agu 2026",
        ts: 1766736000000,
        text: "Seru. Minta skin portal lebih banyak dan leaderboard lokal.",
        helpful: 7,
        reply: {
          user: "XyStudio",
          date: "2 Agu 2026",
          text: "Leaderboard lokal masuk roadmap 1.0. Skin baru ikut rilis berikutnya.",
        },
      },
    ],
    permissions: [
      "Penyimpanan — menyimpan progres",
      "Tanpa akses jaringan — offline penuh",
    ],
    dataSafety: [
      "Tidak ada data dikumpulkan",
      "Progres di perangkat",
      "Tidak ada iklan",
    ],
    similar: ["orbit-dash", "neon-rally"],
    moreFromDev: ["orbit-dash", "neon-rally"],
    supportEmail: "studio@xystudio.my.id",
  },
  {
    slug: "orbit-dash",
    title: "Orbit Dash",
    tagline: "Luncur antar orbit. Demo browser.",
    description:
      "Demo hypercasual: tahan untuk meluncur, lepas untuk pindah orbit. Langsung main di browser, tidak ada file unduhan. Source tidak ada di listing ini.",
    platform: "Web",
    category: "Game",
    genre: "Arkade",
    stack: ["TypeScript"],
    sourceKind: "none",
    version: "0.4.1",
    size: "Web",
    developer: "XyStudio",
    initials: "OD",
    compat: ["Browser modern"],
    accent: "#6EE7B7",
    accent2: "#042F2E",
    age: "3+",
    updated: "6 Agu 2026",
    sortDate: "2026-08-06",
    released: "20 Jul 2026",
    icon: "/gen/icons/orbit-dash.webp",
    screenshots: [
      { src: "/gen/shots/orbit-dash-1.svg", label: "Gameplay" },
      { src: "/gen/shots/orbit-dash-2.svg", label: "Pilih level" },
    ],
    changelog: [
      {
        version: "0.4.1",
        date: "6 Agu 2026",
        notes: ["6 orbit baru", "Partikel ekor", "Perbaikan input sentuh"],
      },
    ],
    features: ["Langsung di browser", "Tanpa akun"],
    rating: 4.1,
    ratingCount: 128,
    installs: "10 rb+",
    containsAds: false,
    ratingBreakdown: [82, 26, 10, 5, 5],
    reviews: [
      {
        id: "od-1",
        user: "Vino",
        hue: 165,
        rating: 4,
        date: "8 Agu 2026",
        ts: 1767340800000,
        text: "Kontrolnya responsif di sentuh. Di desktop pakai spasi juga enak.",
        helpful: 6,
      },
      {
        id: "od-2",
        user: "Maya",
        hue: 200,
        rating: 5,
        date: "27 Jul 2026",
        ts: 1766304000000,
        text: "Demo doang tapi udah lebih mulus dari banyak game jadi.",
        helpful: 4,
      },
    ],
    permissions: ["Tidak ada — berjalan penuh di browser"],
    dataSafety: ["Tidak ada data dikumpulkan", "Tidak ada akun"],
    similar: ["pixel-plunge", "neon-rally"],
    moreFromDev: ["pixel-plunge", "neon-rally"],
    website: "orbit-dash.xystudio.my.id",
    supportEmail: "studio@xystudio.my.id",
  },
  {
    slug: "neon-rally",
    title: "Neon Rally",
    tagline: "Balapan neon. XySANC, offline penuh.",
    description:
      "Balapan top-down dengan jejak neon. Offline penuh, tidak ada iklan, tidak ada akun. Installer resmi lewat gerbang dl.xystudio.my.id.",
    platform: "Android",
    category: "Game",
    genre: "Balapan",
    stack: ["Kotlin"],
    sourceKind: "xysanc",
    version: "0.6.3",
    size: "26 MB",
    developer: "XyStudio",
    initials: "NR",
    compat: ["arm64-v8a"],
    accent: "#818CF8",
    accent2: "#1E1B4B",
    age: "3+",
    updated: "3 Agu 2026",
    sortDate: "2026-08-03",
    released: "12 Jul 2026",
    icon: "/gen/icons/neon-rally.webp",
    screenshots: [
      { src: "/gen/shots/neon-rally-1.svg", label: "Sirkuit" },
      { src: "/gen/shots/neon-rally-2.svg", label: "Garasi" },
    ],
    changelog: [
      {
        version: "0.6.3",
        date: "3 Agu 2026",
        notes: ["Sirkuit malam baru", "Kontrol kemiringan disempurnakan"],
      },
    ],
    features: ["Offline penuh", "Tanpa iklan", "XySANC-1.0"],
    rating: 4.4,
    ratingCount: 89,
    installs: "5 rb+",
    containsAds: false,
    ratingBreakdown: [58, 20, 6, 3, 2],
    reviews: [
      {
        id: "nr-1",
        user: "Bayu",
        hue: 240,
        rating: 5,
        date: "7 Agu 2026",
        ts: 1767254400000,
        text: "Jejak neonnya keren, dan beneran offline. Pas buat perjalanan tanpa sinyal.",
        helpful: 9,
      },
      {
        id: "nr-2",
        user: "Salsa",
        hue: 300,
        rating: 4,
        date: "26 Jul 2026",
        ts: 1766217600000,
        text: "Sirkuitnya masih dikit. Update berikutnya nambah berapa trek?",
        helpful: 5,
        reply: {
          user: "XyStudio",
          date: "27 Jul 2026",
          text: "Dua trek baru di 0.7, termasuk sirkuit hujan.",
        },
      },
    ],
    permissions: [
      "Penyimpanan — menyimpan progres",
      "Tanpa akses jaringan — offline penuh",
    ],
    dataSafety: [
      "Tidak ada data dikumpulkan",
      "Progres di perangkat",
      "Tidak ada iklan",
    ],
    similar: ["pixel-plunge", "orbit-dash"],
    moreFromDev: ["pixel-plunge", "orbit-dash"],
    supportEmail: "studio@xystudio.my.id",
  },
];

export function getApp(slug: string) {
  return APPS.find((a) => a.slug === slug);
}

export function sourceLabel(kind: SourceKind) {
  if (kind === "xysanc") return { text: "XySANC", tone: "free" as const };
  if (kind === "paid") return { text: "Berbayar", tone: "paid" as const };
  return { text: "Demo", tone: "mute" as const };
}

export function ctaLabel(kind: SourceKind) {
  if (kind === "xysanc") return "Install";
  if (kind === "paid") return "Terkunci";
  return "Buka";
}

export function fmtCount(n: number) {
  if (n >= 1000) return `${(n / 1000).toFixed(1).replace(".", ",")} rb`;
  return String(n);
}

/** API publik toko: semua field mock, tidak ada yang disembunyikan. */
export function toPublicApp(app: AppItem) {
  return { ...app };
}

/* ============================================================
   PROFIL — developer dan user dengan id hash (bukan nama polos)
   ============================================================ */

export type Developer = {
  id: string;
  name: string;
  tagline: string;
  bio: string;
  website?: string;
  supportEmail: string;
  verified: boolean;
  joined: string;
};

export const DEVELOPERS: Developer[] = [
  {
    id: "dev_9ad3fc16fba58be186971be4018f20afc4752132e69dc42d92a861609aceaebb",
    name: "XyStudio",
    tagline: "Studio kecil, hitam doff, ungu logam.",
    bio: "Pengembang semua app di XyApps. Prinsip: tanpa iklan yang bisa dihindari, tanpa akun yang bisa dihindari, dan installer resmi cuma lewat gerbang dl.xystudio.my.id.",
    website: "xystudio.my.id",
    supportEmail: "studio@xystudio.my.id",
    verified: true,
    joined: "Jan 2026",
  },
];

export function getDeveloper(id: string) {
  return DEVELOPERS.find((d) => d.id === id);
}

export function getDeveloperOfApp(_app: AppItem) {
  void _app;
  // Semua app saat ini milik XyStudio. Kalau nanti ada developer lain,
  // pemetaan dipindah ke field devId per app.
  return DEVELOPERS[0];
}

export type UserProfile = {
  id: string;
  name: string;
  hue: number;
  joined: string;
  reviews: number;
  helpful: number;
  apps: { slug: string; rating: number }[];
};

/**
 * Id hash panjang (prefix + 64 hex, deterministic dari nama).
 * Bukan hash simpel — di-chain 8 putaran FNV-1a biar tidak bisa
 * ditebak dan tetap stabil untuk link permanen.
 */
function hashId(name: string) {
  const str = `xyapps:user:${name.toLowerCase().trim()}`;
  let out = "";
  for (let round = 0; round < 8; round++) {
    let h = (0x811c9dc5 ^ (round * 0x9e3779b9)) >>> 0;
    for (let i = 0; i < str.length; i++) {
      h ^= str.charCodeAt(i);
      h = Math.imul(h, 0x01000193);
    }
    out += (h >>> 0).toString(16).padStart(8, "0");
  }
  return "u_" + out;
}

export function userIdFor(name: string) {
  return hashId(name);
}

/** Profil user dibangun dari data ulasan: id hash deterministik. */
export const USERS: UserProfile[] = (() => {
  const map = new Map<string, UserProfile>();
  for (const app of APPS) {
    for (const r of app.reviews) {
      const key = r.user;
      const id = hashId(r.user);
      let u = map.get(key);
      if (!u) {
        u = {
          id,
          name: r.user,
          hue: r.hue,
          joined: "2026",
          reviews: 0,
          helpful: 0,
          apps: [],
        };
        map.set(key, u);
      }
      u.reviews += 1;
      u.helpful += r.helpful;
      if (!u.apps.some((a) => a.slug === app.slug)) {
        u.apps.push({ slug: app.slug, rating: r.rating });
      }
    }
  }
  return [...map.values()].sort((a, b) => b.helpful - a.helpful);
})();

export function getUserProfile(id: string) {
  return USERS.find((u) => u.id === id);
}
