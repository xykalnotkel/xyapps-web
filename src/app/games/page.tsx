import type { Metadata } from "next";
import { Suspense } from "react";
import { CatalogClient } from "@/app/apps/CatalogClient";
import { ListSkeleton } from "@/components/ui/Skeleton";

export const metadata: Metadata = { title: "Game" };

export default function GamesPage() {
  return (
    <div className="wrap stack-16 page-inner">
      <div>
        <h1 className="page-title">Game</h1>
        <p className="sub">Genre, rating, dan gerbang unduh yang sama — khusus game.</p>
      </div>
      <Suspense fallback={<ListSkeleton />}>
        <CatalogClient mode="games" />
      </Suspense>
    </div>
  );
}
