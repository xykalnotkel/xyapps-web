"use client";

import Link from "next/link";
import { useState } from "react";
import { sourceLabel, type AppItem } from "@/lib/data";

export function DetailClient({ app }: { app: AppItem }) {
  const [open, setOpen] = useState(false);
  const [phase, setPhase] = useState<"idle" | "spin" | "ready">("idle");
  const badge = sourceLabel(app.sourceKind);
  const ticket = `https://dl.xyapps.my.id/d/e71ed747-${app.slug}-demo`;

  function startInstall() {
    setOpen(true);
    setPhase("spin");
    window.setTimeout(() => setPhase("ready"), 900);
  }

  return (
    <div className="wrap">
      <div className="detail-head">
        <div className="ico-lg" style={{ color: app.accent }}>
          {app.initials}
        </div>
        <div>
          <p className="kicker">{app.developer}</p>
          <h1 style={{ fontSize: 40, marginBottom: 8 }}>{app.title}</h1>
          <p className="lede">{app.tagline}</p>
          <div style={{ display: "flex", gap: 8, marginTop: 12, flexWrap: "wrap" }}>
            <span className={`badge ${badge.tone}`}>{badge.text}</span>
            <span className="badge">
              {app.platform} · v{app.version} · {app.size}
            </span>
          </div>
        </div>
      </div>

      <div className="shots">
        <div className="shot" />
        <div
          className="shot"
          style={{
            background: `linear-gradient(145deg, ${app.accent}33, #0c0c10 62%)`,
          }}
        />
        <div className="shot" />
      </div>

      <div className="cta-row">
        {app.sourceKind === "none" ? (
          <button
            className="btn solid"
            type="button"
            onClick={() => alert("Demo: belum ada URL live.")}
          >
            Buka demo
          </button>
        ) : app.sourceKind === "paid" ? (
          <button className="btn solid" type="button" disabled>
            Source berbayar · segera
          </button>
        ) : (
          <button className="btn solid" type="button" onClick={startInstall}>
            Install resmi
          </button>
        )}
        {app.sourceKind === "xysanc" && (
          <Link className="btn ghost" href="/legal">
            XySANC-1.0
          </Link>
        )}
        <Link className="btn ghost" href="/apps">
          Kembali
        </Link>
      </div>

      <div className="panel">
        <h3>Tentang</h3>
        <p>{app.description}</p>
      </div>
      <div className="panel">
        <h3>Fitur</h3>
        <ul>
          {app.features.map((x) => (
            <li key={x}>{x}</li>
          ))}
        </ul>
      </div>
      <div className="panel">
        <h3>Changelog</h3>
        <ul>
          {app.changelog.map((c) => (
            <li key={c.version}>
              <strong style={{ color: "#ededf2" }}>{c.version}</strong> — {c.notes}
            </li>
          ))}
        </ul>
      </div>

      {open && (
        <div className="backdrop" onClick={() => setOpen(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>Gerbang unduh</h3>
            <p>Mockup tiket. Nanti stream dari server, bukan redirect ke GitHub.</p>
            <div className="progress">
              <i
                style={{
                  width: phase === "ready" ? "100%" : "42%",
                  transition: "width .8s ease",
                }}
              />
            </div>
            {phase === "ready" ? (
              <>
                <div className="ticket">{ticket}</div>
                <p style={{ marginBottom: 12 }}>Kedaluwarsa 10 menit · 1× pakai (simulasi).</p>
                <button
                  className="btn solid"
                  type="button"
                  onClick={() => {
                    navigator.clipboard?.writeText(ticket).catch(() => {});
                    setOpen(false);
                  }}
                >
                  Salin tiket
                </button>
              </>
            ) : (
              <p>Menandatangani tiket…</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
