import { Sym } from "@/components/Icon";

/**
 * Bintang rating ala Play Store. Mendukung setengah bintang.
 * Warna emas dipakai sebagai warna fungsional (bukan aksen brand).
 */
export function Stars({ value, size = 13 }: { value: number; size?: number }) {
  const full = Math.floor(value);
  const frac = value - full;
  const roundedUp = frac >= 0.75 ? 1 : 0;
  const half = frac >= 0.25 && frac < 0.75;
  const filledCount = full + roundedUp;
  const halfIndex = half ? full : -1;

  return (
    <span
      className="stars"
      role="img"
      aria-label={`${value.toFixed(1)} dari 5 bintang`}
    >
      {[0, 1, 2, 3, 4].map((i) => {
        const isHalf = i === halfIndex;
        const isFilled = i < filledCount;
        return (
          <Sym
            key={i}
            name={isHalf ? "star_half" : "star"}
            size={size}
            fill={isFilled || isHalf}
            className={isFilled || isHalf ? "star on" : "star"}
          />
        );
      })}
    </span>
  );
}

/** Pemetik bintang interaktif untuk form ulasan. */
export function StarPicker({
  value,
  onChange,
}: {
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <span className="star-picker" role="radiogroup" aria-label="Pilih rating">
      {[1, 2, 3, 4, 5].map((i) => (
        <button
          key={i}
          type="button"
          role="radio"
          aria-checked={value === i}
          aria-label={`${i} bintang`}
          onClick={() => onChange(i)}
          className={value >= i ? "on" : ""}
        >
          <Sym name="star" size={34} fill={value >= i} className={value >= i ? "star on" : "star"} />
        </button>
      ))}
    </span>
  );
}
