"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AppRow } from "@/components/AppRow";
import { ListSkeleton } from "@/components/ui/Skeleton";
import { Sym } from "@/components/Icon";
import { getApp, type AppItem } from "@/lib/data";
import {
  readLibrary,
  readWishlist,
  toggleWishlist,
  type LibEntry,
} from "@/lib/library";

type Tab = "installed" | "wishlist";

export default function LibraryPage() {
  const [ready, setReady] = useState(false);
  const [tab, setTab] = useState<Tab>("installed");
  const [installed, setInstalled] = useState<LibEntry[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);

  // Muat setelah hidrasi supaya markup server dan klien identik.
  useEffect(() => {
    const id = window.setTimeout(() => {
      setInstalled(readLibrary());
      setWishlist(readWishlist());
      setReady(true);
    }, 360);
    return () => window.clearTimeout(id);
  }, []);

  const installedApps = installed
    .map((x) => getApp(x.slug))
    .filter((x): x is AppItem => Boolean(x));

  const wishApps = wishlist
    .map((slug) => getApp(slug))
    .filter((x): x is AppItem => Boolean(x));

  function removeWish(slug: string) {
    toggleWishlist(slug);
    setWishlist(readWishlist());
  }

  return (
    <div className="wrap stack-16 page-inner">
      <div>
        <h1 className="page-title">Library</h1>
        <p className="sub">
          Terpasang dan wishlist di perangkat ini.
        </p>
      </div>

      <div className="tabs" role="tablist">
        <button
          type="button"
          role="tab"
          aria-selected={tab === "installed"}
          className={tab === "installed" ? "on" : ""}
          onClick={() => setTab("installed")}
        >
          <Sym name="download_done" size={17} fill={tab === "installed"} />
          Terpasang
          {installedApps.length > 0 && <span className="tab-count">{installedApps.length}</span>}
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={tab === "wishlist"}
          className={tab === "wishlist" ? "on" : ""}
          onClick={() => setTab("wishlist")}
        >
          <Sym name="favorite" size={17} fill={tab === "wishlist"} />
          Wishlist
          {wishApps.length > 0 && <span className="tab-count">{wishApps.length}</span>}
        </button>
      </div>

      {!ready ? (
        <ListSkeleton />
      ) : tab === "installed" ? (
        installedApps.length === 0 ? (
          <div className="empty stack-10">
            <Sym name="download" size={26} />
            <p>Belum ada yang terpasang.</p>
            <Link className="lbtn soft" href="/apps">
              Jelajahi katalog
            </Link>
          </div>
        ) : (
          <div className="stack-8">
            {installedApps.map((app) => (
              <AppRow key={app.slug} app={app} />
            ))}
          </div>
        )
      ) : wishApps.length === 0 ? (
        <div className="empty stack-10">
          <Sym name="favorite" size={26} />
          <p>Wishlist kosong.</p>
          <p className="sub">
            Ketuk ikon hati di halaman detail untuk menyimpan app.
          </p>
        </div>
      ) : (
        <div className="stack-8">
          {wishApps.map((app) => (
            <div key={app.slug} className="app-row">
              <AppRow app={app} />
              <button
                type="button"
                className="icon-btn wish-x"
                aria-label={`Hapus ${app.title} dari wishlist`}
                onClick={() => removeWish(app.slug)}
              >
                <Sym name="close" size={16} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
