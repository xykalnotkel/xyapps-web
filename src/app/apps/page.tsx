import type { Metadata } from "next";
import { Suspense } from "react";
import { CatalogClient } from "./CatalogClient";
import { ListSkeleton } from "@/components/ui/Skeleton";

export const metadata: Metadata = { title: "Telusuri" };

export default function AppsPage() {
  return (
    <div className="wrap stack-16 page-inner">
      <div>
        <h1 className="page-title">Telusuri</h1>
        <p className="sub">Cari dan saring. Rating palsu tidak ditampilkan.</p>
      </div>
      <Suspense fallback={<ListSkeleton />}>
        <CatalogClient />
      </Suspense>
    </div>
  );
}
