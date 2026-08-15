import type { Metadata } from "next";
import Link from "next/link";
import { Sym } from "@/components/Icon";

export const metadata: Metadata = { title: "XyConsole" };

/**
 * Console developer: proyek terpisah (repo + subdomain sendiri).
 * Halaman ini cuma penanda — tanpa detail teknis untuk pengguna biasa.
 */
export default function ConsolePage() {
  return (
    <div className="wrap page-inner stack-16">
      <p className="kicker">Untuk developer</p>
      <h1 className="page-title">XyConsole</h1>
      <p className="sub">
        Kelola aplikasimu dari satu tempat — harga, kebijakan, rating usia,
        dan status rilis.
      </p>
      <div className="panel stack-12">
        <p className="moved-row">
          <Sym name="construction" size={18} />
          Console sedang disiapkan
        </p>
        <p>
          Developer yang sudah punya akun akan mendapat akses begitu console
          dibuka. Semua pengaturan aplikasi dikelola dari sana.
        </p>
      </div>
      <Link className="lbtn solid" href="/developer">
        Pelajari program developer
        <Sym name="chevron_right" size={16} />
      </Link>
      <p className="meta-line">
        Developer resmi mendapat lisensi dari XySpace dan otomatis masuk tim
        XySpace.
      </p>
    </div>
  );
}
