import Link from "next/link";
import { sourceLabel, type AppItem } from "@/lib/data";

export function AppCard({ app }: { app: AppItem }) {
  const badge = sourceLabel(app.sourceKind);
  return (
    <Link className="card" href={`/apps/${app.slug}`}>
      <div className="card-top">
        <div className="ico" style={{ color: app.accent }}>
          {app.initials}
        </div>
        <span className={`badge ${badge.tone}`}>{badge.text}</span>
      </div>
      <h3>{app.title}</h3>
      <p>{app.tagline}</p>
      <span className="meta">
        {app.platform} · {app.stack[0]}
      </span>
    </Link>
  );
}
