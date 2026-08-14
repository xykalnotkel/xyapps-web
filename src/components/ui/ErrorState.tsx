import Link from "next/link";
import { Sym } from "@/components/Icon";
import type { SymName } from "@/lib/symbols";

export type ErrKind = "403" | "404" | "500" | "503";

const META: Record<
  ErrKind,
  { icon: SymName; title: string; desc: string; tone: "danger" | "warn" | "mute" }
> = {
  "403": {
    icon: "lock",
    title: "Akses ditolak",
    desc: "Kamu tidak punya izin untuk membuka halaman ini. Kalau ini salah, hubungi XyStudio.",
    tone: "danger",
  },
  "404": {
    icon: "search",
    title: "Halaman tidak ditemukan",
    desc: "Halaman atau aplikasi itu tidak ada, atau sudah dipindah. Coba cari dari katalog.",
    tone: "mute",
  },
  "500": {
    icon: "error",
    title: "Ada yang tidak beres",
    desc: "Server menabrak kesalahan internal. Coba muat ulang — kalau tetap muncul, laporkan ke XyStudio.",
    tone: "danger",
  },
  "503": {
    icon: "construction",
    title: "Sedang pemeliharaan",
    desc: "Layanan sedang dirawat atau sibuk. Biasanya cuma beberapa menit. Coba lagi sebentar lagi.",
    tone: "warn",
  },
};

export function ErrorState({
  code,
  onRetry,
}: {
  code: ErrKind;
  onRetry?: () => void;
}) {
  const m = META[code];
  return (
    <div className="wrap page-inner">
      <div className="err-wrap">
        <span className={`err-ic ${m.tone}`}>
          <Sym name={m.icon} size={44} />
        </span>
        <p className="err-code">{code}</p>
        <h1 className="page-title">{m.title}</h1>
        <p className="sub err-desc">{m.desc}</p>
        <div className="err-actions">
          {onRetry && (
            <button type="button" className="lbtn soft" onClick={onRetry}>
              <Sym name="refresh" size={16} /> Muat ulang
            </button>
          )}
          <Link className="lbtn solid" href="/">
            <Sym name="home" size={16} /> Ke beranda
          </Link>
          <Link className="lbtn ghost" href="/apps">
            Jelajahi katalog
          </Link>
        </div>
        <p className="meta-line">
          Status {code} · XyApps masih mock — laporan error masuk ke tim XyStudio.
        </p>
      </div>
    </div>
  );
}
