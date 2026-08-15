import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

export const dynamic = "force-dynamic";

/** Healthcheck database: jumlah baris per tabel inti. */
export async function GET() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    return NextResponse.json({ error: "db_unconfigured" }, { status: 503 });
  }
  try {
    const sql = neon(url);
    const rows = await sql`
      SELECT
        (SELECT count(*)::int FROM users) AS users,
        (SELECT count(*)::int FROM developers) AS developers,
        (SELECT count(*)::int FROM apps) AS apps,
        (SELECT count(*)::int FROM reviews) AS reviews,
        (SELECT count(*)::int FROM releases) AS releases,
        (SELECT count(*)::int FROM tickets) AS tickets,
        (SELECT count(*)::int FROM ingest_tokens) AS ingest_tokens
    `;
    return NextResponse.json({ ok: true, db: rows[0] });
  } catch (e) {
    return NextResponse.json(
      { ok: false, error: "db_error", detail: (e as Error).message },
      { status: 500 },
    );
  }
}
