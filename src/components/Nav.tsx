"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bookmark,
  Grid2x2,
  House,
  Search,
  UserRound,
} from "lucide-react";
import { useSession } from "./Session";

const tabs = [
  { href: "/", label: "Beranda", icon: House, match: (p: string) => p === "/" },
  {
    href: "/apps",
    label: "Telusuri",
    icon: Search,
    match: (p: string) => p.startsWith("/apps"),
  },
  {
    href: "/library",
    label: "Library",
    icon: Bookmark,
    match: (p: string) => p.startsWith("/library"),
  },
  {
    href: "/console",
    label: "Console",
    icon: Grid2x2,
    match: (p: string) => p.startsWith("/console"),
  },
  {
    href: "/me",
    label: "Akun",
    icon: UserRound,
    match: (p: string) => p === "/me" || p === "/login",
  },
];

export function TopBar() {
  const path = usePathname();
  const { user } = useSession();
  const hideSearch = path.startsWith("/apps/") && path !== "/apps";

  if (hideSearch) return null;

  return (
    <header className="topbar">
      <div className="wrap topbar-inner">
        <Link href="/" className="logo">
          <b>Xy</b>Apps
        </Link>
        <Link href="/apps" className="search-pill" aria-label="Cari aplikasi">
          <Search size={16} strokeWidth={2} />
          <span>Cari aplikasi</span>
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
    <nav className="bottom" aria-label="Utama">
      {tabs.map((t) => {
        const Icon = t.icon;
        const on = t.match(path);
        return (
          <Link key={t.href} href={t.href} className={on ? "active" : ""}>
            <Icon size={20} strokeWidth={on ? 2.4 : 1.8} />
            <span>{t.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
