const KEY = "xyapps.library";
const WKEY = "xyapps.wishlist";

export type LibEntry = {
  slug: string;
  installedAt: number;
};

function readKey<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function readLibrary(): LibEntry[] {
  return readKey<LibEntry[]>(KEY, []);
}

export function addToLibrary(slug: string) {
  const next = readLibrary().filter((x) => x.slug !== slug);
  next.unshift({ slug, installedAt: Date.now() });
  localStorage.setItem(KEY, JSON.stringify(next));
}

export function inLibrary(slug: string) {
  return readLibrary().some((x) => x.slug === slug);
}

export function readWishlist(): string[] {
  return readKey<string[]>(WKEY, []);
}

export function inWishlist(slug: string) {
  return readWishlist().includes(slug);
}

/** Mengembalikan true kalau setelah toggle app masuk wishlist. */
export function toggleWishlist(slug: string) {
  const cur = readWishlist();
  const has = cur.includes(slug);
  const next = has ? cur.filter((x) => x !== slug) : [...cur, slug];
  localStorage.setItem(WKEY, JSON.stringify(next));
  return !has;
}
