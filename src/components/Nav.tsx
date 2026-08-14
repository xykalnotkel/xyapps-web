"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { Sym } from "@/components/Icon";
import { useSession } from "@/components/Session";
import type { SymName } from "@/lib/symbols";

type Tab = {
  href: string;
  label: string;
  icon: SymName;
  match: (p: string) => boolean;
};

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
  {
    href: "/me",
    label: "Akun",
    icon: "account_circle",
    match: (p) => p === "/me" || p === "/login",
  },
];

export function TopBar() {
  const path = usePathname();
  const router = useRouter();
  const { user } = useSession();
  const [q, setQ] = useState("");
  const hideSearch = path.startsWith("/apps/") && path !== "/apps";

  if (hideSearch) return null;

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const t = q.trim();
    router.push(t ? `/apps?q=${encodeURIComponent(t)}` : "/apps");
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
        </form>
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
          <Link key={t.href} href={t.href} className={on ? "active" : ""} aria-current={on ? "page" : undefined}>
            <Sym name={t.icon} size={24} fill={on} />
            <span>{t.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
