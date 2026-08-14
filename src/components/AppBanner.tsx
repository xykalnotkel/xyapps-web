"use client";

import { useEffect, useState } from "react";
import { Sym } from "@/components/Icon";

const KEY = "xyapps.banner.dismissed";

/**
 * Banner "Lanjut ke aplikasi" ala Play Store.
 * Muncul sekali per perangkat (dismiss tersimpan). Aplikasi native
 * belum dirilis — tombol Buka menampilkan status mock; nanti diganti
 * deep link intent:// atau universal link app XyApps.
 */
export function AppBanner() {
  const [show, setShow] = useState(false);
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    const id = window.setTimeout(() => {
      try {
        if (!localStorage.getItem(KEY)) setShow(true);
      } catch {
        /* abaikan */
      }
    }, 1400);
    return () => window.clearTimeout(id);
  }, []);

  function close() {
    setShow(false);
    try {
      localStorage.setItem(KEY, "1");
    } catch {
      /* abaikan */
    }
  }

  if (!show) return null;

  return (
    <div className="wrap">
      <div className="app-banner" role="complementary" aria-label="Lanjut ke aplikasi">
        <span className="app-banner-icon">
          <b>Xy</b>
        </span>
        <span className="app-banner-text">
          <strong>Lanjut ke aplikasi</strong>
          {opened ? (
            <em>Aplikasi XyApps belum dirilis — mock.</em>
          ) : (
            <em>Unduh aplikasi XyApps untuk pengalaman penuh.</em>
          )}
        </span>
        <button
          type="button"
          className="app-banner-open"
          onClick={() => setOpened(true)}
        >
          Buka
        </button>
        <button
          type="button"
          className="app-banner-x"
          aria-label="Tutup banner"
          onClick={close}
        >
          <Sym name="close" size={16} />
        </button>
      </div>
    </div>
  );
}
