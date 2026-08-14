import type { Metadata } from "next";
import { Sym } from "@/components/Icon";

export const metadata: Metadata = { title: "Trust" };

const ROWS = [
  {
    icon: "database" as const,
    tone: "ok" as const,
    title: "Katalog publik bersih",
    text: "Tidak berisi email, nomor WA, atau peran orang lain. Hanya metadata app.",
  },
  {
    icon: "link" as const,
    tone: "lilac" as const,
    title: "Origin tidak bocor",
    text: "File dari GitHub / sumber berbayar tidak pernah dikirim langsung ke browser. Semua lewat gerbang.",
  },
  {
    icon: "shield" as const,
    tone: "lilac" as const,
    title: "Satu pintu unduhan",
    text: "Installer resmi hanya lewat dl.xystudio.my.id dengan tiket bertanda tangan.",
  },
  {
    icon: "fingerprint" as const,
    tone: "indigo" as const,
    title: "Hash, bukan nama file",
    text: "Sistem verifikasi memakai sha256 dan version_code, bukan nama file yang bisa dipalsukan.",
  },
  {
    icon: "cookie" as const,
    tone: "ok" as const,
    title: "Belum ada server",
    text: "Sekarang semua mock: sesi, library, dan ulasan cuma di localStorage perangkatmu.",
  },
];

export default function TrustPage() {
  return (
    <div className="wrap page-inner stack-16">
      <p className="kicker">Trust</p>
      <h1 className="page-title">Yang kami simpan</h1>
      <p className="sub">
        Prinsipnya satu: sesedikit mungkin, dan selalu bisa dijelaskan kenapa.
      </p>
      <div className="stack-10">
        {ROWS.map((r) => (
          <div key={r.title} className="panel trust-row">
            <span className={`notif-icon ${r.tone}`}>
              <Sym name={r.icon} size={19} />
            </span>
            <span className="grow">
              <strong>{r.title}</strong>
              <p>{r.text}</p>
            </span>
          </div>
        ))}
      </div>
      <p className="meta-line">
        Detail teknis lengkap menyusul setelah backend hidup. Untuk sekarang,
        yang di halaman ini jujur: tidak ada yang disimpan di server.
      </p>
    </div>
  );
}
