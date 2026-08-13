import Link from "next/link";
import { AppCard } from "@/components/AppCard";
import { APPS } from "@/lib/data";

export default function HomePage() {
  return (
    <div className="wrap">
      <section className="hero">
        <div>
          <p className="kicker">XyStudio · xyapps.my.id</p>
          <h1>
            Hitam doff.
            <br />
            Ungu logam.
          </h1>
          <p className="lede">
            Toko resmi XyStudio. Source gratis boleh dipakai — dilarang dijual.
            Install lewat gerbang, bukan tautan GitHub mentah.
          </p>
          <div className="hero-actions">
            <Link className="btn solid" href="/apps">
              Buka katalog
            </Link>
            <Link className="btn ghost" href="/legal">
              Baca XySANC
            </Link>
          </div>
        </div>
        <aside className="plate">
          <div className="mono">Xy</div>
          <small>Next.js · siap Vercel</small>
        </aside>
      </section>

      <section className="section">
        <h2>Cara kerjanya</h2>
        <p className="sub">Tiga langkah. Tidak ada bintang palsu.</p>
        <div className="steps">
          <article className="step">
            <em>01</em>
            <h3>Lihat</h3>
            <p>Katalog publik tanpa login. Badge jujur: XySANC, berbayar, atau demo.</p>
          </article>
          <article className="step">
            <em>02</em>
            <h3>Install resmi</h3>
            <p>Tombol membuat tiket dl.xyapps.my.id — origin GitHub tidak tampil.</p>
          </article>
          <article className="step">
            <em>03</em>
            <h3>Pakai, jangan jual</h3>
            <p>Source gratis = XySANC-1.0. Yang berbayar terkunci sampai ada kontrak.</p>
          </article>
        </div>
      </section>

      <section className="section">
        <h2>Unggulan</h2>
        <p className="sub">Data mock. Nanti diganti query server.</p>
        <div className="grid">
          {APPS.slice(0, 3).map((app) => (
            <AppCard key={app.slug} app={app} />
          ))}
        </div>
      </section>

      <footer className="site-foot">
        <span>© XyStudio</span>
        <span>xystudio.my.id · xyapps.my.id</span>
      </footer>
    </div>
  );
}
