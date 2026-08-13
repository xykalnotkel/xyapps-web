# XyApps

Toko resmi **XyStudio**. Next.js App Router.

Sekarang: mockup UI + API JSON palsu. Belum ada database / Auth.js / gerbang unduh sungguhan.

## Jalanin lokal

```bash
npm install
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000).

## Halaman

| Path | Isi |
|---|---|
| `/` | Beranda |
| `/apps` | Katalog |
| `/apps/[slug]` | Detail + tiket unduh palsu |
| `/legal` | XySANC-1.0 |
| `/trust` | Kebijakan data |
| `/login` `/me` | Session mock (localStorage) |
| `/console` | Preview XyConsole |
| `/api/apps` | JSON katalog (field publik saja) |
| `/api/health` | Healthcheck |

## Push GitHub + deploy Vercel

1. Buat repo **baru** di GitHub (boleh public). Jangan namain `xyapps` kalau mau samar — pakai hash, mis. `e71ed747`.
2. Di folder ini:

```bash
git init
git add .
git commit -m "feat: XyApps mockup Next.js"
git branch -M main
git remote add origin https://github.com/USER/e71ed747.git
git push -u origin main
```

3. [vercel.com/new](https://vercel.com/new) → Import repo itu.
4. Framework: Next.js (otomatis). Root: `/`.
5. Domain custom: `xyapps.my.id` di Vercel → DNS di penyedia `.my.id`:

```
A / ALIAS / CNAME  xyapps  →  cname.vercel-dns.com
```

Tidak perlu `vercel.json`. Jangan rewrite semua path ke `index.html`.

## Yang sengaja belum ada

Auth.js, Postgres, tiket unduh sungguhan, XyScan, Midtrans.  
UI dulu; backend menyusul tanpa ganti kerangka ini.
