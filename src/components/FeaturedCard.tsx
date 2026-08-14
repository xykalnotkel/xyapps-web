import Link from "next/link";
import { sourceLabel, type AppItem } from "@/lib/data";
import { SmartImage } from "./ui/SmartImage";

export function FeaturedCard({ app }: { app: AppItem }) {
  const badge = sourceLabel(app.sourceKind);
  return (
    <Link href={`/apps/${app.slug}`} className="feature-card">
      <SmartImage
        label={app.title}
        accent={app.accent}
        accent2={app.accent2}
        className="feature-art"
        rounded="xl"
      />
      <div className="feature-meta">
        <div
          className="glyph sm"
          style={{ background: `linear-gradient(160deg, ${app.accent}, #121218)` }}
        >
          {app.initials}
        </div>
        <div>
          <strong>{app.title}</strong>
          <em>
            {app.category} · {badge.text}
          </em>
        </div>
      </div>
    </Link>
  );
}
