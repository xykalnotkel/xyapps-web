import type { Metadata } from "next";
import { CatalogClient } from "./CatalogClient";

export const metadata: Metadata = { title: "Katalog" };

export default function AppsPage() {
  return (
    <div className="wrap section">
      <h2>Katalog</h2>
      <p className="sub">Filter dan cari di client. Data masih mock.</p>
      <CatalogClient />
    </div>
  );
}
