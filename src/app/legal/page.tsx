import type { Metadata } from "next";
import { Sym } from "@/components/Icon";

export const metadata: Metadata = { title: "Lisensi XySANC-1.0" };

export default function LegalPage() {
  return (
    <div className="wrap page-inner stack-16">
      <p className="kicker">Legal</p>
      <h1 className="page-title">XySANC-1.0</h1>
      <p className="sub">
        Source-available, non-commercial. Bukan MIT — MIT boleh dijual, ini tidak.
      </p>

      <div className="legal-grid">
        <div className="panel legal-card ok">
          <span className="legal-ic">
            <Sym name="check_circle" size={22} fill />
          </span>
          <h3>Boleh</h3>
          <ul>
            <li>Pakai dan jalanin sendiri</li>
            <li>Pelajari dan ubah source</li>
            <li>Bagikan gratis beserta lisensi ini</li>
          </ul>
        </div>

        <div className="panel legal-card danger">
          <span className="legal-ic">
            <Sym name="block" size={22} />
          </span>
          <h3>Dilarang</h3>
          <ul>
            <li>Menjual source atau binary</li>
            <li>Paywall atau white-label</li>
            <li>Distribusi di toko pihak ketiga tanpa kontrak XySpace</li>
          </ul>
        </div>

        <div className="panel legal-card warn">
          <span className="legal-ic">
            <Sym name="shield" size={22} />
          </span>
          <h3>Merek</h3>
          <ul>
            <li>Nama XySpace dan XyApps tidak ikut terlisensi</li>
            <li>Logo tidak boleh dipakai tanpa izin tertulis</li>
          </ul>
        </div>

        <div className="panel legal-card mute">
          <span className="legal-ic">
            <Sym name="gavel" size={22} />
          </span>
          <h3>Hukum</h3>
          <ul>
            <li>Berlaku hukum Indonesia, UU 28/2014 tentang Hak Cipta</li>
            <li>Pelanggaran diselesaikan perdata</li>
            <li>Ini bukan nasihat hukum — template final disahkan pengacara</li>
          </ul>
        </div>
      </div>

      <div className="panel stack-12">
        <p className="sub">
          <Sym name="info" size={16} /> Perbedaan penting
        </p>
        <p>
          Lisensi repo toko ini menyusul ditentukan. Lisensi di halaman ini
          berlaku untuk <strong>aplikasi yang dibagikan lewat XyApps</strong> —
          installer resmi hanya lewat gerbang unduh resmi, bukan tautan
          mentah dari sumber lain.
        </p>
        <p className="meta-line">
          <Sym name="history" size={14} /> XySANC-1.0 · diperbarui 2026-08-11
        </p>
      </div>
    </div>
  );
}
