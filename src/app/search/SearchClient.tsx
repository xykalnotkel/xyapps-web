"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { AppRow } from "@/components/AppRow";
import { ListSkeleton } from "@/components/ui/Skeleton";

import { Sym } from "@/components/Icon";
import { addRecent, clearRecent, readRecent } from "@/lib/recent";
import { APPS } from "@/lib/data";

const TRENDING = ["northroom", "game", "Kotlin", "arkade", "Rust", "Tauri"];

export function SearchClient() {
  const [q, setQ] = useState("");
  const [recent, setRecent] = useState<string[]>([]);
  const [ready, setReady] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Fokus otomatis seperti halaman search Play Store.
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Muat riwayat setelah hidrasi (async, lint-safe).
  useEffect(() => {
    const id = window.setTimeout(() => {
      setRecent(readRecent());
      setReady(true);
    }, 260);
    return () => window.clearTimeout(id);
  }, []);

  const results = useMemo(() => {
    const t = q.trim().toLowerCase();
    if (!t) return [];
    return APPS.filter((a) =>
      `${a.title} ${a.tagline} ${a.category} ${a.genre ?? ""} ${a.developer} ${a.stack.join(" ")}`
        .toLowerCase()
        .includes(t),
    );
  }, [q]);

  const topRated = useMemo(
    () => [...APPS].sort((a, b) => b.ratingCount - a.ratingCount).slice(0, 5),
    [],
  );

  function record(t: string) {
    if (!t.trim()) return;
    addRecent(t);
    setRecent(readRecent());
  }

  return (
    <div className="search-page">
      <div className="search-top">
        <Link href="/" className="icon-btn" aria-label="Kembali">
          <Sym name="arrow_back" size={21} />
        </Link>
        <div className="search-input">
          <Sym name="search" size={19} />
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") record(q);
            }}
            placeholder="Telusuri aplikasi dan game"
            aria-label="Telusuri aplikasi dan game"
          />
          {q && (
            <button
              type="button"
              className="search-clear"
              aria-label="Hapus pencarian"
              onClick={() => setQ("")}
            >
              <Sym name="close" size={16} />
            </button>
          )}
        </div>
      </div>

      {!ready ? (
        <ListSkeleton />
      ) : q ? (
        results.length === 0 ? (
          <div className="empty stack-10">
            <Sym name="search" size={28} />
            <p>Tidak ada hasil untuk “{q}”.</p>
            <p className="sub">Coba kata kunci lain atau hapus pencarian.</p>
          </div>
        ) : (
          <>
            <p className="search-count">
              {results.length} hasil untuk “{q}”
            </p>
            <div className="stack-10">
              {results.map((app) => (
                <AppRow key={app.slug} app={app} />
              ))}
            </div>
          </>
        )
      ) : (
        <>
          <div className="suggest-block">
            <p className="suggest-title">
              <Sym name="trending_up" size={15} /> Sedang dicari
            </p>
            <div className="chip-row">
              {TRENDING.map((name) => (
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
          <div>
            <div className="rail-head">
              <h2>Terpopuler di XyApps</h2>
            </div>
            <div className="stack-8">
              {topRated.map((app) => (
                <AppRow key={app.slug} app={app} />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
