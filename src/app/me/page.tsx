"use client";

import Link from "next/link";
import { useSession } from "@/components/Session";

export default function MePage() {
  const { user, ready, logout } = useSession();

  if (!ready) {
    return (
      <div className="wrap section">
        <p className="sub">Memuat sesi…</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="wrap section">
        <h2>Akun</h2>
        <p className="sub">Belum masuk. Browsing katalog tidak wajib login.</p>
        <Link className="btn solid" href="/login">
          Masuk
        </Link>
      </div>
    );
  }

  return (
    <div className="wrap section">
      <p className="kicker">Profil sendiri</p>
      <h2>{user.name}</h2>
      <p className="sub">{user.email} · tidak ditampilkan ke orang lain.</p>
      <div className="panel">
        <h3>Library</h3>
        <p>Kosong. Nanti isi app yang pernah di-install / dibeli.</p>
      </div>
      <button className="btn ghost" type="button" onClick={logout}>
        Keluar
      </button>
    </div>
  );
}
