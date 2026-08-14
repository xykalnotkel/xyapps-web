import type { Metadata } from "next";

export const metadata: Metadata = { title: "Trust" };

export default function TrustPage() {
  return (
    <div className="wrap page-inner stack-16">
      <p className="kicker">Trust</p>
      <h1 className="page-title">Yang kami simpan</h1>
      <div className="panel">
        <p>Katalog publik tidak berisi email, nomor WA, atau role orang lain.</p>
        <p>Origin GitHub / file berbayar tidak dikirim ke browser.</p>
        <p>Unduhan resmi hanya lewat dl.xyapps.my.id.</p>
        <p>Sekarang masih mock: session dan library cuma di localStorage.</p>
      </div>
    </div>
  );
}
