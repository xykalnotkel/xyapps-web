const KEY = "xyapps.library";

export type LibEntry = {
  slug: string;
  installedAt: number;
};

export function readLibrary(): LibEntry[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as LibEntry[]) : [];
  } catch {
    return [];
  }
}

export function addToLibrary(slug: string) {
  const next = readLibrary().filter((x) => x.slug !== slug);
  next.unshift({ slug, installedAt: Date.now() });
  localStorage.setItem(KEY, JSON.stringify(next));
}

export function inLibrary(slug: string) {
  return readLibrary().some((x) => x.slug === slug);
}
