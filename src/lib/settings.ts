const KEY = "xyapps.settings";

export type Settings = {
  notifDownload: boolean;
  notifUpdate: boolean;
  autoUpdate: boolean;
};

const DEFAULTS: Settings = {
  notifDownload: true,
  notifUpdate: true,
  autoUpdate: false,
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
