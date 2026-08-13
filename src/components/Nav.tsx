"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "./Session";

const links = [
  { href: "/apps", label: "Katalog" },
  { href: "/legal", label: "Lisensi" },
  { href: "/trust", label: "Trust" },
  { href: "/console", label: "Console" },
];

export function Nav() {
  const path = usePathname();
  const { user } = useSession();

  return (
    <header className="topnav">
      <div className="wrap topnav-inner">
        <Link href="/" className="logo">
          <b>Xy</b>Apps
        </Link>
        <nav className="nav-links">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={path === l.href || path.startsWith(l.href + "/") ? "active" : ""}
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="nav-right">
          {user ? (
            <Link className="pill" href="/me">
              {user.name}
            </Link>
          ) : (
            <Link className="pill" href="/login">
              Masuk
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

export function BottomNav() {
  const path = usePathname();
  return (
    <nav className="bottom">
      <Link href="/" className={path === "/" ? "active" : ""}>
        Beranda
      </Link>
      <Link href="/apps" className={path.startsWith("/apps") ? "active" : ""}>
        Telusuri
      </Link>
      <Link href="/me" className={path === "/me" || path === "/login" ? "active" : ""}>
        Akun
      </Link>
    </nav>
  );
}
