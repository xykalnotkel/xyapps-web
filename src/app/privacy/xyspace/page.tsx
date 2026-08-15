import type { Metadata } from "next";
import Link from "next/link";
import { Sym } from "@/components/Icon";

export const metadata: Metadata = { title: "Kebijakan Privasi XySpace" };

export default function XySpacePrivacyPage() {
  return (
    <div className="wrap page-inner stack-16">
      <div className="profile-back">
        <Link href="/login" className="icon-btn" aria-label="Kembali">
          <Sym name="arrow_back" size={20} />
        </Link>
        <p className="profile-path">Kebijakan Privasi XySpace</p>
      </div>
      <h1 className="page-title">Kebijakan Privasi</h1>
      <p className="sub">Prinsip: simpan sesedikit mungkin, jelaskan semuanya.</p>
      <div className="panel stack-12">
        <div className="safety-list" style={{ borderTop: 0 }}>
          <p><Sym name="shield" size={16} fill /> Email hanya untuk masuk dan notifikasi</p>
          <p><Sym name="shield" size={16} fill /> Kata sandi tidak pernah disimpan sebagai teks polos</p>
          <p><Sym name="shield" size={16} fill /> Data pribadi tidak dijual ke pihak ketiga</p>
          <p><Sym name="shield" size={16} fill /> Akun bisa dihapus kapan saja beserta datanya</p>
        </div>
        <p className="meta-line">
          <Sym name="verified_user" size={14} /> Terakhir diperbarui 15 Agu 2026
        </p>
      </div>
    </div>
  );
}
