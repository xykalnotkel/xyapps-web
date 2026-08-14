"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ctaLabel, fmtCount, type AppItem } from "@/lib/data";
import { AppGlyph } from "./ui/SmartImage";
import { Stars } from "./ui/Stars";
import { Sym } from "./Icon";

export function AppRow({ app }: { app: AppItem }) {
  const router = useRouter();
  const rated = app.ratingCount > 0;

  return (
    <div className="app-row">
      <Link href={`/apps/${app.slug}`} className="app-row-main">
        <AppGlyph initials={app.initials} accent={app.accent} src={app.icon} />
        <span className="app-row-text">
          <strong>{app.title}</strong>
          <em>
            {app.developer} · {app.category}
          </em>
          <span className="app-row-meta">
            {rated ? (
              <>
                <Stars value={app.rating} size={12} />
                <b>{app.rating.toFixed(1)}</b>
                <span className="sep">·</span>
                <span>{fmtCount(app.ratingCount)} ulasan</span>
              </>
            ) : (
              "Belum dinilai"
            )}
            <span className="sep">·</span>
            <span>{app.size}</span>
            {app.containsAds && (
              <>
                <span className="sep">·</span>
                <span>Ada iklan</span>
              </>
            )}
          </span>
        </span>
      </Link>
      <button
        type="button"
        className={`row-cta ${app.sourceKind === "paid" ? "locked" : ""}`}
        onClick={() => router.push(`/apps/${app.slug}`)}
      >
        {app.sourceKind === "paid" && <Sym name="lock" size={13} />}
        {ctaLabel(app.sourceKind)}
      </button>
    </div>
  );
}
