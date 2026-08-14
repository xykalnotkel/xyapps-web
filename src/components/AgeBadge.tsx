import { useId } from "react";

/**
 * Badge rating umur gaya Play Store: outline shield, angka di tengah,
 * tanda "+" kecil di pojok kanan atas yang ter-mask oleh bentuk shield
 * (clipPath). Monokrom — putih di tema gelap, gelap di tema terang.
 */
export function AgeBadge({ age, size = "md" }: { age: string; size?: "md" | "lg" }) {
  const id = useId().replace(/[^a-zA-Z0-9]/g, "");
  const n = age.replace("+", "");
  return (
    <span
      className={`age-badge ${size === "lg" ? "lg" : ""}`}
      aria-label={`Rating umur ${age}`}
      title={`Rating umur ${age}`}
    >
      <svg viewBox="0 0 24 24" className="age-svg" aria-hidden>
        <defs>
          <clipPath id={`ageclip-${id}`}>
            <path d="M12 2.8 19.4 5.5v5c0 4.6-3.1 8.1-7.4 10.4-4.3-2.3-7.4-5.8-7.4-10.4v-5L12 2.8Z" />
          </clipPath>
        </defs>
        <path
          d="M12 2.8 19.4 5.5v5c0 4.6-3.1 8.1-7.4 10.4-4.3-2.3-7.4-5.8-7.4-10.4v-5L12 2.8Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
        />
        <g clipPath={`url(#ageclip-${id})`}>
          <text x="12.1" y="15.1" textAnchor="middle" className="age-num">
            {n}
          </text>
          <text x="17.6" y="5.9" textAnchor="middle" className="age-plus">
            +
          </text>
        </g>
      </svg>
    </span>
  );
}
