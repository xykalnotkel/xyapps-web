import type { Metadata } from "next";
import { AgeBadge } from "@/components/AgeBadge";
import { Sym } from "@/components/Icon";

export const metadata: Metadata = { title: "Rating usia" };

const LEVELS = [
  {
    age: "3+" as const,
    name: "Semua umur",
    desc: "Cocok untuk semua kelompok umur. Tanpa konten yang mengkhawatirkan.",
    items: ["Konten edukatif ringan", "Kekerasan kartun minim"],
  },
  {
    age: "7+" as const,
    name: "Anak-anak",
    desc: "Boleh memuat kekerasan ringan yang tidak realistis terhadap karakter khayalan.",
    items: ["Kekerasan kartun", "Humor kasar ringan"],
  },
  {
    age: "13+" as const,
    name: "Remaja",
    desc: "Boleh memuat kekerasan terhadap karakter khayalan dan bahasa kasar ringan.",
    items: ["Kekerasan fantasi", "Bahasa kasar ringan"],
  },
  {
    age: "16+" as const,
    name: "Remaja akhir",
    desc: "Boleh memuat kekerasan realistis, aktivitas berisiko, bahasa kasar kuat.",
    items: ["Kekerasan realistis", "Aktivitas berisiko"],
  },
  {
    age: "18+" as const,
    name: "Dewasa",
    desc: "Konten dewasa: kekerasan intens, perjudian, atau konten eksplisit. Dibatasi ketat.",
    items: ["Kekerasan intens", "Konten dewasa"],
  },
];

const DESCRIPTORS = [
  "Kekerasan",
  "Darah",
  "Bahasa kasar",
  "Konten seksual",
  "Perjudian",
  "Narkoba",
  "Horor",
  "Interaksi sosial",
  "Pembelian dalam app",
  "Iklan",
];

export default function AgeRatingPage() {
  return (
    <div className="wrap page-inner stack-16">
      <p className="kicker">Keamanan keluarga</p>
      <h1 className="page-title">Rating usia</h1>
      <p className="sub">
        Setiap app di XyApps wajib punya rating usia sebelum tayang, mirip
        sistem IARC.
      </p>

      <div className="stack-10">
        {LEVELS.map((l) => (
          <div key={l.age} className="panel age-level">
            <div className="age-level-head">
              <AgeBadge age={l.age} size="lg" />
              <div className="grow">
                <strong>{l.name}</strong>
                <p>{l.desc}</p>
              </div>
            </div>
            <ul className="age-items">
              {l.items.map((i) => (
                <li key={i}>
                  <Sym name="check_circle" size={15} fill />
                  {i}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="panel stack-10">
        <h3>
          <Sym name="info" size={17} /> Deskriptor konten
        </h3>
        <p className="sub">
          App bisa membawa deskriptor tambahan di halaman detailnya, misalnya
          &quot;Kekerasan&quot; atau &quot;Pembelian dalam app&quot;.
        </p>
        <div className="chip-row">
          {DESCRIPTORS.map((d) => (
            <span key={d} className="chip">
              {d}
            </span>
          ))}
        </div>
      </div>

      <p className="meta-line">
        Rating diisi jujur oleh developer. Rating bohong = rilis ditahan,
        sesuai aturan platform.
      </p>
    </div>
  );
}
