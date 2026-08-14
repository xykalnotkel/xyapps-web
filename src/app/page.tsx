"use client";

import Link from "next/link";
import { AppRow } from "@/components/AppRow";
import { FeaturedCard } from "@/components/FeaturedCard";
import { HomeSkeleton } from "@/components/ui/Skeleton";
import { APPS } from "@/lib/data";
import { useMockLoad } from "@/hooks/useMockLoad";

const chips = ["Untukmu", "Android", "Web", "Desktop", "XySANC", "Tools", "Musik"];

export default function HomePage() {
  const ready = useMockLoad(640);

  if (!ready) {
    return (
      <div className="home">
        <HomeSkeleton />
      </div>
    );
  }

  return (
    <div className="home">
      <div className="wrap">
        <div className="chip-row">
          {chips.map((c, i) => (
            <Link
              key={c}
              href={c === "Untukmu" ? "/" : `/apps?f=${encodeURIComponent(c)}`}
              className={`chip ${i === 0 ? "on" : ""}`}
            >
              {c}
            </Link>
          ))}
        </div>
      </div>

      <section>
        <div className="wrap rail-head">
          <h2>Dipilih untukmu</h2>
          <Link href="/apps">Lihat semua</Link>
        </div>
        <div className="rail pad-left">
          {APPS.slice(0, 3).map((app) => (
            <FeaturedCard key={app.slug} app={app} />
          ))}
        </div>
      </section>

      <section className="wrap stack-8">
        <div className="rail-head">
          <h2>Teratas</h2>
        </div>
        {APPS.map((app) => (
          <AppRow key={app.slug} app={app} />
        ))}
      </section>

      <section>
        <div className="wrap rail-head">
          <h2>Baru di XyApps</h2>
        </div>
        <div className="rail pad-left">
          {APPS.slice()
            .reverse()
            .map((app) => (
              <FeaturedCard key={app.slug} app={app} />
            ))}
        </div>
      </section>
    </div>
  );
}
