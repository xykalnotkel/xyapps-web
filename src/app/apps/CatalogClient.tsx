"use client";

import { useMemo, useState } from "react";
import { AppCard } from "@/components/AppCard";
import { APPS } from "@/lib/data";

const FILTERS = [
  "Semua",
  "Android",
  "Web",
  "Desktop",
  "XySANC",
  "Berbayar",
  "Demo",
] as const;

export function CatalogClient() {
  const [q, setQ] = useState("");
  const [f, setF] = useState<(typeof FILTERS)[number]>("Semua");

  const list = useMemo(() => {
    return APPS.filter((a) => {
      const text = `${a.title} ${a.tagline} ${a.stack.join(" ")}`.toLowerCase();
      if (q && !text.includes(q.toLowerCase())) return false;
      if (f === "Android" || f === "Web" || f === "Desktop") return a.platform === f;
      if (f === "XySANC") return a.sourceKind === "xysanc";
      if (f === "Berbayar") return a.sourceKind === "paid";
      if (f === "Demo") return a.sourceKind === "none";
      return true;
    });
  }, [q, f]);

  return (
    <>
      <div className="toolbar">
        <input
          className="search"
          placeholder="Cari judul atau stack…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <div className="filters">
          {FILTERS.map((name) => (
            <button
              key={name}
              className={`chip ${f === name ? "on" : ""}`}
              onClick={() => setF(name)}
              type="button"
            >
              {name}
            </button>
          ))}
        </div>
      </div>
      {list.length === 0 ? (
        <div className="empty">Tidak ada yang cocok. Coba hapus filter atau kata kunci.</div>
      ) : (
        <div className="grid">
          {list.map((app) => (
            <AppCard key={app.slug} app={app} />
          ))}
        </div>
      )}
    </>
  );
}
