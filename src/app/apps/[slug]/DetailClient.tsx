"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { BottomSheet } from "@/components/ui/BottomSheet";
import { LoadingButton } from "@/components/ui/LoadingButton";
import { Modal } from "@/components/ui/Modal";
import { AppGlyph, SmartImage } from "@/components/ui/SmartImage";
import { StarPicker, Stars } from "@/components/ui/Stars";
import { ToastView, useToast } from "@/components/ui/Toast";
import { Sym } from "@/components/Icon";
import type { SymName } from "@/lib/symbols";
import { useSession } from "@/components/Session";
import {
  addToLibrary,
  inLibrary,
  inWishlist,
  toggleWishlist,
} from "@/lib/library";
import {
  ctaLabel,
  fmtCount,
  getApp,
  getDeveloperOfApp,
  sourceLabel,
  userIdFor,
  type AppItem,
  type ReviewItem,
} from "@/lib/data";

type InstallPhase =
  | "idle"
  | "ticket"
  | "ready"
  | "downloading"
  | "installing"
  | "done";

/* Satu-satunya bottom sheet: gerbang unduh. Share pakai navigator.share
   (fallback modal), izin inline, laporan modal. */
type SheetKind = "install" | null;

type ReviewSort = "rel" | "new" | "help";

const REPORT_REASONS = [
  "Menipu atau spam",
  "Konten berbahaya",
  "Melanggar lisensi",
  "Salinan tidak resmi",
  "Lainnya",
];

const RKEY = (slug: string) => `xyapps.reviews.${slug}`;
const HKEY = "xyapps.helpful";

function loadMyReviews(slug: string): ReviewItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(RKEY(slug));
    return raw ? (JSON.parse(raw) as ReviewItem[]) : [];
  } catch {
    return [];
  }
}

function loadHelpful(): Set<string> {
  if (typeof window === "undefined") return new Set();
  try {
    const raw = localStorage.getItem(HKEY);
    return raw ? new Set(JSON.parse(raw) as string[]) : new Set();
  } catch {
    return new Set();
  }
}

export function DetailClient({ app }: { app: AppItem }) {
  const badge = sourceLabel(app.sourceKind);
  const dev = getDeveloperOfApp(app);
  const { user } = useSession();
  const { msg: toast, show } = useToast();

  const [sheet, setSheet] = useState<SheetKind>(null);
  const [phase, setPhase] = useState<InstallPhase>("idle");
  const [pct, setPct] = useState(0);
  const [owned, setOwned] = useState(false);
  const [wished, setWished] = useState(false);
  const [preview, setPreview] = useState<number | null>(null);
  const [reviewOpen, setReviewOpen] = useState(false);
  const [showOldChangelog, setShowOldChangelog] = useState(false);
  const [myReviews, setMyReviews] = useState<ReviewItem[]>([]);
  const [helpful, setHelpful] = useState<Set<string>>(new Set());
  const [shotIdx, setShotIdx] = useState(0);
  const [reviewSort, setReviewSort] = useState<ReviewSort>("rel");
  const [starFilter, setStarFilter] = useState(0);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [permsOpen, setPermsOpen] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const [reportOpen, setReportOpen] = useState(false);
  const [reportReason, setReportReason] = useState<string | null>(null);

  const timer = useRef<number | null>(null);
  const interval = useRef<number | null>(null);
  const railRef = useRef<HTMLDivElement | null>(null);
  const touchX = useRef<number | null>(null);

  const ticket = useMemo(
    () => `https://dl.xystudio.my.id/d/${app.slug}/e71ed747-demo-${app.version.replace(/\./g, "")}`,
    [app.slug, app.version],
  );

  const rated = app.ratingCount > 0;
  const allReviews = useMemo(
    () => [...myReviews, ...app.reviews],
    [myReviews, app.reviews],
  );
  const latest = app.changelog[0];
  const older = app.changelog.slice(1);

  const visibleReviews = useMemo(() => {
    let list = allReviews.filter((r) => starFilter === 0 || r.rating === starFilter);
    if (reviewSort === "new") list = [...list].sort((a, b) => (b.ts ?? 0) - (a.ts ?? 0));
    if (reviewSort === "help")
      list = [...list].sort(
        (a, b) => b.helpful - a.helpful || (b.ts ?? 0) - (a.ts ?? 0),
      );
    return list;
  }, [allReviews, starFilter, reviewSort]);

  const starCounts = useMemo(() => {
    const counts = [0, 0, 0, 0, 0];
    allReviews.forEach((r) => {
      const i = 5 - r.rating;
      if (i >= 0 && i < 5) counts[i] += 1;
    });
    return counts;
  }, [allReviews]);

  function onRailScroll() {
    const el = railRef.current;
    if (!el) return;
    const kids = Array.from(el.children) as HTMLElement[];
    const mid = el.scrollLeft + el.clientWidth / 2;
    let best = 0;
    let bestDist = Infinity;
    kids.forEach((k, i) => {
      const c = k.offsetLeft + k.offsetWidth / 2;
      const d = Math.abs(c - mid);
      if (d < bestDist) {
        bestDist = d;
        best = i;
      }
    });
    setShotIdx(best);
  }

  function goShot(i: number) {
    const el = railRef.current;
    const target = el?.children[i] as HTMLElement | undefined;
    if (el && target) el.scrollTo({ left: Math.max(target.offsetLeft - 16, 0), behavior: "smooth" });
  }

  const shotCount = app.screenshots.length;

  const nextShot = useCallback(() => {
    setPreview((p) => (p === null ? 0 : (p + 1) % shotCount));
  }, [shotCount]);

  const prevShot = useCallback(() => {
    setPreview((p) => (p === null ? 0 : (p - 1 + shotCount) % shotCount));
  }, [shotCount]);

  // Navigasi keyboard + kunci scroll di viewer cuplikan.
  useEffect(() => {
    if (preview === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") nextShot();
      if (e.key === "ArrowLeft") prevShot();
      if (e.key === "Escape") setPreview(null);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [preview, nextShot, prevShot]);

  // Sinkron state dari localStorage setelah hidrasi, bukan saat render awal.
  useEffect(() => {
    const id = window.setTimeout(() => {
      setOwned(inLibrary(app.slug));
      setWished(inWishlist(app.slug));
      setMyReviews(loadMyReviews(app.slug));
      setHelpful(loadHelpful());
    }, 0);
    return () => {
      window.clearTimeout(id);
      if (timer.current) window.clearTimeout(timer.current);
      if (interval.current) window.clearInterval(interval.current);
    };
  }, [app.slug]);

  function clearTimers() {
    if (timer.current) window.clearTimeout(timer.current);
    if (interval.current) window.clearInterval(interval.current);
    timer.current = null;
    interval.current = null;
  }

  function startDownload() {
    setSheet(null);
    setPhase("downloading");
    setPct(0);
    /* KONTRAK PROGRES ASLI (belum ada file sungguhan):
       - Saat backend dl.xystudio.my.id hidup, interval mock di bawah DIGANTI
         progres sungguhan dari stream:
           fetch(ticket) -> ReadableStream reader loop, atau XHR
           onprogress, lalu pct = diterima / Content-Length * 100.
       - Sumber angka cuma satu: byte yang benar-benar diterima. Jangan
         pernah menambah pct yang tidak berasal dari transfer asli.
       - Unduhan gagal di tengah (network drop, 4xx/5xx dari gerbang)
         wajib balik ke phase idle + toast error, tidak boleh stuck di
         downloading. Semua pembersihan timer lewat clearTimers(). */
    interval.current = window.setInterval(() => {
      setPct((p) => {
        const next = p + Math.ceil(Math.random() * 5) + 1;
        if (next >= 100) {
          if (interval.current) window.clearInterval(interval.current);
          setPhase("installing");
          timer.current = window.setTimeout(() => {
            addToLibrary(app.slug);
            setOwned(true);
            setPhase("done");
            show(`${app.title} terpasang di perangkat ini`);
            timer.current = window.setTimeout(() => setPhase("idle"), 900);
          }, 1300);
          return 100;
        }
        return next;
      });
    }, 90);
  }

  function startAction() {
    if (app.sourceKind === "paid") return;
    if (owned && app.sourceKind === "xysanc") {
      show(`Mock: membuka ${app.title}…`);
      return;
    }
    if (app.sourceKind === "none") {
      setSheet("install");
      return;
    }
    // xysanc: buka gerbang unduh, tanda tangani tiket dulu
    setSheet("install");
    setPhase("ticket");
    timer.current = window.setTimeout(() => setPhase("ready"), 1100);
  }

  function onWishlist() {
    const next = toggleWishlist(app.slug);
    setWished(next);
    show(next ? "Ditambahkan ke wishlist" : "Dihapus dari wishlist");
  }

  function onCopy(text: string, msg: string) {
    navigator.clipboard?.writeText(text).catch(() => {});
    show(msg);
  }

  function onShare() {
    const url = `https://xyapps.xystudio.my.id/apps/${app.slug}`;
    const data = { title: app.title, text: app.tagline, url };
    if (typeof navigator !== "undefined" && "share" in navigator) {
      navigator.share(data).catch(() => {
        /* dibatalkan user: tidak usah jatuh ke modal */
      });
    } else {
      setShareOpen(true);
    }
  }

  function submitReport() {
    setReportOpen(false);
    show("Laporan terkirim (mock)");
  }

  function submitReview(rating: number, text: string) {
    const item: ReviewItem = {
      id: `u-${Date.now()}`,
      user: user?.name ?? "Kamu",
      hue: 265,
      rating,
      date: "Hari ini",
      ts: Date.now(),
      text: text.trim(),
      helpful: 0,
    };
    const next = [item, ...myReviews];
    setMyReviews(next);
    try {
      localStorage.setItem(RKEY(app.slug), JSON.stringify(next));
    } catch {
      /* penyimpanan penuh: abaikan */
    }
    setReviewOpen(false);
    show("Ulasan terkirim (mock)");
  }

  function toggleHelpful(id: string) {
    const next = new Set(helpful);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setHelpful(next);
    try {
      localStorage.setItem(HKEY, JSON.stringify([...next]));
    } catch {
      /* abaikan */
    }
  }

  function ctaContent() {
    if (app.sourceKind === "paid")
      return (
        <>
          <Sym name="lock" size={15} /> Terkunci
        </>
      );
    if (app.sourceKind === "none") return "Buka";
    if (owned && phase !== "downloading" && phase !== "installing") return "Buka";
    if (phase === "downloading") return `Mengunduh… ${pct}%`;
    if (phase === "installing") return "Memasang…";
    return "Install";
  }

  const busy = phase === "downloading" || phase === "installing";

  return (
    <div className="detail">
      <div className="wrap detail-nav">
        <Link href="/apps" className="icon-btn" aria-label="Kembali">
          <Sym name="arrow_back" size={21} />
        </Link>
        <button
          type="button"
          className="icon-btn"
          aria-label="Bagikan"
          onClick={onShare}
        >
          <Sym name="share" size={18} />
        </button>
      </div>

      {/* HERO */}
      <div className="wrap app-hero">
        {busy ? (
          <Ring pct={pct} size={84}>
            <AppGlyph
              initials={app.initials}
              accent={app.accent}
              src={app.icon}
              size={84}
            />
          </Ring>
        ) : (
          <AppGlyph
            initials={app.initials}
            accent={app.accent}
            src={app.icon}
            size={84}
          />
        )}
        <div className="hero-main">
          <div className="hero-title-row">
            <h1>{app.title}</h1>
            <button
              type="button"
              className={`icon-btn heart ${wished ? "on" : ""}`}
              aria-label={wished ? "Hapus dari wishlist" : "Tambah ke wishlist"}
              aria-pressed={wished}
              onClick={onWishlist}
            >
              <Sym name="favorite" size={20} fill={wished} />
            </button>
          </div>
          <Link href={`/profile/dev/${dev.id}`} className="dev">
            {app.developer}
            {dev.verified && (
              <Sym name="verified" size={14} fill className="dev-check" />
            )}
          </Link>
          <p className="updated-line">Diperbarui {app.updated}</p>
          <div className="hero-chips">
            <span className={`badge ${badge.tone}`}>{badge.text}</span>
            <span className={`badge plat`}>{app.platform}</span>
            {app.containsAds && <span className="ad-note">Mengandung iklan</span>}
          </div>
        </div>
      </div>

      {/* STAT DENGAN ICON — tanpa card, tepat di atas tombol Install */}
      <div className="wrap stats-grid">
        <div className="stat">
          <Sym
            name="star"
            size={20}
            fill={rated}
            className={rated ? "stat-ic amber" : "stat-ic"}
          />
          <strong>{rated ? app.rating.toFixed(1) : "—"}</strong>
          <em>Rating</em>
        </div>
        <div className="stat">
          <Sym name="storage" size={20} className="stat-ic" />
          <strong>{app.size}</strong>
          <em>Ukuran</em>
        </div>
        <div className="stat">
          <span className="age-box">{app.age}</span>
          <em>Rating umur</em>
        </div>
        <div className="stat">
          <Sym name="download" size={20} className="stat-ic" />
          <strong>{app.installs}</strong>
          <em>Unduhan</em>
        </div>
      </div>

      {/* AKSI — satu tombol penuh, heart ada di baris judul, share di nav atas */}
      <div className="wrap action-row">
        <LoadingButton
          block
          className="cta-main"
          onClick={startAction}
          disabled={app.sourceKind === "paid" || (owned && phase === "done")}
          loading={busy}
        >
          {ctaContent()}
        </LoadingButton>
      </div>

      {/* CUPLIKAN */}
      <div className="rail pad-left shots-rail" ref={railRef} onScroll={onRailScroll}>
        {app.screenshots.map((s, i) => (
          <SmartImage
            key={s.src}
            src={s.src}
            label={s.label}
            accent={i % 2 ? app.accent2 : app.accent}
            accent2={i % 2 ? app.accent : app.accent2}
            delay={300 + i * 120}
            className={s.landscape ? "shot-land" : "shot-port"}
            rounded="xl"
            onClick={() => setPreview(i)}
          />
        ))}
      </div>
      <div className="wrap shot-dots" aria-label="Posisi cuplikan">
        {app.screenshots.map((s, i) => (
          <button
            key={s.src}
            type="button"
            className={i === shotIdx ? "on" : ""}
            aria-label={`Ke cuplikan ${i + 1}`}
            onClick={() => goShot(i)}
          />
        ))}
      </div>

      {/* TENTANG */}
      <section className="wrap detail-sec">
        <h2>Tentang aplikasi ini</h2>
        <p className={`body ${aboutOpen ? "" : "clamp3"}`}>{app.description}</p>
        {app.description.length > 140 && (
          <button
            type="button"
            className="text-btn"
            onClick={() => setAboutOpen((v) => !v)}
            aria-expanded={aboutOpen}
          >
            {aboutOpen ? "Lebih sedikit" : "Lebih banyak"}
            <Sym name={aboutOpen ? "expand_less" : "expand_more"} size={16} />
          </button>
        )}
        <div className="about-rows">
          <Row k="Versi" v={app.version} icon="info" />
          <Row k="Diperbarui" v={app.updated} icon="schedule" />
          <Row k="Ukuran" v={app.size} icon="storage" />
          <Row k="Diunduh" v={app.installs} icon="download" />
          <Row k="Dirilis" v={app.released} icon="rocket_launch" />
          <Link
            className="about-row about-btn"
            href={`/profile/dev/${dev.id}`}
          >
            <span className="about-k">
              <Sym name="person" size={15} />
              Pengembang
            </span>
            <span className="about-val">{app.developer}</span>
          </Link>
          <Row k="Platform" v={app.platform} icon="devices" />
          <a
            className="about-row about-btn"
            href={`mailto:${app.supportEmail}`}
          >
            <span>Email pengembang</span>
            <span className="about-val">{app.supportEmail}</span>
          </a>
          {app.website && (
            <a
              className="about-row about-btn"
              href={`https://${app.website}`}
              target="_blank"
              rel="noreferrer"
            >
              <span>Situs web</span>
              <span className="about-val">{app.website}</span>
            </a>
          )}
        </div>
        <button
          type="button"
          className="text-btn"
          onClick={() => setPermsOpen((v) => !v)}
          aria-expanded={permsOpen}
        >
          Izin aplikasi
          <Sym name={permsOpen ? "expand_less" : "expand_more"} size={16} />
        </button>
        {permsOpen && (
          <ul className="perm-list inline">
            {app.permissions.map((p) => (
              <li key={p}>
                <Sym name="check_circle" size={17} fill />
                {p}
              </li>
            ))}
          </ul>
        )}
        <ul className="feat">
          {app.features.map((x) => (
            <li key={x}>{x}</li>
          ))}
        </ul>
        <button
          type="button"
          className="report-btn"
          onClick={() => setReportOpen(true)}
        >
          <Sym name="flag" size={15} /> Laporkan aplikasi
        </button>
      </section>

      
      {/* YANG BARU */}
      <section className="wrap detail-sec">
        <h2>Yang baru</h2>
        <div className="panel">
          <p className="chg-head">
            <strong>{latest.version}</strong>
            <span>{latest.date}</span>
          </p>
          <ul className="chg-list">
            {latest.notes.map((n) => (
              <li key={n}>{n}</li>
            ))}
          </ul>
          {older.length > 0 && (
            <>
              <button
                type="button"
                className="text-btn"
                onClick={() => setShowOldChangelog((v) => !v)}
              >
                {showOldChangelog ? "Sembunyikan" : "Versi sebelumnya"}
                <Sym name={showOldChangelog ? "expand_less" : "expand_more"} size={16} />
              </button>
              {showOldChangelog &&
                older.map((c) => (
                  <div key={c.version} className="chg-old">
                    <p className="chg-head">
                      <strong>{c.version}</strong>
                      <span>{c.date}</span>
                    </p>
                    <ul className="chg-list">
                      {c.notes.map((n) => (
                        <li key={n}>{n}</li>
                      ))}
                    </ul>
                  </div>
                ))}
            </>
          )}
        </div>
      </section>

      {/* RATING */}
      <section className="wrap detail-sec">
        <h2>Rating dan ulasan</h2>
        <div className="panel rating-panel">
          {rated ? (
            <>
              <div className="rating-sum">
                <strong className="rating-big">{app.rating.toFixed(1)}</strong>
                <Stars value={app.rating} size={15} />
                <span className="meta-line">
                  {fmtCount(app.ratingCount)} ulasan
                </span>
              </div>
              <div className="rating-break">
                {app.ratingBreakdown.map((count, i) => {
                  const star = 5 - i;
                  const pct = app.ratingCount
                    ? Math.round((count / app.ratingCount) * 100)
                    : 0;
                  return (
                    <div className="break-row" key={star}>
                      <span className="break-label">{star}</span>
                      <span className="break-track">
                        <i style={{ width: `${pct}%` }} />
                      </span>
                      <span className="break-count">{count}</span>
                    </div>
                  );
                })}
              </div>
            </>
          ) : (
            <div className="rating-empty">
              <strong>Belum dinilai</strong>
              <span className="meta-line">
                Ulasan dibuka setelah app rilis dan terpasang di perangkat.
              </span>
            </div>
          )}
          {app.sourceKind !== "paid" && (
            <button
              type="button"
              className="lbtn soft write-review"
              onClick={() => setReviewOpen(true)}
            >
              <Sym name="edit" size={15} /> Tulis ulasan
            </button>
          )}
        </div>
      </section>

      {/* ULASAN */}
      <section className="wrap detail-sec">
        <h2>Ulasan</h2>
        {allReviews.length === 0 ? (
          <div className="empty">
            <Sym name="reviews" size={24} />
            <p>Belum ada ulasan untuk aplikasi ini.</p>
          </div>
        ) : (
          <>
            <div className="review-controls">
              <div className="chip-row review-stars">
                {[0, 5, 4, 3, 2, 1].map((s) => (
                  <button
                    key={s}
                    type="button"
                    className={`chip ${starFilter === s ? "on" : ""}`}
                    onClick={() => setStarFilter(s)}
                  >
                    {s === 0 ? "Semua" : `${s}`}
                    {s > 0 && <Sym name="star" size={12} fill className="chip-star" />}
                    <span className="chip-count">
                      {s === 0 ? allReviews.length : starCounts[5 - s]}
                    </span>
                  </button>
                ))}
              </div>
              <div className="sort-group">
                {(
                  [
                    ["rel", "Paling relevan"],
                    ["new", "Terbaru"],
                    ["help", "Paling membantu"],
                  ] as const
                ).map(([k, l]) => (
                  <button
                    key={k}
                    type="button"
                    className={`sort-btn ${reviewSort === k ? "on" : ""}`}
                    onClick={() => setReviewSort(k)}
                  >
                    {l}
                  </button>
                ))}
              </div>
            </div>
            {visibleReviews.length === 0 ? (
              <div className="empty">
                <p>
                  Tidak ada ulasan bintang {starFilter} dengan filter ini.
                </p>
              </div>
            ) : (
              <div className="stack-12">
                {visibleReviews.map((r) => (
                  <ReviewCard
                    key={r.id}
                    r={r}
                    mine={myReviews.some((m) => m.id === r.id)}
                    helpfulOn={helpful.has(r.id)}
                    onHelpful={() => toggleHelpful(r.id)}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </section>

      {/* KEAMANAN DATA */}
      <section className="wrap detail-sec">
        <h2>Keamanan data</h2>
        <div className="panel safety-list">
          {app.dataSafety.map((s) => (
            <p key={s}>
              <Sym name="shield" size={17} fill /> {s}
            </p>
          ))}
        </div>
      </section>

      {/* MIRIP / LAINNYA DARI PENGEMBANG */}
      <RailSection
        title="Aplikasi lain oleh pengembang ini"
        slugs={app.moreFromDev}
      />
      <RailSection title="Mirip dengan ini" slugs={app.similar} />

      {/* SHEET: GERBANG UNDUH */}
      <BottomSheet
        open={sheet === "install"}
        title={app.sourceKind === "none" ? "Buka demo" : "Gerbang unduh resmi"}
        onClose={() => {
          setSheet(null);
          clearTimers();
          if (phase === "ticket" || phase === "ready") setPhase("idle");
        }}
      >
        {app.sourceKind === "none" ? (
          <div className="stack-12">
            <p>
              Demo web belum punya URL live. Nanti tombol ini membuka tab baru — tidak
              ada file yang diunduh untuk app web.
            </p>
            {app.website && (
              <div className="ticket">https://{app.website} (DNS menyusul)</div>
            )}
            <LoadingButton block onClick={() => setSheet(null)}>
              Mengerti
            </LoadingButton>
          </div>
        ) : phase === "ticket" ? (
          <div className="stack-12">
            <p>Menandatangani tiket unduh…</p>
            <div className="bar">
              <i style={{ width: "58%" }} />
            </div>
          </div>
        ) : (
          <div className="stack-12">
            <p>
              File di-stream dari dl.xystudio.my.id. URL asal tidak pernah sampai ke
              browser — ini simulasi, file asli belum ada.
            </p>
            <div className="ticket">{ticket}</div>
            <LoadingButton
              block
              onClick={() => onCopy(ticket, "Tiket disalin")}
            >
              Salin tiket
            </LoadingButton>
            <LoadingButton block variant="soft" onClick={startDownload}>
              Mulai unduh
            </LoadingButton>
          </div>
        )}
      </BottomSheet>

      {/* MODAL: LAPORKAN */}
      <Modal
        open={reportOpen}
        title="Laporkan aplikasi"
        onClose={() => setReportOpen(false)}
      >
        <div className="stack-14">
          <p className="sub">Pilih alasan. Laporan masuk ke tim XyStudio (mock).</p>
          {REPORT_REASONS.map((r) => (
            <label key={r} className="report-option">
              <input
                type="radio"
                name="reason"
                checked={reportReason === r}
                onChange={() => setReportReason(r)}
              />
              <span>{r}</span>
            </label>
          ))}
          <LoadingButton block disabled={!reportReason} onClick={submitReport}>
            Kirim laporan
          </LoadingButton>
        </div>
      </Modal>

      {/* MODAL: BAGIKAN (fallback browser tanpa navigator.share) */}
      <Modal open={shareOpen} title="Bagikan" onClose={() => setShareOpen(false)}>
        <div className="stack-12">
          <p>Bagikan halaman aplikasi ini:</p>
          <div className="ticket">https://xyapps.xystudio.my.id/apps/{app.slug}</div>
          <LoadingButton
            block
            onClick={() => onCopy(`https://xyapps.xystudio.my.id/apps/${app.slug}`, "Tautan disalin")}
          >
            Salin tautan
          </LoadingButton>
        </div>
      </Modal>

      {/* VIEWER CUPLIKAN — fullscreen polos tanpa card */}
      {preview !== null && (
        <div
          className="viewer-fs"
          role="dialog"
          aria-modal="true"
          aria-label={app.screenshots[preview].label}
          onClick={() => setPreview(null)}
        >
          <button
            type="button"
            className="viewer-close"
            aria-label="Tutup"
            onClick={() => setPreview(null)}
          >
            <Sym name="close" size={22} />
          </button>
          <div
            className="viewer-stage"
            onClick={(e) => e.stopPropagation()}
            onTouchStart={(e) => {
              touchX.current = e.touches[0].clientX;
            }}
            onTouchEnd={(e) => {
              if (touchX.current === null) return;
              const dx = e.changedTouches[0].clientX - touchX.current;
              if (Math.abs(dx) > 40) {
                if (dx < 0) nextShot();
                else prevShot();
              }
              touchX.current = null;
            }}
          >
            <SmartImage
              src={app.screenshots[preview].src}
              label={app.screenshots[preview].label}
              accent={preview % 2 ? app.accent2 : app.accent}
              accent2={preview % 2 ? app.accent : app.accent2}
              delay={80}
              className={
                app.screenshots[preview].landscape ? "viewer-img land" : "viewer-img"
              }
              rounded="md"
              fit="contain"
            />
          </div>
          {shotCount > 1 && (
            <>
              <button
                type="button"
                className="viewer-nav left"
                aria-label="Sebelumnya"
                onClick={(e) => {
                  e.stopPropagation();
                  prevShot();
                }}
              >
                <Sym name="chevron_left" size={26} />
              </button>
              <button
                type="button"
                className="viewer-nav right"
                aria-label="Berikutnya"
                onClick={(e) => {
                  e.stopPropagation();
                  nextShot();
                }}
              >
                <Sym name="chevron_right" size={26} />
              </button>
              <span className="viewer-count">
                {preview + 1} / {shotCount}
              </span>
            </>
          )}
        </div>
      )}

{/* MODAL: TULIS ULASAN */}
      <ReviewModal
        open={reviewOpen}
        onClose={() => setReviewOpen(false)}
        onSubmit={submitReview}
        title={app.title}
      />

      <ToastView msg={toast} />
    </div>
  );
}

function Row({
  k,
  v,
  icon,
}: {
  k: string;
  v: string;
  icon?: SymName;
}) {
  return (
    <div className="about-row">
      <span className="about-k">
        {icon && <Sym name={icon} size={15} />}
        {k}
      </span>
      <span className="about-val">{v}</span>
    </div>
  );
}

/**
 * Lingkar progres unduhan di icon app — gaya ular melengkung melingkar:
 * busur progres dengan kepala membulat plus ekor terang yang berputar
 * terus selama mengunduh, dan persen di tengah.
 */
function Ring({
  pct,
  size,
  children,
}: {
  pct: number;
  size: number;
  children: React.ReactNode;
}) {
  const C = 283; // keliling r=45 pada viewBox 100
  const gid = `ringGrad-${size}`;
  return (
    <span className="ring-wrap" style={{ width: size, height: size }}>
      {children}
      <svg className="ring-svg" viewBox="0 0 100 100" aria-hidden>
        <defs>
          <linearGradient id={gid} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#a78bfa" />
            <stop offset="1" stopColor="#7c3aed" />
          </linearGradient>
        </defs>
        <circle className="ring-track" cx="50" cy="50" r="45" />
        <circle
          className="ring-val"
          cx="50"
          cy="50"
          r="45"
          stroke={`url(#${gid})`}
          strokeDasharray={C}
          strokeDashoffset={C * (1 - Math.min(pct, 100) / 100)}
        />
        {/* ekor ular: busur pendek terang yang mengelilingi ring */}
        <circle className="ring-snake" cx="50" cy="50" r="45" />
      </svg>
      <span className="ring-pct">{Math.min(pct, 100)}%</span>
    </span>
  );
}

function ReviewCard({
  r,
  mine,
  helpfulOn,
  onHelpful,
}: {
  r: ReviewItem;
  mine: boolean;
  helpfulOn: boolean;
  onHelpful: () => void;
}) {
  return (
    <article className="panel review">
      <div className="review-head">
        <span
          className="review-ava"
          style={{ background: `linear-gradient(150deg, hsl(${r.hue} 60% 46%), hsl(${r.hue} 70% 22%))` }}
        >
          {r.user.slice(0, 1).toUpperCase()}
        </span>
        <div className="grow">
          {mine ? (
            <strong>{r.user}</strong>
          ) : (
            <Link className="review-user" href={`/profile/u/${userIdFor(r.user)}`}>
              {r.user}
            </Link>
          )}
          <Stars value={r.rating} size={11} />
        </div>
        <span className="review-date">{r.date}</span>
        {mine && <span className="badge free">Kamu</span>}
      </div>
      <p className="review-text">{r.text}</p>
      <button
        type="button"
        className={`helpful ${helpfulOn ? "on" : ""}`}
        onClick={onHelpful}
        aria-pressed={helpfulOn}
      >
        <Sym name="thumb_up" size={14} fill={helpfulOn} />
        {helpfulOn ? "Bermanfaat" : "Bermanfaat?"}
        {r.helpful > 0 && <span>· {r.helpful}</span>}
      </button>
      {r.reply && (
        <div className="review-reply">
          <strong>{r.reply.user}</strong>
          <span>{r.reply.date}</span>
          <p>{r.reply.text}</p>
        </div>
      )}
    </article>
  );
}

function RailSection({ title, slugs }: { title: string; slugs: string[] }) {
  const apps = slugs.map(getApp).filter((a): a is AppItem => Boolean(a));
  if (apps.length === 0) return null;
  return (
    <section className="detail-sec">
      <div className="wrap rail-head">
        <h2>{title}</h2>
      </div>
      <div className="rail pad-left">
        {apps.map((a) => (
          <Link key={a.slug} href={`/apps/${a.slug}`} className="mini-card">
            <AppGlyph initials={a.initials} accent={a.accent} src={a.icon} size={48} />
            <strong>{a.title}</strong>
            {a.ratingCount > 0 ? (
              <span className="mini-rate">
                <Stars value={a.rating} size={10} /> {a.rating.toFixed(1)}
              </span>
            ) : (
              <span className="mini-rate">Belum dirilis</span>
            )}
            <span className="mini-cta">{ctaLabel(a.sourceKind)}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}

function ReviewModal({
  open,
  onClose,
  onSubmit,
  title,
}: {
  open: boolean;
  onClose: () => void;
  onSubmit: (rating: number, text: string) => void;
  title: string;
}) {
  const [rating, setRating] = useState(5);
  const [text, setText] = useState("");
  const [sending, setSending] = useState(false);

  function submit() {
    if (text.trim().length < 5) return;
    setSending(true);
    window.setTimeout(() => {
      onSubmit(rating, text);
      setSending(false);
      setText("");
      setRating(5);
    }, 600);
  }

  return (
    <Modal open={open} title={`Ulas ${title}`} onClose={onClose}>
      <div className="stack-14 review-form">
        <p className="sub">Mock: ulasan tersimpan di perangkat ini saja.</p>
        <StarPicker value={rating} onChange={setRating} />
        <textarea
          rows={4}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Ceritakan pengalamanmu…"
          aria-label="Isi ulasan"
        />
        <div className="review-actions">
          <LoadingButton variant="ghost" onClick={onClose}>
            Batal
          </LoadingButton>
          <LoadingButton
            loading={sending}
            disabled={text.trim().length < 5}
            onClick={submit}
          >
            Kirim
          </LoadingButton>
        </div>
      </div>
    </Modal>
  );
}
