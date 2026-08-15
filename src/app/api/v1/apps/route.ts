import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

export const dynamic = "force-dynamic";

/** Katalog app dari Postgres (API v1 — sumber data asli). */
export async function GET() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    return NextResponse.json({ error: "db_unconfigured" }, { status: 503 });
  }
  try {
    const sql = neon(url);
    const rows = await sql`
      SELECT
        a.slug, a.title, a.tagline, a.category, a.genre, a.platform,
        a.source_kind, a.age, a.price, a.version, a.size, a.icon,
        d.name AS developer, d.verified AS developer_verified
      FROM apps a
      JOIN developers d ON d.id = a.developer_id
      ORDER BY a.title
    `;
    return NextResponse.json({ apps: rows });
  } catch {
    return NextResponse.json({ error: "db_error" }, { status: 500 });
  }
}
