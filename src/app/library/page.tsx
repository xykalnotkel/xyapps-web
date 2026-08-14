"use client";

import { useEffect, useState } from "react";
import { AppRow } from "@/components/AppRow";
import { ListSkeleton } from "@/components/ui/Skeleton";
import { APPS, getApp } from "@/lib/data";
import { readLibrary, type LibEntry } from "@/lib/library";

export default function LibraryPage() {
  const [ready, setReady] = useState(false);
  const [items, setItems] = useState<LibEntry[]>([]);

  useEffect(() => {
    setItems(readLibrary());
    const id = window.setTimeout(() => setReady(true), 360);
    return () => window.clearTimeout(id);
  }, []);

  const apps = items
    .map((x) => getApp(x.slug))
    .filter((x): x is NonNullable<typeof x> => Boolean(x));

  return (
    <div className="wrap stack-16 page-inner">
      <div>
        <h1 className="page-title">Library</h1>
        <p className="sub">App yang pernah kamu install di perangkat ini (mock localStorage).</p>
      </div>
      {!ready ? (
        <ListSkeleton />
      ) : apps.length === 0 ? (
        <div className="empty">
          Masih kosong. Install Northroom dari katalog untuk ngetes alur ini.
        </div>
      ) : (
        <div className="stack-8">
          {apps.map((app) => (
            <AppRow key={app.slug} app={app} />
          ))}
        </div>
      )}
      <p className="meta-line">{APPS.length} rilis di toko · library hanya milik perangkat ini</p>
    </div>
  );
}
