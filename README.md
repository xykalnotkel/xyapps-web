# XyApps

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=nextdotjs)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19-149ECA?style=flat-square&logo=react&logoColor=white)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Vercel](https://img.shields.io/badge/Deploy-Vercel-black?style=flat-square&logo=vercel)](https://vercel.com)
[![License](https://img.shields.io/badge/App%20source-XySANC--1.0-7C3AED?style=flat-square)](./XYSANC-1.0.md)
[![Status](https://img.shields.io/badge/status-UI%20mock-8B8B98?style=flat-square)](#status)

Toko resmi **XyStudio**. Hitam doff, ungu logam.

Source gratis boleh dipakai. Dilarang dijual. Installer resmi lewat gerbang, bukan tautan GitHub mentah.

Situs: [xyapps.my.id](https://xyapps.my.id) (setelah DNS + Vercel). Studio: [xystudio.my.id](https://xystudio.my.id)

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
| Icon | Material Symbols Rounded (self-host, subset 92 KB, sumbu FILL) |
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
| `/login` `/me` | Session mock + Preferensi tema (Sistem/Gelap/Terang) |
| `/console` | Halaman "pindah rumah" — XyConsole proyek terpisah |
| `/api/apps` | JSON katalog, field publik saja |
| `/api/apps/[slug]` | JSON detail per app |
| `/api/health` | Healthcheck |

## UX yang sengaja ditiru dari Play Store

- Bottom nav 4 tab: Beranda, Aplikasi, Game, Library. Icon dua versi per tab (fill saat aktif, outline saat tidak), tab aktif muncul dalam pill
- Pencarian cuma satu pintu: pill di topbar membuka halaman `/search` penuh dengan autofocus, kata kunci sedang dicari, dan riwayat
- Detail app: stat dengan icon (bintang rating, unduhan, rating umur dengan kotak 3+, ukuran), "Tentang aplikasi ini" tepat di bawah cuplikan
- Viewer cuplikan fullscreen polos tanpa card: panah, swipe sentuh, keyboard, counter
- Rating bintang + distribusi per bintang + ulasan (sort relevan/terbaru/membantu, filter per bintang) + balasan developer
- Progres unduh di icon app (lingkar persen), bukan bar — sama seperti Play Store
- Bottom sheet hanya untuk gerbang unduh. Share lewat navigator.share (fallback modal), izin inline, laporan modal
- Tema gelap/terang konsisten, default mengikuti sistem, bisa diatur di Preferensi (Profil). Dipasang sebelum paint, tanpa kilatan
- Responsive: padding fluid, clamp untuk cuplikan, layout khusus layar kecil (<380px) dan desktop (>860px: nav pill melayang, ulasan 2 kolom)
- Skeleton saat load, fade-in gambar, fallback saat gambar gagal muat, transisi tekan pada tombol
- Empty state jujur: vaultline belum dirilis, rating tidak dipalsukan, ulasan butuh app terpasang
- Gerbang unduh: tiket `dl.xyapps.my.id`, URL origin tidak pernah dikirim ke browser

## Console terpisah

XyConsole tidak lagi numpang di repo ini. Target subdomain sendiri: `console.xyapps.my.id`. Repo, secret, dan alur rilisnya dipisah dari toko sesuai plan.

## Deploy Vercel

1. Import repo ini di [vercel.com/new](https://vercel.com/new)
2. Framework: Next.js (otomatis). Root: `/`
3. Domain custom: `xyapps.my.id` ke `cname.vercel-dns.com`

Jangan rewrite semua path ke `index.html`. Itu mematikan App Router.

## Yang sengaja belum ada

Auth.js, Postgres, tiket unduh sungguhan, XyScan, Midtrans.

Progres unduh saat ini masih simulasi (interval mock). Kontrak saat backend
`dl.xyapps.my.id` hidup: persentase wajib dihitung dari byte yang diterima
dari stream asli (diterima / Content-Length), bukan ditambah-tambah — lihat
komentar di `src/app/apps/[slug]/DetailClient.tsx` fungsi `startDownload`.

## Lisensi repo vs lisensi app

Kode toko ini (folder repo) menyusul ditentukan.
Aplikasi yang dibagikan lewat XyApps memakai [XySANC-1.0](./XYSANC-1.0.md): source-available, non-commercial resale.

XyStudio
