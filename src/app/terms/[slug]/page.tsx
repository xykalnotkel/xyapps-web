import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { APPS } from "@/lib/data";
import { Sym } from "@/components/Icon";

export function generateStaticParams() {
  return APPS.filter((a) => a.tos).map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const app = APPS.find((a) => a.slug === slug && a.tos);
  return { title: app ? `Ketentuan layanan — ${app.title}` : "Tidak ditemukan" };
}

export default async function TermsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const app = APPS.find((a) => a.slug === slug && a.tos);
  if (!app) notFound();
  return (
    <div className="wrap page-inner stack-16">
      <div className="profile-back">
        <Link href={`/apps/${app.slug}`} className="icon-btn" aria-label="Kembali">
          <Sym name="arrow_back" size={20} />
        </Link>
        <p className="profile-path">Ketentuan layanan · {app.title}</p>
      </div>
      <p className="kicker">Diterbitkan oleh {app.developer}</p>
      <h1 className="page-title">Ketentuan layanan</h1>
      <p className="sub">
        Berlaku untuk {app.title} ({app.version}). Mock — template final
        disahkan setelah legal review.
      </p>
      <div className="panel stack-12">
        <p>
          Installer resmi hanya dibagikan lewat gerbang dl.xystudio.my.id
          dengan tiket bertanda tangan. Dilarang mendistribusikan ulang
          installer dari sumber lain.
        </p>
        <p>
          {app.sourceKind === "xysanc"
            ? `Source tersedia (XySANC-1.0): boleh dipakai dan dipelajari, dilarang dijual ulang.`
            : "Lisensi proprietary. Source tidak dibagikan tanpa kontrak."}
        </p>
        <p>
          Dengan menekan tombol Install, kamu menyetujui ketentuan ini dan
          EULA yang menyertainya.
        </p>
        <p className="meta-line">
          <Sym name="gavel" size={14} /> Terakhir diperbarui {app.updated}
        </p>
      </div>
    </div>
  );
}
