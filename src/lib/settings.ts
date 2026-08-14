const KEY = "xyapps.settings";

export type Settings = {
  notifDownload: boolean;
  notifUpdate: boolean;
  autoUpdate: boolean;
  /** Dev: simulasi perangkat 32-bit untuk uji alur inkompatibel. */
  sim32: boolean;
};

const DEFAULTS: Settings = {
  notifDownload: true,
  notifUpdate: true,
  autoUpdate: false,
  sim32: false,
};

export function readSettings(): Settings {
  if (typeof window === "undefined") return DEFAULTS;
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? { ...DEFAULTS, ...(JSON.parse(raw) as Partial<Settings>) } : DEFAULTS;
  } catch {
    return DEFAULTS;
  }
}

export function writeSettings(s: Settings) {
  try {
    localStorage.setItem(KEY, JSON.stringify(s));
  } catch {
    /* abaikan */
  }
}
