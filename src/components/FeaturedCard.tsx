import Link from "next/link";
import { fmtCount, sourceLabel, type AppItem } from "@/lib/data";
import { SmartImage } from "./ui/SmartImage";
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
        <span
          className="glyph sm"
          style={{ background: `linear-gradient(160deg, ${app.accent}, #121218)` }}
        >
          {app.icon ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={app.icon} alt="" className="glyph-pic" />
          ) : (
            app.initials
          )}
        </span>
        <div>
          <strong>{app.title}</strong>
          <em>
            {app.category} · {badge.text}
          </em>
          {app.ratingCount > 0 && (
            <em className="feature-rate">
              <Stars value={app.rating} size={11} /> {app.rating.toFixed(1)} (
              {fmtCount(app.ratingCount)})
            </em>
          )}
        </div>
      </div>
    </Link>
  );
}
