import type { Metadata } from "next";

export const metadata: Metadata = { title: "Lisensi XySANC-1.0" };

export default function LegalPage() {
  return (
    <div className="wrap page-inner stack-16">
      <p className="kicker">Legal</p>
      <h1 className="page-title">XySANC-1.0</h1>
      <p className="sub">Bukan MIT. MIT boleh dijual. Ini source-available, dilarang dijual.</p>
      <div className="panel">
        <h3>Boleh</h3>
        <p>Pakai, pelajari, ubah, jalanin sendiri, bagi gratis beserta lisensi ini.</p>
        <h3>Tidak boleh</h3>
        <p>Menjual source atau binary, paywall, white-label, toko pihak ketiga tanpa kontrak XyStudio.</p>
        <h3>Merek</h3>
        <p>Nama XyStudio / XyApps tidak ikut terlisensi.</p>
        <h3>Hukum</h3>
        <p>Indonesia · UU 28/2014. Pelanggaran = perdata. Pidana tidak diobral di hero.</p>
      </div>
    </div>
  );
}
