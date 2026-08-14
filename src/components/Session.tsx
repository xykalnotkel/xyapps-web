"use client";

import {
  createContext,
  useContext,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";

type User = { name: string; email: string };

type Session = {
  user: User | null;
  login: (name: string, email: string) => void;
  logout: () => void;
};

const Ctx = createContext<Session | null>(null);
const KEY = "xyapps.session";

/* Store eksternal (localStorage) dengan cache + subscriber sendiri.
   useSyncExternalStore dipakai supaya baca/tulis tidak lewat effect. */
let cache: User | null | undefined;
const listeners = new Set<() => void>();

function readUser(): User | null {
  if (cache === undefined) {
    try {
      const raw =
        typeof window === "undefined" ? null : localStorage.getItem(KEY);
      cache = raw ? (JSON.parse(raw) as User) : null;
    } catch {
      cache = null;
    }
  }
  return cache;
}

function writeUser(next: User | null) {
  cache = next;
  try {
    if (next) localStorage.setItem(KEY, JSON.stringify(next));
    else localStorage.removeItem(KEY);
  } catch {
    /* penyimpanan tidak tersedia: abaikan */
  }
  listeners.forEach((l) => l());
}

export function SessionProvider({ children }: { children: ReactNode }) {
  const user = useSyncExternalStore(
    (cb) => {
      listeners.add(cb);
      return () => {
        listeners.delete(cb);
      };
    },
    readUser,
    () => null,
  );

  const value = useMemo<Session>(
    () => ({
      user,
      login: (name, email) => writeUser({ name, email }),
      logout: () => writeUser(null),
    }),
    [user],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useSession() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("SessionProvider missing");
  return ctx;
}

/** true hanya setelah hidrasi klien selesai — buat gate loading tanpa effect. */
export function useMounted() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
}
