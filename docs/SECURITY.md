# Keamanan Web XyApps

Asesmen jujur terhadap posture keamanan situs toko saat ini + roadmap.

---

## Posture saat ini (fase mock statis)

**Yang sudah benar:**

- Tidak ada database, tidak ada secret di sisi server, tidak ada endpoint
  yang bisa disalahgunakan untuk menulis data
- Semua state (sesi, library, wishlist, ulasan) cuma di localStorage —
  artinya kebocoran paling parah cuma data lokal satu pengguna
- Semua aset self-host (font, icon, gambar) — tidak ada dependensi CDN
  pihak ketiga yang bisa jadi vektor supply-chain
- Font Google dipakai lewat `next/font` yang di-bundle lokal saat build

**Header keamanan yang dipasang di `next.config.ts`:**

| Header | Nilai | Fungsi |
| --- | --- | --- |
| Content-Security-Policy | self + inline | Memblokir script dari luar origin |
| X-Frame-Options + frame-ancestors | DENY / none | Anti-clickjacking |
| X-Content-Type-Options | nosniff | Anti MIME sniffing |
| Referrer-Policy | strict-origin | Tidak bocorkan path ke pihak lain |
| Permissions-Policy | kamera/mikro/lokasi mati | Matikan API sensitif |
| Cross-Origin-Opener-Policy | same-origin | Isolasi dari tab lain |

## Risiko yang harus dibereskan

1. **Token GitHub (PAT) pernah beredar di file plaintext** (zip di
   filebin + workspace). Wajib **rotate sekarang** dari GitHub Settings —
   anggap token lama kompromais. Simpan penggantinya hanya di GitHub
   Secrets / environment variable.
2. **Repo public memang sengaja** (demi Actions gratis). Konsekuensi:
   source terbaca siapa saja. Yang dijaga adalah gerbang distribusi dan
   secret, bukan menyembunyikan kode.
3. **localStorage = XSS surface.** Kalau ada skrip bisa masuk, sesi bisa
   dibaca. Mitigasi sekarang: CSP ketat. Setelah Auth asli: token di
   cookie HttpOnly + SameSite, bukan localStorage.
4. **Tidak ada rate limit / proteksi abuse** — relevan nanti saat API
   ingest dan gerbang unduh hidup (DDoS, brute force tiket).

## Roadmap keamanan fase backend

- Auth.js + Google OAuth, cookie HttpOnly + SameSite=Lax, PKCE
- Token developer: scope minimal (`upload_asset`), bisa di-rotate,
  di-hash saat disimpan (tidak pernah plaintext di DB)
- Tiket unduh: HMAC dengan TTL 10 menit + anti-replay
- Gerbang `dl.`: rate limit per IP, ukuran maksimum, header cache
  agresif untuk aset statis
- XyScan: scan wajib sebelum `published`, signature APK wajib valid
- Console: 2FA, audit log semua aksi admin/developer
- Backup Postgres terenkripsi + pemantauan uptime
- security.txt + kebijakan pelaporan bug (responsible disclosure)
