# XyApps

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=nextdotjs)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19-149ECA?style=flat-square&logo=react&logoColor=white)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Vercel](https://img.shields.io/badge/Deploy-Vercel-black?style=flat-square&logo=vercel)](https://vercel.com)
[![License](https://img.shields.io/badge/App%20source-XySANC--1.0-7C3AED?style=flat-square)](./XYSANC-1.0.md)
[![Status](https://img.shields.io/badge/status-UI%20mock-8B8B98?style=flat-square)](#status)

Toko aplikasi resmi oleh **XySpace** (d/h XyStudio). Produk tetap bernama XyApps. Hitam doff, ungu logam.

Source gratis boleh dipakai. Dilarang dijual. Installer resmi lewat gerbang, bukan tautan GitHub mentah.

## Domain (semua di bawah xystudio.my.id)

| Layanan | Domain |
| --- | --- |
| Toko XyApps | `xyapps.xystudio.my.id` |
| Console developer | `console.xystudio.my.id` |
| Gerbang unduh | `dl.xystudio.my.id` |
| API | `api.xystudio.my.id` (menyusul) |
| Studio | `xystudio.my.id` |

Situs toko: [xyapps.xystudio.my.id](https://xyapps.xystudio.my.id) (setelah DNS + Vercel).

---

## Status

UI mock + API JSON palsu. Belum ada database, Auth.js, atau unduhan sungguhan.

Kerangka sudah Next.js App Router, jadi backend numpang di sini, bukan rebuild.

## Stack

| Lapisan | Pakai |
| --- | --- |
| App | Next.js 16 App Router, React 19, TypeScript |
| Hosting | Vercel |
| Data sekarang | `src/lib/data.ts` (mock) |
| Icon | Material Symbols Rounded (self-host, subset, sumbu FILL) |
| Font UI | Outfit (Google Fonts, OFL) |
| Gambar | WebP/JPG hasil generate + SVG mockup di `public/gen/` |
| Lisensi app gratis | XySANC-1.0 |

## Jalanin lokal

```bash
npm install
npm run dev
```

Buka `http://localhost:3000`.

```bash
npm run build
npm run start
```

## Halaman

| Path | Isi |
| --- | --- |
| `/` | Beranda: chips, rail kategori, pilihan, teratas, terbaru |
| `/apps` | Katalog aplikasi non-game: filter, genre, sort, kata kunci populer + riwayat |
| `/games` | Katalog game: genre (Arkade, Balapan, ...), sort, rating |
| `/search` | Halaman pencarian penuh: autofocus, sedang dicari, riwayat, hasil langsung |
| `/apps/[slug]` | Detail ala Play Store: stat dengan icon (rating, unduhan, umur, ukuran), tentang di bawah cuplikan, ulasan (sort + filter bintang) + balasan developer, tulis ulasan, viewer cuplikan fullscreen, keamanan data, izin inline, email developer, laporkan app, gerbang unduh bertiket |
| `/library` | Tab Terpasang + Wishlist (localStorage) |
| `/notifications` | Notifikasi mock + tandai semua dibaca |
| `/legal` | XySANC-1.0 |
| `/trust` | Kebijakan data |
| `/login` | Masuk: Google di atas, form email + kata sandi (show/hide) + setuju S&K, lalu XySpace ID — tanpa switcher |
| `/register` | Daftar akun: nama, email, kata sandi + konfirmasi, setuju S&K, lanjut ke verifikasi OTP |
| `/terms/xyspace` `/privacy/xyspace` | S&K dan kebijakan privasi layanan XySpace |
| `/verify` | Verifikasi OTP 6 digit: auto-advance, paste, hitung mundur kirim ulang |
| `/me` | Profil lengkap: stats, Pengaturan (toggle notifikasi/update otomatis), Preferensi tema, link trust/legal/bantuan, keluar |
| `/help` | Bantuan: FAQ bisa dibuka-tutup |
| `/developer` | Program developer XySpace: lisensi resmi, XyScan otomatis, tim XySpace, bagi hasil |
| `/age-rating` | Papan rating usia (3+, 7+, 12+, 16+, 18+) + deskriptor konten |
| `/terms/[slug]` `/privacy/[slug]` | Ketentuan layanan & kebijakan privasi per app — hanya untuk app yang dev-nya menerbitkan |
| `/profile/u/[id]` | Profil user publik dengan id hash (dibangun dari data ulasan) |
| `/profile/dev/[id]` dan `/profile/dev/u/[id]` | Profil developer: banner, verifikasi, stats, daftar app |
| `/e/403` `/e/404` `/e/500` `/e/503` | Demo halaman error bericon (asli: `not-found.tsx` untuk 404, `error.tsx` untuk 500, `global-error.tsx` untuk root) |
| `/console` | Halaman "pindah rumah" — XyConsole proyek terpisah |
| `/api/apps` | JSON katalog, field publik saja |
| `/api/apps/[slug]` | JSON detail per app |
| `/api/health` | Healthcheck |

## UX yang sengaja ditiru dari Play Store

- Bottom nav 4 tab: Beranda, Aplikasi, Game, Library. Icon dua versi per tab (fill saat aktif, outline saat tidak). Label tab tersembunyi, muncul di bawah icon saat aktif dengan animasi
- Pencarian cuma satu pintu: pill di topbar membuka halaman `/search` penuh dengan autofocus, kata kunci sedang dicari, dan riwayat
- Detail app: stat icon tanpa label di atas tombol (rating, ukuran, rating umur, unduhan), urutan: cuplikan -> Yang baru -> Tentang (deskripsi saja) -> Rating -> Ulasan -> Info aplikasi (baris detail) -> Keamanan data. Ketentuan layanan + kebijakan privasi hanya kalau dev menerbitkannya, tombol unduh hilang otomatis kalau perangkat tidak kompatibel
- Viewer cuplikan fullscreen polos tanpa card: panah, swipe sentuh, keyboard, counter
- Rating bintang + distribusi per bintang + ulasan (sort relevan/terbaru/membantu, filter per bintang) + balasan developer
- Progres unduh melingkar di icon app dengan gaya ular: busur gradien ungu + ekor terang yang berputar + persen di tengah, tombol menampilkan status "Mengunduh… %"
- Bottom sheet hanya untuk gerbang unduh. Share lewat navigator.share (fallback modal), izin inline, laporan modal
- Tema gelap/terang konsisten, default mengikuti sistem, bisa diatur di Preferensi (Profil). Dipasang sebelum paint, tanpa kilatan
- Halaman error lengkap dengan icon: 403 akses ditolak, 404 tidak ditemukan, 500 kesalahan server, 503 pemeliharaan — plus error boundary global
- Lisensi dan Trust ditampilkan sebagai kartu bericon, bukan dinding teks
- Link penting memakai hash/slug panjang (64 hex, deterministic): nama developer di detail app mengarah ke `/profile/dev/[id]`, nama penulis ulasan ke `/profile/u/[id]` — bukan query param
- List dan kartu menampilkan total unduhan, bukan total ulasan (jumlah ulasan hanya di seksi Rating)
- Tanpa kotak fokus biru bawaan browser saat diklik; aksesibilitas keyboard tetap lewat `:focus-visible`
- Switch pengaturan beranimasi (spring) dan bebas efek tekan global
- Responsive: padding fluid, clamp untuk cuplikan, layout khusus layar kecil (<380px) dan desktop (>860px: nav pill melayang, ulasan 2 kolom)
- Skeleton saat load, fade-in gambar, fallback saat gambar gagal muat, transisi tekan pada tombol
- Empty state jujur: vaultline belum dirilis, rating tidak dipalsukan, ulasan butuh app terpasang
- Gerbang unduh: tiket `dl.xystudio.my.id`, URL origin tidak pernah dikirim ke browser
- Banner "Lanjut ke aplikasi" muncul sekali per perangkat (dismiss tersimpan) — disiapkan untuk versi aplikasi native XyApps
- Badge rating umur: netral abu-putih agar cocok di tema gelap dan terang (var --age-fg). Level 7+, 13+, 18+ memakai artwork asli XySpace (desain Alight Motion) yang di-trace jadi path SVG INLINE — tidak ada file gambar yang bisa disimpan; 3+ dan 16+ SVG dengan gaya yang sama (artwork menyusul). Tangga umur: 3+, 7+, 13+, 16+, 18+
- Logo XyApps: wordmark animasi (WebP transparan, trace dari GIF desain XySpace) — font berlisensi tidak dipakai lagi
- Proteksi aset: gambar tidak bisa di-drag/diseleksi, klik kanan pada icon app dan cuplikan tidak memunculkan menu simpan gambar (pointer-events none + user-drag none). Batas jujur: apa pun yang tampil di layar tetap bisa di-screenshot — proteksi nyata adalah lisensi
- Icon app tampil rata tanpa box/background (fallback gradien hanya untuk app tanpa gambar)
- Profil developer: cover gradien berpola, badge terverifikasi, chip lokasi, kontak, stats, daftar app
- Simulasi perangkat 32-bit tersedia di Pengaturan (uji alur tombol unduh hilang)
- Badge rating umur: SEMUA level (3+, 7+, 13+, 16+, 18+) memakai artwork asli XySpace yang di-trace jadi SVG inline
- Rebrand: company XyStudio -> XySpace di seluruh repo (produk XyApps tetap, URL/email xystudio.my.id tidak berubah)
- Icon kategori: ilustrasi 3D claymorphism (Aplikasi, Game, Musik, Tools), background hitam di-chroma-key + feather, HD 512, webp transparan — tidak neon/cyber, clean
- Logo XyApps: WebP animasi HD 2x (30fps, chroma-key + despeckle, tanpa sisa background)
- Bottom nav 4 kotak; tab Aplikasi memakai icon grid 4 kotak
- Badge rating umur ikut warna lilac (konsisten dengan stat icon)
- Slot iklan berlabel di beranda, katalog, dan pencarian (siap diganti jaringan iklan)
- Syarat developer ketat di /developer: identitas resmi, hak cipta, verifikasi 2 tahap, masa percobaan, sanksi
- SEO: robots.txt, sitemap.xml (20 URL), manifest, theme-color, keywords
- App belum rilis: tombol berubah jadi "Ingatkan saya" (pengingat tersimpan)
- Install = unduhan nyata: fetch stream dengan progres asli (byte diterima / total), ring mengikuti transfer, lalu file masuk folder unduhan browser; tombol berubah jadi "Batal" (outline) selama mengunduh dan membatalkan stream (AbortController). Kontrak asli: ganti DEMO_URL dengan endpoint bertiket saat gerbang unduh hidup
- Security headers dipasang (CSP, anti-clickjacking, nosniff, referrer-policy) — lihat docs/SECURITY.md

## Keamanan web

Asesmen jujur + roadmap ada di [docs/SECURITY.md](./docs/SECURITY.md).
Header keamanan sudah aktif di `next.config.ts`.

## Arsitektur platform

Jawaban untuk format AAB, engine XyScan, deteksi arsitektur perangkat,
penyimpanan file, dan sistem rating usia ada di [docs/PLATFORM.md](./docs/PLATFORM.md).

## Console terpisah

XyConsole tidak lagi numpang di repo ini. Target subdomain sendiri: `console.xystudio.my.id`, repo terpisah (`xyapps-console`). Sinkronisasi lewat API bersama (`api.xystudio.my.id`), bukan database dobel — toko dan console dua klien dari satu sumber data.

## Deploy Vercel

1. Import repo ini di [vercel.com/new](https://vercel.com/new)
2. Framework: Next.js (otomatis). Root: `/`
3. Domain custom: `xyapps.xystudio.my.id` ke `cname.vercel-dns.com`

Jangan rewrite semua path ke `index.html`. Itu mematikan App Router.

## Yang sengaja belum ada

Auth.js, Postgres, tiket unduh sungguhan, XyScan, Midtrans.

Progres unduh saat ini masih simulasi (interval mock). Kontrak saat backend
`dl.xystudio.my.id` hidup: persentase wajib dihitung dari byte yang diterima
dari stream asli (diterima / Content-Length), bukan ditambah-tambah — lihat
komentar di `src/app/apps/[slug]/DetailClient.tsx` fungsi `startDownload`.

## Lisensi repo vs lisensi app

Kode toko ini (folder repo) menyusul ditentukan.
Aplikasi yang dibagikan lewat XyApps memakai [XySANC-1.0](./XYSANC-1.0.md): source-available, non-commercial resale.

XySpace
