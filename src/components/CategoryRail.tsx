import Link from "next/link";
import { APPS } from "@/lib/data";
import { Sym } from "./Icon";
import type { SymName } from "@/lib/symbols";

const CATS: { name: string; icon: SymName; href: string }[] = [
  { name: "Aplikasi", icon: "apps", href: "/apps" },
  { name: "Game", icon: "videogame_asset", href: "/games" },
  { name: "Musik", icon: "music_note", href: "/apps?f=Musik" },
  { name: "Tools", icon: "tune", href: "/apps?f=Tools" },
  { name: "Produktivitas", icon: "edit_note", href: "/apps?f=Produktivitas" },
  { name: "Developer", icon: "terminal", href: "/apps?f=Developer" },
];

export function CategoryRail() {
  return (
    <div className="rail pad-left cat-rail">
      {CATS.map((c) => {
        const n =
          c.name === "Aplikasi"
            ? APPS.filter((a) => a.category !== "Game").length
            : c.name === "Game"
              ? APPS.filter((a) => a.category === "Game").length
              : APPS.filter((a) => a.category === c.name).length;
        return (
          <Link key={c.name} href={c.href} className="cat-card">
            <span className="cat-icon">
              <Sym name={c.icon} size={20} />
            </span>
            <strong>{c.name}</strong>
            <em>{n} item</em>
          </Link>
        );
      })}
    </div>
  );
}
