"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { APPS } from "@/lib/data";

const banners = APPS.filter((a) => a.ratingCount > 0)
  .sort((a, b) => b.ratingCount - a.ratingCount)
  .slice(0, 3);

/** Banner hero berputar ala Play Store: promo app teratas, auto-advance. */
export function HeroBanner() {
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const [loaded, setLoaded] = useState<Record<number, boolean>>({});

  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => setIdx((i) => (i + 1) % banners.length), 4500);
    return () => window.clearInterval(id);
  }, [paused]);

  return (
    <section
      className="hero-banner"
      aria-roledescription="carousel"
      aria-label="Sorotan XyApps"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="banner-track">
        {banners.map((a, i) => {
          const art = a.screenshots[1]?.src ?? a.screenshots[0]?.src;
          const on = i === idx;
          return (
            <Link
              key={a.slug}
              href={`/apps/${a.slug}`}
              className={`banner-slide ${on ? "on" : ""}`}
              aria-hidden={!on}
              tabIndex={on ? 0 : -1}
              style={{
                background: `linear-gradient(118deg, ${a.accent2} 0%, ${a.accent} 140%)`,
              }}
            >
              {art && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={art}
                  alt=""
                  draggable={false}
                  className={`banner-art ${loaded[i] ? "on" : ""}`}
                  onLoad={() => setLoaded((l) => ({ ...l, [i]: true }))}
                />
              )}
              <span className="banner-veil" />
              <span className="banner-copy">
                <span
                  className="glyph sm"
                  style={{ background: `linear-gradient(160deg, ${a.accent}, #121218)` }}
                >
                  {a.icon ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={a.icon} alt="" className="glyph-pic" />
                  ) : (
                    a.initials
                  )}
                </span>
                <span className="banner-text">
                  <strong>{a.title}</strong>
                  <em>{a.tagline}</em>
                </span>
              </span>
            </Link>
          );
        })}
      </div>
      <div className="banner-dots" role="tablist" aria-label="Pilih sorotan">
        {banners.map((a, i) => (
          <button
            key={a.slug}
            type="button"
            role="tab"
            aria-selected={i === idx}
            aria-label={a.title}
            className={i === idx ? "on" : ""}
            onClick={() => setIdx(i)}
          />
        ))}
      </div>
    </section>
  );
}
