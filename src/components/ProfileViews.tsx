import Link from "next/link";
import { notFound } from "next/navigation";
import { Sym } from "@/components/Icon";
import { Stars } from "@/components/ui/Stars";
import { AppGlyph } from "@/components/ui/SmartImage";
import { AppRow } from "@/components/AppRow";
import {
  APPS,
  getApp,
  getDeveloper,
  getDeveloperOfApp,
  getUserProfile,
  type AppItem,
} from "@/lib/data";

export function UserProfileView({ id }: { id: string }) {
  const u = getUserProfile(id);
  if (!u) notFound();

  const apps = u.apps
    .map((a) => ({ app: getApp(a.slug), rating: a.rating }))
    .filter((x): x is { app: AppItem; rating: number } => Boolean(x.app));

  return (
    <div className="wrap page-inner stack-16">
      <div className="profile-back">
        <Link href="/apps" className="icon-btn" aria-label="Kembali">
          <Sym name="arrow_back" size={20} />
        </Link>
        <p className="profile-path">Profil pengguna</p>
      </div>

      <div className="profile-head">
        <span
          className="profile-ava"
          style={{
            background: `linear-gradient(150deg, hsl(${u.hue} 60% 46%), hsl(${u.hue} 70% 22%))`,
          }}
        >
          {u.name.slice(0, 1).toUpperCase()}
        </span>
        <div>
          <h1 className="page-title">{u.name}</h1>
          <p className="sub">Anggota sejak {u.joined}</p>
        </div>
      </div>

      <div className="stats-grid profile-stats">
        <div className="stat">
          <Sym name="star_rate" size={18} className="stat-ic" />
          <strong>{u.reviews}</strong>
          <span>Ulasan ditulis</span>
        </div>
        <div className="stat">
          <Sym name="thumb_up" size={18} className="stat-ic" />
          <strong>{u.helpful}</strong>
          <span>Suara bermanfaat</span>
        </div>
        <div className="stat">
          <Sym name="apps" size={18} className="stat-ic" />
          <strong>{u.apps.length}</strong>
          <span>App diulas</span>
        </div>
      </div>

      <section>
        <h2 className="profile-sec">Ulasan aplikasi</h2>
        <div className="stack-8">
          {apps.map(({ app, rating }) => (
            <div key={app.slug} className="profile-app-row">
              <Link href={`/apps/${app.slug}`} className="profile-app-main">
                <AppGlyph
                  initials={app.initials}
                  accent={app.accent}
                  src={app.icon}
                  size={48}
                />
                <span className="grow">
                  <strong>{app.title}</strong>
                  <em>
                    {app.genre ?? app.category} · diberi {rating} bintang
                  </em>
                </span>
                <Stars value={rating} size={12} />
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export function DeveloperProfileView({ id }: { id: string }) {
  const dev = getDeveloper(id);
  if (!dev) notFound();

  const devApps = APPS.filter((a) => getDeveloperOfApp(a).id === dev.id);

  const totalReviews = devApps.reduce((n, a) => n + a.ratingCount, 0);
  const ratedApps = devApps.filter((a) => a.ratingCount > 0);
  const avg =
    ratedApps.length > 0
      ? ratedApps.reduce((n, a) => n + a.rating, 0) / ratedApps.length
      : 0;

  return (
    <div className="wrap page-inner stack-16">
      <div className="profile-back">
        <Link href="/apps" className="icon-btn" aria-label="Kembali">
          <Sym name="arrow_back" size={20} />
        </Link>
        <p className="profile-path">Profil developer</p>
      </div>

      {/* KOVER */}
      <div className="dev-cover">
        <span className="dev-cover-pattern" aria-hidden />
        <div className="dev-cover-inner">
          <span className="dev-logo lg">{dev.name.slice(0, 2).toUpperCase()}</span>
          <div className="grow">
            <h1 className="dev-name lg">
              {dev.name}
              {dev.verified && (
                <span className="dev-verify" title="Terverifikasi">
                  <Sym name="verified" size={19} fill />
                </span>
              )}
            </h1>
            <p className="dev-tagline">{dev.tagline}</p>
          </div>
        </div>
        <div className="dev-meta">
          {dev.location && (
            <span className="dev-meta-chip">
              <Sym name="map" size={14} /> {dev.location}
            </span>
          )}
          <span className="dev-meta-chip">
            <Sym name="schedule" size={14} /> Bergabung {dev.joined}
          </span>
          <span className="dev-meta-chip">
            <Sym name="apps" size={14} /> {devApps.length} aplikasi
          </span>
        </div>
      </div>

      {/* AKSI KONTAK */}
      <div className="dev-actions">
        {dev.website && (
          <a
            className="lbtn soft"
            href={`https://${dev.website}`}
            target="_blank"
            rel="noreferrer"
          >
            <Sym name="link" size={16} /> Situs web
          </a>
        )}
        <a className="lbtn ghost" href={`mailto:${dev.supportEmail}`}>
          <Sym name="mail" size={16} /> Email
        </a>
      </div>

      {/* STATS */}
      <div className="stats-grid dev-stats">
        <div className="stat">
          <Sym name="apps" size={20} className="stat-ic" />
          <strong>{devApps.length}</strong>
          <em>Aplikasi</em>
        </div>
        <div className="stat">
          <Sym name="star" size={20} fill={avg > 0} className={avg > 0 ? "stat-ic amber" : "stat-ic"} />
          <strong>{avg > 0 ? avg.toFixed(1) : "—"}</strong>
          <em>Rating rata-rata</em>
        </div>
        <div className="stat">
          <Sym name="reviews" size={20} className="stat-ic" />
          <strong>{totalReviews}</strong>
          <em>Total ulasan</em>
        </div>
      </div>

      {/* TENTANG */}
      <div className="panel stack-10">
        <h3>
          <Sym name="info" size={17} /> Tentang developer
        </h3>
        <p>{dev.bio}</p>
        <p className="dev-trust">
          <Sym name="shield" size={16} fill />
          Semua rilis melewati XyScan dan verifikasi signature sebelum tayang.
        </p>
      </div>

      {/* APLIKASI */}
      <section>
        <div className="rail-head">
          <h2>Aplikasi oleh developer ini</h2>
        </div>
        <div className="stack-8">
          {devApps.map((app) => (
            <AppRow key={app.slug} app={app} />
          ))}
        </div>
      </section>
    </div>
  );
}
