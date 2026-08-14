"use client";

import { useEffect, useState } from "react";

type Props = {
  label: string;
  accent: string;
  accent2?: string;
  delay?: number;
  className?: string;
  rounded?: "md" | "lg" | "xl";
  onClick?: () => void;
};

export function SmartImage({
  label,
  accent,
  accent2 = "#0c0c10",
  delay = 520,
  className = "",
  rounded = "lg",
  onClick,
}: Props) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const id = window.setTimeout(() => setReady(true), delay);
    return () => window.clearTimeout(id);
  }, [delay]);

  return (
    <button
      type="button"
      className={`smart-img r-${rounded} ${className}`}
      onClick={onClick}
      aria-label={label}
    >
      {!ready && <span className="sk fill" />}
      <span
        className={`smart-img-inner ${ready ? "on" : ""}`}
        style={{
          background: `linear-gradient(145deg, ${accent} 0%, ${accent2} 72%)`,
        }}
      >
        <span className="smart-img-mark">{label.slice(0, 2)}</span>
      </span>
    </button>
  );
}

export function AppGlyph({
  initials,
  accent,
  size = 56,
}: {
  initials: string;
  accent: string;
  size?: number;
}) {
  return (
    <div
      className="glyph"
      style={{
        width: size,
        height: size,
        background: `linear-gradient(160deg, ${accent}, #121218 78%)`,
      }}
    >
      {initials}
    </div>
  );
}
