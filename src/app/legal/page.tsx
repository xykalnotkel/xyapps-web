import type { Metadata } from "next";

export const metadata: Metadata = { title: "Lisensi XySANC-1.0" };

export default function LegalPage() {
  return (
    <div className="wrap section">
      <p className="kicker">Legal</p>
      <h2>XySANC-1.0</h2>
      <p className="sub">
        Ringkasan di UI. Teks penuh tetap di file lisensi. Bukan MIT — MIT boleh dijual.
      </p>
      <div className="panel">
        <h3>Boleh</h3>
        <p>Pakai, pelajari, ubah, jalanin sendiri, bagi gratis beserta lisensi ini.</p>
        <h3 style={{ marginTop: 12 }}>Tidak boleh</h3>
        <p>
          Menjual source atau binary, paywall, white-label, toko pihak ketiga — tanpa kontrak
          XyStudio.
        </p>
        <h3 style={{ marginTop: 12 }}>Merek</h3>
        <p>Nama XyStudio / XyApps tidak ikut terlisensi.</p>
        <h3 style={{ marginTop: 12 }}>Hukum</h3>
        <p>Indonesia · UU 28/2014. Pelanggaran = perdata. Pidana tidak diobral di hero.</p>
      </div>
    </div>
  );
}
