import type { Metadata } from "next";

export const metadata: Metadata = { title: "Trust" };

export default function TrustPage() {
  return (
    <div className="wrap section">
      <p className="kicker">Trust</p>
      <h2>Yang kami simpan, yang tidak</h2>
      <p className="sub">Bagian dari produk — bukan afterthought.</p>
      <div className="panel">
        <p>Katalog publik tidak berisi email, nomor WA, atau role orang lain.</p>
        <p>Origin GitHub / file berbayar tidak dikirim ke browser.</p>
        <p>Unduhan resmi hanya lewat dl.xyapps.my.id.</p>
        <p>Sekarang masih mock: session cuma di localStorage browser kamu.</p>
      </div>
    </div>
  );
}
