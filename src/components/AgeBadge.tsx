import { Sym } from "@/components/Icon";

const TONES: Record<string, string> = {
  "3+": "age-3",
  "7+": "age-7",
  "12+": "age-12",
  "16+": "age-16",
  "18+": "age-18",
};

/**
 * Badge rating umur ala Play Store (IARC-style, mock).
 * Warna: 3+ hijau, 7+ kuning, 12+ oranye, 16+ merah-oranye, 18+ merah.
 */
export function AgeBadge({ age, size = "md" }: { age: string; size?: "md" | "lg" }) {
  const tone = TONES[age] ?? "age-unknown";
  return (
    <span className={`age-badge ${tone} ${size === "lg" ? "lg" : ""}`} aria-label={`Rating umur ${age}`}>
      <Sym name="shield" size={size === "lg" ? 20 : 15} />
      <b>{age}</b>
    </span>
  );
}
