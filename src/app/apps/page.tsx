import type { Metadata } from "next";
import { Suspense } from "react";
import { CatalogClient } from "./CatalogClient";
import { ListSkeleton } from "@/components/ui/Skeleton";

export const metadata: Metadata = { title: "Aplikasi" };

export default function AppsPage() {
  return (
    <div className="wrap stack-16 page-inner">
      <div>
        <h1 className="page-title">Aplikasi</h1>
        <p className="sub">Aplikasi non-game. Game ada di tab Game.</p>
      </div>
      <Suspense fallback={<ListSkeleton />}>
        <CatalogClient mode="apps" />
      </Suspense>
    </div>
  );
}
