"use client";

import { useEffect, useState } from "react";

type Props = {
  /** Path gambar asli (jpg/webp/svg). Kalau kosong, render gradien placeholder. */
  src?: string;
  label: string;
  accent: string;
  accent2?: string;
  delay?: number;
  className?: string;
  rounded?: "md" | "lg" | "xl";
  fit?: "cover" | "contain";
  onClick?: () => void;
};

/**
 * Gambar dengan tiga state: skeleton saat muat, fade-in saat siap,
 * fallback gradien + penanda kalau gagal (state error yang jujur).
 */
export function SmartImage({
  src,
  label,
  accent,
  accent2 = "#0c0c10",
  delay = 420,
  className = "",
  rounded = "lg",
  fit = "cover",
  onClick,
}: Props) {
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (src) return;
    const id = window.setTimeout(() => setReady(true), delay);
    return () => window.clearTimeout(id);
  }, [src, delay]);

  const showImg = Boolean(src) && !failed;

  return (
    <button
      type="button"
      className={`smart-img r-${rounded} ${className}`}
      onClick={onClick}
      aria-label={label}
    >
      {!ready && <span className="sk fill" />}
      {showImg ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={label}
          loading="lazy"
          draggable={false}
          onLoad={() => setReady(true)}
          onError={() => {
            setFailed(true);
            setReady(true);
          }}
          className={`smart-img-pic ${ready ? "on" : ""}`}
          style={{ objectFit: fit }}
        />
      ) : (
        <span
          className={`smart-img-inner ${ready ? "on" : ""}`}
          style={{
            background: `linear-gradient(145deg, ${accent} 0%, ${accent2} 72%)`,
          }}
        >
          <span className="smart-img-mark">{label.slice(0, 2)}</span>
          {failed && <span className="smart-img-fail">gagal muat</span>}
        </span>
      )}
    </button>
  );
}

export function AppGlyph({
  initials,
  accent,
  src,
  size = 56,
}: {
  initials: string;
  accent: string;
  src?: string;
  size?: number;
}) {
  return (
    <div
      className={`glyph ${src ? "flat" : ""}`}
      style={{
        width: size,
        height: size,
        background: src ? undefined : `linear-gradient(160deg, ${accent}, #121218 78%)`,
      }}
    >
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt="" draggable={false} className="glyph-pic" />
      ) : (
        initials
      )}
    </div>
  );
}
