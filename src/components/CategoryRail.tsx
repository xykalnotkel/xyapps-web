import Link from "next/link";
import { APPS } from "@/lib/data";

const CATS: { name: string; img: string; href: string }[] = [
  { name: "Aplikasi", img: "/gen/icons/cat-apps.png", href: "/apps" },
  { name: "Game", img: "/gen/icons/cat-game.png", href: "/games" },
  { name: "Musik", img: "/gen/icons/cat-music.png", href: "/apps?f=Musik" },
  { name: "Tools", img: "/gen/icons/cat-tools.png", href: "/apps?f=Tools" },
];

/** Rail kategori — icon AI generasi XySpace (PNG putih, filter tema). */
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
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={c.img} alt="" className="cat-img" draggable={false} />
            </span>
            <strong>{c.name}</strong>
            <em>{n} item</em>
          </Link>
        );
      })}
    </div>
  );
}
