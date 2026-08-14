"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useMounted, useSession } from "@/components/Session";
import { useTheme, type Theme } from "@/components/Theme";
import { LoadingButton } from "@/components/ui/LoadingButton";
import { Toggle } from "@/components/ui/Toggle";
import { Sym } from "@/components/Icon";
import { readLibrary, readWishlist } from "@/lib/library";
import { readSettings, writeSettings, type Settings } from "@/lib/settings";

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
  const [settings, setSettings] = useState<Settings>(() => readSettings());

  // Muat setelah hidrasi supaya markup server dan klien identik.
  useEffect(() => {
    const id = window.setTimeout(() => {
      setCounts({ installed: readLibrary().length, wish: readWishlist().length });
    }, 0);
    return () => window.clearTimeout(id);
  }, []);

  function patch(p: Partial<Settings>) {
    setSettings((s) => {
      const next = { ...s, ...p };
      writeSettings(next);
      return next;
    });
  }

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
        <div className="me-guest">
          <span className="err-ic mute">
            <Sym name="account_circle" size={44} />
          </span>
          <h1 className="page-title">Akun</h1>
          <p className="sub">
            Belum masuk. Browsing katalog tidak wajib login — login cuma untuk
            library, wishlist, dan ulasan di perangkat ini.
          </p>
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
        <button
          type="button"
          className="icon-btn"
          aria-label="Ubah profil"
          title="Ubah profil masih mock"
        >
          <Sym name="edit" size={17} />
        </button>
      </div>

      <div className="panel stack-10">
        <Link className="me-link" href="/library">
          <span className="me-ic ok">
            <Sym name="download_done" size={18} />
          </span>
          <span className="grow">Terpasang</span>
          <span className="me-count">{counts.installed}</span>
          <Sym name="chevron_right" size={17} />
        </Link>
        <Link className="me-link" href="/library">
          <span className="me-ic lilac">
            <Sym name="favorite" size={18} />
          </span>
          <span className="grow">Wishlist</span>
          <span className="me-count">{counts.wish}</span>
          <Sym name="chevron_right" size={17} />
        </Link>
        <Link className="me-link" href="/notifications">
          <span className="me-ic indigo">
            <Sym name="notifications" size={18} />
          </span>
          <span className="grow">Notifikasi</span>
          <Sym name="chevron_right" size={17} />
        </Link>
      </div>

      <div className="panel stack-14">
        <h3>
          <Sym name="settings" size={17} /> Pengaturan
        </h3>
        <div className="set-row">
          <span className="grow">
            <strong>Notifikasi unduhan</strong>
            <em>Beri tahu saat unduhan selesai</em>
          </span>
          <Toggle
            on={settings.notifDownload}
            onChange={(v) => patch({ notifDownload: v })}
            label="Notifikasi unduhan"
          />
        </div>
        <div className="set-row">
          <span className="grow">
            <strong>Notifikasi update</strong>
            <em>Beri tahu saat versi baru rilis</em>
          </span>
          <Toggle
            on={settings.notifUpdate}
            onChange={(v) => patch({ notifUpdate: v })}
            label="Notifikasi update"
          />
        </div>
        <div className="set-row">
          <span className="grow">
            <strong>Perbarui otomatis</strong>
            <em>Pasang update tanpa konfirmasi (mock)</em>
          </span>
          <Toggle
            on={settings.autoUpdate}
            onChange={(v) => patch({ autoUpdate: v })}
            label="Perbarui otomatis"
          />
        </div>
      </div>

      <div className="panel stack-12">
        <h3>
          <Sym name="palette" size={17} /> Preferensi
        </h3>
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

      <div className="panel stack-10">
        <Link className="me-link" href="/trust">
          <span className="me-ic ok">
            <Sym name="verified_user" size={18} />
          </span>
          <span className="grow">Trust &amp; privasi</span>
          <Sym name="chevron_right" size={17} />
        </Link>
        <Link className="me-link" href="/legal">
          <span className="me-ic lilac">
            <Sym name="gavel" size={18} />
          </span>
          <span className="grow">Lisensi XySANC-1.0</span>
          <Sym name="chevron_right" size={17} />
        </Link>
        <Link className="me-link" href="/help" >
          <span className="me-ic indigo">
            <Sym name="support_agent" size={18} />
          </span>
          <span className="grow">Bantuan</span>
          <Sym name="chevron_right" size={17} />
        </Link>
      </div>

      <p className="meta-line">
        XyApps v0.1.0 · mock. Console dipisah — console.xyapps.my.id setelah DNS
        aktif.
      </p>

      <LoadingButton variant="ghost" onClick={logout}>
        <Sym name="logout" size={16} /> Keluar
      </LoadingButton>
    </div>
  );
}
