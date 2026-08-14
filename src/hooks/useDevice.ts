"use client";

import { useSyncExternalStore } from "react";

/** Deteksi kasar perangkat 32-bit dari User-Agent / Client Hints. */
function detect32(): boolean {
  if (typeof navigator === "undefined") return false;
  const ua = navigator.userAgent;
  if (/armv7|armeabi|i686|x86;/i.test(ua)) return true;
  const m = ua.match(/Android\s+([\d.]+)/);
  if (m && parseFloat(m[1]) < 10 && /arm/i.test(ua)) return true;
  return false;
}

const noop = () => () => {};

/** true = perangkat terdeteksi 32-bit. Aman hidrasi (false di server). */
export function useDeviceIs32() {
  return useSyncExternalStore(noop, detect32, () => false);
}
