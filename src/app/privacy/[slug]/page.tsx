import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { APPS } from "@/lib/data";
import { Sym } from "@/components/Icon";

export function generateStaticParams() {
  return APPS.filter((a) => a.privacy).map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const app = APPS.find((a) => a.slug === slug && a.privacy);
  return { title: app ? `Kebijakan privasi — ${app.title}` : "Tidak ditemukan" };
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const app = APPS.find((a) => a.slug === slug && a.privacy);
  if (!app) notFound();
  return (
    <div className="wrap page-inner stack-16">
      <div className="profile-back">
        <Link href={`/apps/${app.slug}`} className="icon-btn" aria-label="Kembali">
          <Sym name="arrow_back" size={20} />
        </Link>
        <p className="profile-path">Kebijakan privasi · {app.title}</p>
      </div>
      <p className="kicker">Diterbitkan oleh {app.developer}</p>
      <h1 className="page-title">Kebijakan privasi</h1>
      <p className="sub">
        Berlaku untuk {app.title} ({app.version}).
      </p>
      <div className="panel stack-12">
        <div className="safety-list" style={{ borderTop: 0 }}>
          {app.dataSafety.map((s) => (
            <p key={s}>
              <Sym name="shield" size={16} fill /> {s}
            </p>
          ))}
        </div>
        <p className="meta-line">
          <Sym name="verified_user" size={14} /> Terakhir diperbarui {app.updated}
        </p>
      </div>
    </div>
  );
}
