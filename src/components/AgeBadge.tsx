/**
 * Badge rating umur — monokrom netral (abu-putih) yang cocok di tema
 * gelap maupun terang.
 *
 * - Level 18+ memakai artwork asli XyStudio (public/gen/icons/age-18.png,
 *   diekstrak dari desain Alight Motion, putih transparan).
 * - Level lain dirender SVG dengan gaya yang sama: shield outline,
 *   angka chunky transparan, tanda plus blok kecil.
 * - Warna diatur lewat var(--age-fg): putih-keabuan di tema gelap,
 *   abu-gelap di tema terang. Artwork PNG memakai filter CSS yang sama.
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
        // eslint-disable-next-line @next/next/no-img-element
        <img src="/gen/icons/age-18.png" alt={`Rating usia ${age}`} className="age-img" />
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
