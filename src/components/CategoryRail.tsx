import Link from "next/link";
import { APPS } from "@/lib/data";
import { Sym } from "./Icon";
import type { SymName } from "@/lib/symbols";

const CATS: { name: string; icon: SymName }[] = [
  { name: "Musik", icon: "music_note" },
  { name: "Tools", icon: "tune" },
  { name: "Produktivitas", icon: "edit_note" },
  { name: "Developer", icon: "terminal" },
];

export function CategoryRail() {
  return (
    <div className="rail pad-left cat-rail">
      {CATS.map((c) => {
        const n = APPS.filter((a) => a.category === c.name).length;
        return (
          <Link
            key={c.name}
            href={`/apps?f=${encodeURIComponent(c.name)}`}
            className="cat-card"
          >
            <span className="cat-icon">
              <Sym name={c.icon} size={20} />
            </span>
            <strong>{c.name}</strong>
            <em>{n} app</em>
          </Link>
        );
      })}
    </div>
  );
}
