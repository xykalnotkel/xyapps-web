"use client";

import Link from "next/link";
import { ChevronLeft, Share2 } from "lucide-react";
import { useMemo, useState } from "react";
import { BottomSheet } from "@/components/ui/BottomSheet";
import { LoadingButton } from "@/components/ui/LoadingButton";
import { Modal } from "@/components/ui/Modal";
import { AppGlyph, SmartImage } from "@/components/ui/SmartImage";
import { addToLibrary, inLibrary } from "@/lib/library";
import { ctaLabel, sourceLabel, type AppItem } from "@/lib/data";

export function DetailClient({ app }: { app: AppItem }) {
  const badge = sourceLabel(app.sourceKind);
  const [sheet, setSheet] = useState(false);
  const [phase, setPhase] = useState<"idle" | "spin" | "ready">("idle");
  const [preview, setPreview] = useState<number | null>(null);
  const [owned, setOwned] = useState(() => inLibrary(app.slug));
  const [shareOpen, setShareOpen] = useState(false);

  const ticket = useMemo(
    () => `https://dl.xyapps.my.id/d/e71ed747-${app.slug}-demo`,
    [app.slug],
  );

  function startAction() {
    if (app.sourceKind === "paid") return;
    if (app.sourceKind === "none") {
      setSheet(true);
      setPhase("ready");
      return;
    }
    setSheet(true);
    setPhase("spin");
    window.setTimeout(() => {
      addToLibrary(app.slug);
      setOwned(true);
      setPhase("ready");
    }, 1100);
  }

  return (
    <div className="detail">
      <div className="wrap detail-nav">
        <Link href="/apps" className="icon-btn" aria-label="Kembali">
          <ChevronLeft size={22} />
        </Link>
        <button
          type="button"
          className="icon-btn"
          aria-label="Bagikan"
          onClick={() => setShareOpen(true)}
        >
          <Share2 size={18} />
        </button>
      </div>

      <div className="wrap app-hero">
        <AppGlyph initials={app.initials} accent={app.accent} size={84} />
        <div>
          <h1>{app.title}</h1>
          <p className="dev">{app.developer}</p>
          <span className={`badge ${badge.tone}`}>{badge.text}</span>
        </div>
      </div>

      <div className="wrap stats">
        <div>
          <strong>{app.category}</strong>
          <span>Kategori</span>
        </div>
        <div>
          <strong>{app.size}</strong>
          <span>Ukuran</span>
        </div>
        <div>
          <strong>{app.age}</strong>
          <span>Usia</span>
        </div>
        <div>
          <strong>{app.platform}</strong>
          <span>Platform</span>
        </div>
      </div>

      <div className="rail pad-left shots-rail">
        {[0, 1, 2, 3].map((i) => (
          <SmartImage
            key={i}
            label={`${app.title} cuplikan ${i + 1}`}
            accent={i % 2 ? app.accent2 : app.accent}
            accent2={i % 2 ? app.accent : app.accent2}
            delay={380 + i * 140}
            className="shot-img"
            rounded="xl"
            onClick={() => setPreview(i)}
          />
        ))}
      </div>

      <div className="wrap stack-14">
        <section>
          <h2>Tentang aplikasi ini</h2>
          <p className="body">{app.description}</p>
          <ul className="feat">
            {app.features.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>
        </section>
        <section>
          <h2>Yang baru</h2>
          {app.changelog.map((c) => (
            <p key={c.version} className="body">
              <strong>{c.version}</strong> · {c.notes}
            </p>
          ))}
          <p className="meta-line">Diperbarui {app.updated}</p>
        </section>
      </div>

      <div className="sticky-cta">
        <div className="wrap sticky-inner">
          <div>
            <strong>{owned ? "Di library" : app.title}</strong>
            <span>
              {app.sourceKind === "paid"
                ? "Source berbayar · belum dibuka"
                : app.sourceKind === "none"
                  ? "Demo web"
                  : "XySANC-1.0 · jangan jual"}
            </span>
          </div>
          <LoadingButton
            onClick={startAction}
            disabled={app.sourceKind === "paid"}
            loading={sheet && phase === "spin"}
          >
            {owned && app.sourceKind === "xysanc" ? "Install lagi" : ctaLabel(app.sourceKind)}
          </LoadingButton>
        </div>
      </div>

      <BottomSheet
        open={sheet}
        title={app.sourceKind === "none" ? "Buka demo" : "Gerbang unduh"}
        onClose={() => setSheet(false)}
      >
        {app.sourceKind === "none" ? (
          <p>Demo belum punya URL live. Nanti tombol ini buka tab baru.</p>
        ) : phase === "ready" ? (
          <>
            <p>Tiket simulasi. Nanti file di-stream dari dl.xyapps.my.id, bukan GitHub.</p>
            <div className="ticket">{ticket}</div>
            <LoadingButton
              block
              onClick={() => {
                navigator.clipboard?.writeText(ticket).catch(() => {});
                setSheet(false);
              }}
            >
              Salin tiket
            </LoadingButton>
          </>
        ) : (
          <>
            <p>Menandatangani tiket…</p>
            <div className="bar">
              <i style={{ width: "58%" }} />
            </div>
          </>
        )}
      </BottomSheet>

      <Modal
        open={preview !== null}
        title="Cuplikan"
        onClose={() => setPreview(null)}
      >
        {preview !== null && (
          <SmartImage
            label={app.title}
            accent={preview % 2 ? app.accent2 : app.accent}
            accent2={preview % 2 ? app.accent : app.accent2}
            delay={120}
            className="preview-img"
            rounded="xl"
          />
        )}
      </Modal>

      <Modal open={shareOpen} title="Bagikan" onClose={() => setShareOpen(false)}>
        <p>Nanti di sini share sheet asli. Sekarang cuma path-nya:</p>
        <div className="ticket">/apps/{app.slug}</div>
      </Modal>
    </div>
  );
}
