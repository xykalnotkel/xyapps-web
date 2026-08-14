"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { AppRow } from "@/components/AppRow";
import { ListSkeleton } from "@/components/ui/Skeleton";
import { useMockLoad } from "@/hooks/useMockLoad";
import { APPS } from "@/lib/data";

const FILTERS = ["Semua", "Android", "Web", "Desktop", "XySANC", "Berbayar", "Demo"] as const;

export function CatalogClient() {
  const params = useSearchParams();
  const preset = params.get("f");
  const [q, setQ] = useState("");
  const [f, setF] = useState<string>(preset && preset !== "Untukmu" ? preset : "Semua");
  const ready = useMockLoad(520);

  const list = useMemo(() => {
    return APPS.filter((a) => {
      const text = `${a.title} ${a.tagline} ${a.category} ${a.stack.join(" ")}`.toLowerCase();
      if (q && !text.includes(q.toLowerCase())) return false;
      if (f === "Android" || f === "Web" || f === "Desktop") return a.platform === f;
      if (f === "XySANC") return a.sourceKind === "xysanc";
      if (f === "Berbayar") return a.sourceKind === "paid";
      if (f === "Demo") return a.sourceKind === "none";
      if (f === "Tools" || f === "Musik") return a.category === f;
      return true;
    });
  }, [q, f]);

  return (
    <>
      <input
        className="search-field"
        placeholder="Cari aplikasi, stack, kategori"
        value={q}
        onChange={(e) => setQ(e.target.value)}
      />
      <div className="chip-row">
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
      {!ready ? (
        <ListSkeleton />
      ) : list.length === 0 ? (
        <div className="empty">Tidak ada yang cocok. Coba hapus filter atau kata kunci.</div>
      ) : (
        <div className="stack-8">
          {list.map((app) => (
            <AppRow key={app.slug} app={app} />
          ))}
        </div>
      )}
    </>
  );
}
