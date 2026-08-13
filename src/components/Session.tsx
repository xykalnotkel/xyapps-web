"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type User = { name: string; email: string };

type Session = {
  user: User | null;
  ready: boolean;
  login: (name: string, email: string) => void;
  logout: () => void;
};

const Ctx = createContext<Session | null>(null);
const KEY = "xyapps.session";

export function SessionProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setUser(JSON.parse(raw) as User);
    } catch {
      /* ignore */
    }
    setReady(true);
  }, []);

  const value = useMemo<Session>(
    () => ({
      user,
      ready,
      login: (name, email) => {
        const next = { name, email };
        setUser(next);
        localStorage.setItem(KEY, JSON.stringify(next));
      },
      logout: () => {
        setUser(null);
        localStorage.removeItem(KEY);
      },
    }),
    [user, ready],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useSession() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("SessionProvider missing");
  return ctx;
}
