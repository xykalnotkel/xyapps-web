const KEY = "xyapps.recent";

export function readRecent(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

export function addRecent(q: string) {
  const t = q.trim();
  if (!t) return;
  const next = [t, ...readRecent().filter((x) => x.toLowerCase() !== t.toLowerCase())].slice(
    0,
    5,
  );
  try {
    localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    /* abaikan */
  }
}

export function clearRecent() {
  try {
    localStorage.removeItem(KEY);
  } catch {
    /* abaikan */
  }
}
