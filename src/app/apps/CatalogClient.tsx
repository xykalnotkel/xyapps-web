"use client";

import { useMemo, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { AppRow } from "@/components/AppRow";
import { ListSkeleton } from "@/components/ui/Skeleton";
import { useMockLoad } from "@/hooks/useMockLoad";
import { Sym } from "@/components/Icon";
import { addRecent, clearRecent, readRecent } from "@/lib/recent";
import { APPS } from "@/lib/data";

const FILTERS = [
  "Semua",
  "Android",
  "Web",
  "Desktop",
  "XySANC",
  "Berbayar",
  "Demo",
  "Musik",
  "Produktivitas",
  "Tools",
  "Developer",
] as const;

const POPULAR = ["northroom", "Musik", "Kotlin", "Tools", "Rust", "Tauri"];

type Sort = "pop" | "new";

export function CatalogClient() {
  const params = useSearchParams();
  const preset = params.get("f");
  const presetQ = params.get("q") ?? "";
  const [q, setQ] = useState(presetQ);
  const [f, setF] = useState<string>(preset && preset !== "Untukmu" ? preset : "Semua");
  const [sort, setSort] = useState<Sort>("pop");
  const [recent, setRecent] = useState<string[]>([]);
  const ready = useMockLoad(520);

  // Muat riwayat setelah hidrasi supaya markup server dan klien identik.
  useEffect(() => {
    const id = window.setTimeout(() => setRecent(readRecent()), 0);
    return () => window.clearTimeout(id);
  }, []);

  const list = useMemo(() => {
    const filtered = APPS.filter((a) => {
      const text = `${a.title} ${a.tagline} ${a.category} ${a.stack.join(" ")}`.toLowerCase();
      if (q && !text.includes(q.toLowerCase())) return false;
      if (f === "Android" || f === "Web" || f === "Desktop") return a.platform === f;
      if (f === "XySANC") return a.sourceKind === "xysanc";
      if (f === "Berbayar") return a.sourceKind === "paid";
      if (f === "Demo") return a.sourceKind === "none";
      if (f === "Musik" || f === "Produktivitas" || f === "Tools" || f === "Developer")
        return a.category === f;
      return true;
    });
    return filtered.sort((a, b) =>
      sort === "new"
        ? b.sortDate.localeCompare(a.sortDate)
        : b.ratingCount - a.ratingCount,
    );
  }, [q, f, sort]);

  return (
    <>
      <input
        className="search-field"
        placeholder="Cari aplikasi, stack, kategori"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && q.trim()) {
            addRecent(q);
            setRecent(readRecent());
          }
        }}
        onBlur={() => setRecent(readRecent())}
      />
      {!q && (
        <div className="suggest-block">
          <p className="suggest-title">
            <Sym name="trending_up" size={15} /> Populer dicari
          </p>
          <div className="chip-row">
            {POPULAR.map((name) => (
              <button
                key={name}
                className="chip suggest"
                onClick={() => setQ(name)}
                type="button"
              >
                {name}
              </button>
            ))}
          </div>
          {recent.length > 0 && (
            <>
              <p className="suggest-title">
                <Sym name="history" size={15} /> Terakhir dicari
                <button
                  type="button"
                  className="text-btn"
                  onClick={() => {
                    clearRecent();
                    setRecent([]);
                  }}
                >
                  Hapus
                </button>
              </p>
              <div className="chip-row">
                {recent.map((name) => (
                  <button
                    key={name}
                    className="chip suggest"
                    onClick={() => setQ(name)}
                    type="button"
                  >
                    {name}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      )}
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
      <div className="list-meta">
        <span>{ready ? `${list.length} hasil` : "Memuat…"}</span>
        <button
          type="button"
          className="sort-btn"
          onClick={() => setSort(sort === "pop" ? "new" : "pop")}
        >
          <Sym name="sort" size={15} />
          {sort === "pop" ? "Terpopuler" : "Terbaru"}
        </button>
      </div>
      {!ready ? (
        <ListSkeleton />
      ) : list.length === 0 ? (
        <div className="empty stack-10">
          <Sym name="search" size={26} />
          <p>Tidak ada yang cocok dengan “{q}”.</p>
          <button
            type="button"
            className="lbtn soft"
            onClick={() => {
              setQ("");
              setF("Semua");
            }}
          >
            Reset pencarian
          </button>
        </div>
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
