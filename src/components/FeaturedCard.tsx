import Link from "next/link";
import { sourceLabel, type AppItem } from "@/lib/data";
import { AppGlyph, SmartImage } from "./ui/SmartImage";
import { Stars } from "./ui/Stars";

export function FeaturedCard({ app }: { app: AppItem }) {
  const badge = sourceLabel(app.sourceKind);
  const art = app.screenshots[0];
  return (
    <Link href={`/apps/${app.slug}`} className="feature-card">
      <SmartImage
        src={art?.src}
        label={app.title}
        accent={app.accent}
        accent2={app.accent2}
        className="feature-art"
        rounded="xl"
      />
      <div className="feature-meta">
        <AppGlyph
          initials={app.initials}
          accent={app.accent}
          src={app.icon}
          size={36}
        />
        <div>
          <strong>{app.title}</strong>
          <em>
            {app.category} · {badge.text}
          </em>
          {app.ratingCount > 0 && (
            <em className="feature-rate">
              <Stars value={app.rating} size={11} /> {app.rating.toFixed(1)}
              <span className="sep">·</span>
              {app.installs}
            </em>
          )}
        </div>
      </div>
    </Link>
  );
}
