import type { Metadata } from "next";
import Link from "next/link";
import { Sym } from "@/components/Icon";

export const metadata: Metadata = { title: "Syarat & Ketentuan XySpace" };

export default function XySpaceTermsPage() {
  return (
    <div className="wrap page-inner stack-16">
      <div className="profile-back">
        <Link href="/login" className="icon-btn" aria-label="Kembali">
          <Sym name="arrow_back" size={20} />
        </Link>
        <p className="profile-path">Syarat &amp; Ketentuan XySpace</p>
      </div>
      <h1 className="page-title">Syarat &amp; Ketentuan</h1>
      <p className="sub">Berlaku untuk seluruh layanan XySpace, termasuk XyApps.</p>
      <div className="panel stack-12">
        <p>
          Akun bersifat pribadi. Kamu bertanggung jawab atas semua aktivitas
          dari akunmu dan wajib menjaga kredensial tetap aman.
        </p>
        <p>
          Konten yang kamu unggah (ulasan, aplikasi) harus milikmu sendiri atau
          kamu punya hak atasnya. Konten curian langsung dihapus dan akun
          ditutup.
        </p>
        <p>
          Ulasan palsu, rating bohong, atau manipulasi peringkat dilarang dan
          berujung penutupan akun.
        </p>
        <p className="meta-line">
          <Sym name="gavel" size={14} /> Terakhir diperbarui 15 Agu 2026
        </p>
      </div>
    </div>
  );
}
