/**
 * Badge rating umur — monokrom netral (abu-putih) yang cocok di tema
 * gelap maupun terang.
 *
 * - Level 18+ memakai artwork asli XyStudio (desain Alight Motion)
 *   yang di-trace jadi path SVG INLINE. Tidak ada file gambar — tidak
 *   ada menu "simpan gambar", tidak ada URL yang bisa diambil.
 * - Level lain dirender SVG dengan gaya yang sama: kotak outline,
 *   angka chunky transparan, tanda plus blok kecil.
 * - Warna lewat var(--age-fg): putih-keabuan di gelap, abu-gelap di
 *   terang.
 */
export function AgeBadge({ age, size = "md" }: { age: string; size?: "md" | "lg" }) {
  const n = age.replace("+", "");
  const is18 = age === "18+";
  return (
    <span
      className={`age-badge ${size === "lg" ? "lg" : ""} ${is18 ? "art" : ""}`}
      aria-label={`Rating usia ${age}`}
      title={`Rating usia ${age}`}
    >
      {is18 ? (
        <svg
          viewBox="0 0 128 128"
          className="age-svg art"
          aria-hidden
          fill="currentColor"
        >
          <g transform="translate(0,128) scale(0.1,-0.1)">
            <path d="M970 1106 l0 -56 -55 0 -55 0 0 -40 0 -40 55 0 55 0 0 -50 0 -50 41
0 41 0 -4 50 -3 50 53 0 52 0 0 40 0 40 -49 0 -50 0 -3 53 -3 52 -37 3 -38 3
0 -55z" /> <path d="M272 1008 c-17 -17 -17 -719 0 -736 17 -17 719 -17 736 0 15 15 17
548 2 548 -6 0 -10 -90 -10 -250 0 -237 -1 -251 -20 -270 -19 -19 -33 -20
-340 -20 -307 0 -321 1 -340 20 -19 19 -20 33 -20 340 0 307 1 321 20 340 19
19 33 20 270 20 160 0 250 4 250 10 0 15 -533 13 -548 -2z" /> <path d="M447 824 l-78 -25 3 -37 c3 -32 6 -37 26 -34 22 3 22 1 22 -101 0
-96 -2 -105 -20 -110 -15 -4 -20 -14 -20 -41 l0 -36 100 0 100 0 0 40 c0 33
-3 40 -20 40 -19 0 -20 7 -20 165 0 91 -3 165 -7 164 -5 0 -43 -12 -86 -25z" /> <path d="M695 836 c-31 -13 -85 -69 -85 -87 0 -9 30 -24 74 -35 18 -4 25 -1
29 15 7 30 51 47 82 33 48 -22 25 -72 -32 -72 -32 0 -33 -1 -33 -40 0 -36 2
-40 26 -40 42 0 64 -17 64 -51 0 -55 -82 -59 -108 -5 -11 21 -18 25 -35 20
-79 -24 -83 -35 -36 -88 50 -57 140 -72 215 -36 75 37 94 123 37 176 l-24 22
26 26 c30 30 34 89 9 125 -34 47 -142 66 -209 37z" />
          </g>
        </svg>
      ) : (
        <svg viewBox="0 0 34 34" className="age-svg" aria-hidden>
          <rect
            x="3"
            y="3"
            width="28"
            height="28"
            rx="9"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
          />
          <text x="17.2" y="24.4" textAnchor="middle" className="age-num">
            {n}
          </text>
          <text x="26.8" y="11.2" textAnchor="middle" className="age-plus">
            +
          </text>
        </svg>
      )}
    </span>
  );
}
