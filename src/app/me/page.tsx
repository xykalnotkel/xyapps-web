"use client";

import Link from "next/link";
import { useSession } from "@/components/Session";
import { LoadingButton } from "@/components/ui/LoadingButton";

export default function MePage() {
  const { user, ready, logout } = useSession();

  if (!ready) {
    return (
      <div className="wrap page-inner">
        <p className="sub">Memuat sesi…</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="wrap page-inner stack-16">
        <h1 className="page-title">Akun</h1>
        <p className="sub">Belum masuk. Browsing katalog tidak wajib login.</p>
        <Link className="lbtn solid" href="/login">
          Masuk
        </Link>
      </div>
    );
  }

  return (
    <div className="wrap page-inner stack-16">
      <div className="account-head">
        <div className="avatar lg">{user.name.slice(0, 1).toUpperCase()}</div>
        <div>
          <h1 className="page-title">{user.name}</h1>
          <p className="sub">{user.email} · tidak ditampilkan ke orang lain</p>
        </div>
      </div>
      <div className="panel">
        <h3>Library</h3>
        <p>
          <Link href="/library">Lihat yang terpasang</Link>
        </p>
      </div>
      <LoadingButton variant="ghost" onClick={logout}>
        Keluar
      </LoadingButton>
    </div>
  );
}
