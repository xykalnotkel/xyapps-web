/**
 * Badge rating umur: kotak outline, angka besar transparan (tembus),
 * tanda "+" di pojok kanan atas. Monokrom mengikuti warna teks.
 */
export function AgeBadge({ age, size = "md" }: { age: string; size?: "md" | "lg" }) {
  const n = age.replace("+", "");
  return (
    <span
      className={`age-badge ${size === "lg" ? "lg" : ""}`}
      aria-label={`Rating usia ${age}`}
      title={`Rating usia ${age}`}
    >
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
    </span>
  );
}
