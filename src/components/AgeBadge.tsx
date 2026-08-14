import { Sym } from "@/components/Icon";

/**
 * Badge rating umur — monokrom: putih di tema gelap, gelap di tema
 * terang. Tidak ada variasi warna per level (keputusan brand).
 */
export function AgeBadge({ age, size = "md" }: { age: string; size?: "md" | "lg" }) {
  return (
    <span
      className={`age-badge ${size === "lg" ? "lg" : ""}`}
      aria-label={`Rating umur ${age}`}
    >
      <Sym name="shield" size={size === "lg" ? 20 : 15} fill />
      <b>{age}</b>
    </span>
  );
}
