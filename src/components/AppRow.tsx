"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ctaLabel, sourceLabel, type AppItem } from "@/lib/data";
import { AppGlyph } from "./ui/SmartImage";

export function AppRow({ app }: { app: AppItem }) {
  const router = useRouter();
  const badge = sourceLabel(app.sourceKind);

  return (
    <div className="app-row">
      <Link href={`/apps/${app.slug}`} className="app-row-main">
        <AppGlyph initials={app.initials} accent={app.accent} />
        <span className="app-row-text">
          <strong>{app.title}</strong>
          <em>
            {app.developer} · {app.category}
          </em>
          <span className="app-row-meta">
            {app.platform} · {app.size} · {badge.text}
          </span>
        </span>
      </Link>
      <button
        type="button"
        className="row-cta"
        onClick={() => router.push(`/apps/${app.slug}`)}
      >
        {ctaLabel(app.sourceKind)}
      </button>
    </div>
  );
}
