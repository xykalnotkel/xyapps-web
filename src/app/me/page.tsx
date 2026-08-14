"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useMounted, useSession } from "@/components/Session";
import { useTheme, type Theme } from "@/components/Theme";
import { LoadingButton } from "@/components/ui/LoadingButton";
import { Sym } from "@/components/Icon";
import { readLibrary, readWishlist } from "@/lib/library";

const THEME_OPTIONS: { id: Theme; label: string; icon: "contrast" | "light_mode" | "dark_mode" }[] = [
  { id: "system", label: "Sistem", icon: "contrast" },
  { id: "light", label: "Terang", icon: "light_mode" },
  { id: "dark", label: "Gelap", icon: "dark_mode" },
];

export default function MePage() {
  const { user, logout } = useSession();
  const { theme, setTheme } = useTheme();
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

      <div className="panel stack-12">
        <h3>Preferensi</h3>
        <p className="sub">Tema</p>
        <div className="theme-ctrl" role="radiogroup" aria-label="Pilih tema">
          {THEME_OPTIONS.map((o) => (
            <button
              key={o.id}
              type="button"
              role="radio"
              aria-checked={theme === o.id}
              className={theme === o.id ? "on" : ""}
              onClick={() => setTheme(o.id)}
            >
              <Sym name={o.icon} size={17} />
              {o.label}
            </button>
          ))}
        </div>
        <p className="meta-line">
          Default mengikuti sistem. Pilihan tersimpan di perangkat ini.
        </p>
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
