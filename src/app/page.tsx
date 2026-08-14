"use client";

import Link from "next/link";
import { AppRow } from "@/components/AppRow";
import { CategoryRail } from "@/components/CategoryRail";
import { FeaturedCard } from "@/components/FeaturedCard";
import { HeroBanner } from "@/components/HeroBanner";
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

  const topRated = [...APPS].sort((a, b) => b.ratingCount - a.ratingCount);
  const newest = [...APPS].sort((a, b) => b.sortDate.localeCompare(a.sortDate));

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

      <section className="wrap banner-sec">
        <HeroBanner />
      </section>

      <section>
        <div className="wrap rail-head">
          <h2>Kategori</h2>
        </div>
        <CategoryRail />
      </section>

      <section>
        <div className="wrap rail-head">
          <h2>Dipilih untukmu</h2>
          <Link href="/apps">Lihat semua</Link>
        </div>
        <div className="rail pad-left">
          {topRated.slice(0, 3).map((app) => (
            <FeaturedCard key={app.slug} app={app} />
          ))}
        </div>
      </section>

      <section className="wrap stack-8">
        <div className="rail-head">
          <h2>Teratas</h2>
        </div>
        {topRated.map((app) => (
          <AppRow key={app.slug} app={app} />
        ))}
      </section>

      <section>
        <div className="wrap rail-head">
          <h2>Baru di XyApps</h2>
        </div>
        <div className="rail pad-left">
          {newest.map((app) => (
            <FeaturedCard key={app.slug} app={app} />
          ))}
        </div>
      </section>
    </div>
  );
}
