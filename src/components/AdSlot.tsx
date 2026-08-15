/**
 * Slot iklan mock — diberi label "Iklan" seperti standar penempatan.
 * Saat program iklan resmi hidup, slot ini diganti jaringan iklan.
 */
export function AdSlot({
  label = "Promo XySpace",
  text = "Ruang iklan untuk developer terpilih",
  variant = "banner",
}: {
  label?: string;
  text?: string;
  variant?: "banner" | "card";
}) {
  return (
    <div className={`ad-slot ${variant}`} role="complementary" aria-label="Iklan">
      <span className="ad-tag">Iklan</span>
      <span className="ad-art" aria-hidden>
        <b>Xy</b>
      </span>
      <span className="ad-copy">
        <strong>{label}</strong>
        <em>{text}</em>
      </span>
    </div>
  );
}
