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
| `/` | Beranda |
| `/apps` | Katalog |
| `/apps/[slug]` | Detail + tiket unduh palsu |
| `/legal` | XySANC-1.0 |
| `/trust` | Kebijakan data |
| `/login` `/me` | Session mock (localStorage) |
| `/console` | Preview XyConsole |
| `/api/apps` | JSON katalog, field publik saja |
| `/api/health` | Healthcheck |

## Deploy Vercel

1. Import repo ini di [vercel.com/new](https://vercel.com/new)
2. Framework: Next.js (otomatis). Root: `/`
3. Domain custom: `xyapps.my.id` ke `cname.vercel-dns.com`

Jangan rewrite semua path ke `index.html`. Itu mematikan App Router.

## Yang sengaja belum ada

Auth.js, Postgres, tiket unduh sungguhan, XyScan, Midtrans.

## Lisensi repo vs lisensi app

Kode toko ini (folder repo) menyusul ditentukan.  
Aplikasi yang dibagikan lewat XyApps memakai [XySANC-1.0](./XYSANC-1.0.md): source-available, non-commercial resale.

XyStudio
