"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useMounted, useSession } from "@/components/Session";
import { LoadingButton } from "@/components/ui/LoadingButton";
import { Sym } from "@/components/Icon";
import { readLibrary, readWishlist } from "@/lib/library";

export default function MePage() {
  const { user, logout } = useSession();
  const mounted = useMounted();
  const [counts, setCounts] = useState({ installed: 0, wish: 0 });

  // Muat setelah hidrasi supaya markup server dan klien identik.
  useEffect(() => {
    const id = window.setTimeout(() => {
      setCounts({ installed: readLibrary().length, wish: readWishlist().length });
    }, 0);
    return () => window.clearTimeout(id);
  }, []);

  if (!mounted) {
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
        <div className="panel stack-12">
          <p>Login masih mock: tersimpan di localStorage, bukan server.</p>
          <Link className="lbtn solid" href="/login">
            <Sym name="key" size={16} /> Masuk
          </Link>
        </div>
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

      <div className="panel stack-10">
        <Link className="me-link" href="/library">
          <Sym name="download_done" size={18} />
          <span className="grow">Terpasang</span>
          <span className="me-count">{counts.installed}</span>
          <Sym name="chevron_right" size={17} />
        </Link>
        <Link className="me-link" href="/library">
          <Sym name="favorite" size={18} />
          <span className="grow">Wishlist</span>
          <span className="me-count">{counts.wish}</span>
          <Sym name="chevron_right" size={17} />
        </Link>
        <Link className="me-link" href="/trust">
          <Sym name="verified_user" size={18} />
          <span className="grow">Trust &amp; privasi</span>
          <Sym name="chevron_right" size={17} />
        </Link>
        <Link className="me-link" href="/legal">
          <Sym name="gavel" size={18} />
          <span className="grow">Lisensi XySANC-1.0</span>
          <Sym name="chevron_right" size={17} />
        </Link>
      </div>

      <p className="meta-line">
        Console dipisah dari toko — buka console.xyapps.my.id setelah DNS aktif.
      </p>

      <LoadingButton variant="ghost" onClick={logout}>
        <Sym name="logout" size={16} /> Keluar
      </LoadingButton>
    </div>
  );
}
