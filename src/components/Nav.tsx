"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Sym } from "@/components/Icon";
import { useSession } from "@/components/Session";
import type { SymName } from "@/lib/symbols";

type Tab = {
  href: string;
  label: string;
  icon: SymName;
  match: (p: string) => boolean;
};

/* Bawah: Beranda, Aplikasi, Game, Library — seperti Play Store.
   Akun di avatar kanan atas, pencarian di pill topbar (buka /search). */
const tabs: Tab[] = [
  { href: "/", label: "Beranda", icon: "home", match: (p) => p === "/" },
  {
    href: "/apps",
    label: "Aplikasi",
    icon: "apps",
    match: (p) => p.startsWith("/apps"),
  },
  {
    href: "/games",
    label: "Game",
    icon: "videogame_asset",
    match: (p) => p.startsWith("/games"),
  },
  {
    href: "/library",
    label: "Library",
    icon: "library_books",
    match: (p) => p.startsWith("/library"),
  },
];

export function TopBar() {
  const path = usePathname();
  const { user } = useSession();
  const [unread, setUnread] = useState(true);
  /* Halaman search punya input sendiri, pill disembunyikan di sana. */
  const hidePill = path === "/search";

  useEffect(() => {
    const id = window.setTimeout(() => {
      try {
        if (localStorage.getItem("xyapps.nread") === "1") setUnread(false);
      } catch {
        /* abaikan */
      }
    }, 0);
    return () => window.clearTimeout(id);
  }, []);

  return (
    <header className="topbar">
      <div className="wrap topbar-inner">
        <Link href="/" className="logo" aria-label="XyApps beranda">
          {/* Logo animasi XySpace (trace dari GIF wordmark) */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/gen/logo-xyapps.webp" alt="XyApps" className="logo-img" />
        </Link>
        {!hidePill && (
          <Link href="/search" className="search-pill" aria-label="Buka pencarian">
            <Sym name="search" size={17} />
            <span>Telusuri aplikasi dan game</span>
          </Link>
        )}
        <Link href="/notifications" className="bell-btn" aria-label="Notifikasi">
          <Sym name="notifications" size={21} />
          {unread && <span className="bell-dot" />}
        </Link>
        <Link href={user ? "/me" : "/login"} className="avatar" aria-label="Akun">
          {user ? user.name.slice(0, 1).toUpperCase() : "?"}
        </Link>
      </div>
    </header>
  );
}

export function BottomNav() {
  const path = usePathname();
  return (
    <nav className="bottom" aria-label="Navigasi utama">
      {tabs.map((t) => {
        const on = t.match(path);
        return (
          <Link
            key={t.href}
            href={t.href}
            className={on ? "active" : ""}
            aria-current={on ? "page" : undefined}
          >
            <span className="nav-item">
              <Sym name={t.icon} size={24} fill={on} />
              <span className="nav-label">{t.label}</span>
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
