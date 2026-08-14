# Arsitektur Platform XyApps

Dokumen ini jawaban teknis untuk pertanyaan besar: format upload, engine scan
(XyScan), deteksi arsitektur perangkat, penyimpanan file, dan rating usia.

---

## 1. Format upload: AAB dan/atau APK

**Jawaban: dua-duanya diterima, AAB dipecah di sisi kita.**

- **AAB (Android App Bundle)** tidak bisa di-install langsung. Itu format
  pengiriman: isinya semua resource (semua arsitektur, semua kepadatan layar,
  semua bahasa) dan wajib dipecah jadi APK oleh `bundletool` (tool resmi
  Google, gratis, jalan di server kita).
- **APK** bisa langsung di-install, tapi kalau dev cuma ngasih APK universal,
  ukurannya bengkak buat semua orang.

**Alur yang disarankan:**

```
Dev upload AAB (atau APK)
  -> ingest.xyapps (validasi hash/signature)
  -> XyScan scan AAB mentah
  -> bundletool build-apks
       -> split APK per arsitektur: base-arm64_v8a.apk, base-armeabi_v7a.apk
       -> (opsional) APK universal
  -> simpan semua APK hasil split
  -> gerbang unduh memilih APK yang cocok dengan perangkat user
```

Keuntungan AAB: split per arsitektur **gratis** — ini dasar dari fitur
deteksi arsitektur di bawah. Dev cukup ngasih satu AAB, kita yang urus
sisanya.

## 2. XyScan: engine scan otomatis sebelum publikasi

**Jawaban: bisa, dan ini memang rencana kita.** Yang jujur: tidak ada scanner
yang nangkap 100% malware, jadi kebijakannya berlapis.

**V1 — analisis statis (otomatis, tanpa biaya besar):**

| Cek | Alat | Keterangan |
| --- | --- | --- |
| Hash malware dikenal | YARA + database signature | Deteksi pola malware/ransomware |
| Verifikasi signature APK | `apksigner verify` (v1/v2/v3) | APK tanpa signature valid = tolak |
| Manifest | `androguard` | Izin berbahaya (SMS, aksesibilitas, overlay), exported components |
| Deteksi packer/obfuscator | APKiD | Aplikasi yang sengaja nyembunyiin isi = curiga |
| String & URL | androguard + regex | C2, domain mencurigakan, endpoint aneh |
| Analisis DEX | jadx + MobSF | Panggilan API berbahaya, refleksi aneh |

Kerangka yang dipakai: **MobSF (Mobile Security Framework)** — open source,
punya REST API, jalan di Docker di VPS. Kita panggil lewat antrean.

**V2 — analisis dinamis (nanti):** jalanin app di emulator (MobSF dynamic /
Genymotion) buat liat perilaku nyata: koneksi jaringan, akses file, SMS.

**Alur otomatisasi (persis yang diminta):**

```
push/upload -> status: pending_scan
  -> antrean XyScan -> status: scanning
  -> hasil scan:
       bersih + signature valid -> status: published (OTOMATIS)
       mencurigakan/izin berbahaya -> status: needs_review (tahan, review manual)
       malware/ransomware terdeteksi -> status: rejected (hapus, log, notify dev)
```

Jadi: bersih = auto-publish tanpa sentuh manusia; ada masalah = tahan.
Script otomatisasinya di `xyapps-console` (repo terpisah) via API ingest.

## 3. Deteksi arsitektur perangkat user

**Jawaban: bisa, dengan batasan jujur.** Browser tidak bisa baca CPU secara
langsung. Yang bisa:

| Sinyal | Sumber | Kualitas |
| --- | --- | --- |
| `Sec-CH-UA-Arch` | Client Hints (header) | `arm` vs `x86` |
| `Sec-CH-UA-Platform-Version` | Client Hints | Versi Android |
| `User-Agent` | Header klasik | Model HP, kadang arch |

**Aturan praktis (rule-based, server-side):**

- Android 10+ (API 29+) di arm -> praktis pasti 64-bit -> kasih `arm64-v8a`
- Android 5–9 di arm -> kasih `armeabi-v7a` (32-bit), fallback arm64 kalau ada
- x86 -> emulator/tablet tertentu -> kasih `x86_64`
- Deteksi gagal -> kasih APK universal (lebih besar, tapi pasti jalan)

**Alur gerbang unduh:**

```
GET dl.xystudio.my.id/d/{slug}?tiket=...
  + header Client Hints dari browser
  -> resolve: arsitektur user vs daftar split APK
  -> cocok: stream APK yang pas + progres asli
  -> tidak cocok (misal app cuma 64-bit, HP user 32-bit):
       HTTP 409 -> web menampilkan peringatan:
       "Aplikasi tidak kompatibel dengan perangkatmu"
       (tombol Install nonaktif + alasan, bukan tombol mati diam-diam)
```

**Di UI sekarang (mock):** setiap app punya field `compat` (daftar
arsitektur). App yang cuma mendukung `arm64-v8a` (contoh: Neon Rally)
menampilkan peringatan "Perangkat 32-bit tidak didukung". Setelah API hidup,
nilai ini dihitung dari split APK asli, bukan diisi manual.

## 4. File upload disimpan di mana?

**Jawaban: wajib disimpan. Toko harus memegang byte-nya sendiri.**

Kalau file cuma numpang di repo developer, gerbang unduh kita cuma
redirect terselubung: URL asal bocor di Network tab, dan kalau dev hapus
repo-nya, app hilang dari toko. Toko yang serius menyimpan sendiri.

**V1 tanpa kartu kredit (sesuai plan):**

```
VPS Indonesia (Rumahweb / IDCloudHost / Contabo, bayar transfer bank)
  + disk (atau MinIO sebagai object storage)
```

Yang disimpan: AAB asli (arsip/audit) + hasil split APK (yang
didistribusikan). Estimasi awal: 50 GB cukup untuk ratusan app.

**Alternatif V1 tanpa VPS:** GitHub draft release repo internal XyStudio +
stream lewat GitHub API pakai token server. Trade-off: lebih murah, tapi
terikat limit GitHub dan mesti pindah nanti.

**V2 (kalau sudah ada CC):** Cloudflare R2 / S3 compatible.

Yang tidak pernah boleh: file di Vercel (limit body ~4.5 MB, APK 25-80 MB
pasti putus) dan redirect langsung ke GitHub.

## 5. Rating usia

**Sistem 5 level ala IARC/Play Store:** `3+`, `7+`, `12+`, `16+`, `18+`.

- Badge berwarna (hijau -> merah) tampil di hero, stat, dan halaman detail
- Halaman `/age-rating` menjelaskan tiap level + deskriptor konten
  (kekerasan, bahasa, pembelian dalam app, dll)
- Dev wajib menyatakan rating jujur saat submit; rating bohong =
  `pending_review`, tidak pernah auto-publish
- Mock sekarang; klasifikasi resmi IARC bisa diintegrasi belakangan

---

## Urutan bangun

1. Postgres (Neon/Supabase free) + Auth asli
2. API ingest + token developer + webhook GitHub Actions
3. XyScan v1 (MobSF di VPS, antrean, auto-publish bersih)
4. Gerbang `dl.xystudio.my.id` (Cloudflare Worker) + resolve arsitektur +
   progres asli
5. Storage file (VPS/MinIO) + tiket HMAC
6. Ulasan/rating asli
7. `console.xystudio.my.id` (repo terpisah, sinkron via `api.xystudio.my.id`)
