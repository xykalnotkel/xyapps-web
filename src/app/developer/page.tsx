import type { Metadata } from "next";
import Link from "next/link";
import { Sym } from "@/components/Icon";

export const metadata: Metadata = { title: "Program Developer" };

const BENEFITS = [
  {
    icon: "verified" as const,
    title: "Lisensi developer resmi",
    text: "Developer terdaftar mendapat lisensi resmi dari XySpace dan badge terverifikasi di semua listing — pembeli tahu kamu bukan akun siluman.",
  },
  {
    icon: "shield" as const,
    title: "XyScan otomatis",
    text: "Setiap rilis di-scan otomatis sebelum tayang: hash malware, verifikasi signature, izin berbahaya. Bersih = auto-publish tanpa antrean manusia.",
  },
  {
    icon: "groups" as const,
    title: "Anggota tim XySpace",
    text: "Developer resmi otomatis terdaftar sebagai bagian tim XySpace: akses ruang developer, changelog internal, dan kanal langsung ke tim inti.",
  },
  {
    icon: "account_balance_wallet" as const,
    title: "Bagi hasil yang adil",
    text: "Untuk app berbayar: 85% penjualan masuk ke developer, 15% biaya platform. Transparan, laporan bisa dilihat di console.",
  },
  {
    icon: "rocket_launch" as const,
    title: "Distribusi resmi",
    text: "File kamu disimpan dan didistribusikan lewat gerbang XyApps — tidak numpang di repo pribadi, URL asal tidak pernah bocor.",
  },
  {
    icon: "star_rate" as const,
    title: "Penempatan pilihan",
    text: "App dengan rating bagus dan rilis rutin masuk rak 'Pilihan XySpace' di beranda tanpa biaya.",
  },
  {
    icon: "support_agent" as const,
    title: "Dukungan prioritas",
    text: "Kanal langsung ke tim XySpace untuk masalah rilis, review, dan pembayaran — bukan form antrean.",
  },
  {
    icon: "trending_up" as const,
    title: "Statistik rilis",
    text: "Unduhan, rating, dan status scan tiap rilis terlihat dari console developer.",
  },
];

const FLOW = [
  { icon: "person_add" as const, title: "Daftar", text: "Ajukan akun developer dari console." },
  { icon: "verified" as const, title: "Verifikasi", text: "Identitas dan hak karya dicek tim XySpace." },
  { icon: "license" as const, title: "Lisensi", text: "Terima lisensi resmi + masuk tim XySpace." },
  { icon: "upload" as const, title: "Upload", text: "Kirim AAB/APK via console atau CI (webhook)." },
  { icon: "shield" as const, title: "XyScan", text: "Scan otomatis: bersih = langsung tayang." },
  { icon: "check_circle" as const, title: "Tayang", text: "App muncul di katalog dengan badge terverifikasi." },
];

export default function DeveloperPage() {
  return (
    <div className="wrap page-inner stack-16">
      <p className="kicker">Program Developer XySpace</p>
      <h1 className="page-title">Bangun, scan, tayang.</h1>
      <p className="sub">
        Developer resmi mendapat lisensi dari XySpace, otomatis menjadi bagian
        tim XySpace, dan setiap rilisnya lolos XyScan sebelum tayang.
      </p>

      <div className="panel stack-12">
        <p className="dev-hero">
          <Sym name="workspace_premium" size={20} />
          Lisensi resmi XySpace = kepercayaan di mata pembeli.
        </p>
        <p>
          Tanpa lisensi, listing tetap bisa tayang — tapi tanpa badge
          terverifikasi, tanpa penempatan pilihan, dan tanpa bagi hasil.
        </p>
        <Link className="lbtn solid" href="/login">
          Daftar sebagai developer
        </Link>
        <p className="meta-line">
          Pengajuan akun menyusul saat console developer dibuka.
        </p>
      </div>

      <section>
        <div className="rail-head">
          <h2>Keuntungan developer</h2>
        </div>
        <div className="stack-10">
          {BENEFITS.map((b) => (
            <div key={b.title} className="panel trust-row">
              <span className="notif-icon lilac">
                <Sym name={b.icon} size={19} />
              </span>
              <span className="grow">
                <strong>{b.title}</strong>
                <p>{b.text}</p>
              </span>
            </div>
          ))}
        </div>
      </section>

      <section>
        <div className="rail-head">
          <h2>Alur jadi developer</h2>
        </div>
        <div className="stack-8">
          {FLOW.map((s, i) => (
            <div key={s.title} className="flow-row">
              <span className="flow-num">{i + 1}</span>
              <Sym name={s.icon} size={18} className="flow-ic" />
              <span className="grow">
                <strong>{s.title}</strong>
                <em>{s.text}</em>
              </span>
            </div>
          ))}
        </div>
      </section>

      <div className="panel stack-10">
        <h3>
          <Sym name="shield" size={17} /> Tentang XyScan
        </h3>
        <p>
          Engine pemindaian rilis: hash malware dikenal, verifikasi signature
          APK, izin berbahaya di manifest, deteksi packer, dan string jaringan
          mencurigakan. Hasil bersih = rilis tayang otomatis. Mencurigakan =
          ditahan untuk review. Terdeteksi malware = ditolak dan dicatat.
        </p>
        <Link className="text-btn" href="/age-rating">
          Rating usia yang wajib diisi developer
          <Sym name="chevron_right" size={16} />
        </Link>
      </div>
    </div>
  );
}
