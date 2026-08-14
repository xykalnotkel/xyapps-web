"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useState, type FormEvent } from "react";
import { Sym } from "@/components/Icon";
import { useSession } from "@/components/Session";
import { addRecent } from "@/lib/recent";
import { APPS } from "@/lib/data";
import type { SymName } from "@/lib/symbols";

type Tab = {
  href: string;
  label: string;
  icon: SymName;
  match: (p: string) => boolean;
};

/* Bawah: Beranda, Telusuri, Library. Akun ada di avatar kanan atas,
   bukan dobel di dua tempat. */
const tabs: Tab[] = [
  { href: "/", label: "Beranda", icon: "home", match: (p) => p === "/" },
  {
    href: "/apps",
    label: "Telusuri",
    icon: "search",
    match: (p) => p.startsWith("/apps"),
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
  const router = useRouter();
  const { user } = useSession();
  const [q, setQ] = useState("");
  const [focus, setFocus] = useState(false);
  const [unread, setUnread] = useState(true);
  const hideSearch = path.startsWith("/apps/") && path !== "/apps";

  // Status lonceng: SSR selalu menampilkan titik (konsisten), setelah
  // hidrasi baca penanda "sudah dibaca" dari localStorage (async).
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

  const matches = useMemo(() => {
    const t = q.trim().toLowerCase();
    if (!t) return [];
    return APPS.filter((a) =>
      `${a.title} ${a.tagline} ${a.category} ${a.developer}`
        .toLowerCase()
        .includes(t),
    ).slice(0, 5);
  }, [q]);

  if (hideSearch) return null;

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const t = q.trim();
    if (!t) return;
    addRecent(t);
    router.push(`/apps?q=${encodeURIComponent(t)}`);
    setFocus(false);
  }

  function goDetail(slug: string) {
    addRecent(q.trim());
    setQ("");
    setFocus(false);
    router.push(`/apps/${slug}`);
  }

  return (
    <header className="topbar">
      <div className="wrap topbar-inner">
        <Link href="/" className="logo" aria-label="XyApps beranda">
          <b>Xy</b>Apps
        </Link>
        <form className="search-pill" onSubmit={onSubmit} role="search">
          <Sym name="search" size={17} />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onFocus={() => setFocus(true)}
            onBlur={() => window.setTimeout(() => setFocus(false), 150)}
            placeholder="Cari aplikasi"
            aria-label="Cari aplikasi"
          />
          {q && (
            <button
              type="button"
              className="search-clear"
              aria-label="Hapus pencarian"
              onClick={() => setQ("")}
            >
              <Sym name="close" size={15} />
            </button>
          )}
          {focus && matches.length > 0 && (
            <div className="search-pop">
              {matches.map((a) => (
                <button
                  key={a.slug}
                  type="button"
                  className="pop-item"
                  onClick={() => goDetail(a.slug)}
                >
                  <span
                    className="pop-glyph"
                    style={{
                      background: `linear-gradient(160deg, ${a.accent}, #121218)`,
                    }}
                  >
                    {a.icon ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={a.icon} alt="" className="glyph-pic" />
                    ) : (
                      a.initials
                    )}
                  </span>
                  <span className="pop-text">
                    <strong>{a.title}</strong>
                    <em>
                      {a.developer} · {a.category}
                    </em>
                  </span>
                </button>
              ))}
              <button
                type="button"
                className="pop-item pop-all"
                onClick={() => {
                  addRecent(q.trim());
                  setFocus(false);
                  router.push(`/apps?q=${encodeURIComponent(q.trim())}`);
                }}
              >
                <Sym name="search" size={15} />
                Lihat semua hasil untuk “{q.trim()}”
              </button>
            </div>
          )}
        </form>
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
