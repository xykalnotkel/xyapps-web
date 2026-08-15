import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

export const dynamic = "force-dynamic";

/** Detail satu app dari Postgres. */
export async function GET(
  _req: Request,
  ctx: RouteContext<"/api/v1/apps/[slug]">,
) {
  const { slug } = await ctx.params;
  const url = process.env.DATABASE_URL;
  if (!url) {
    return NextResponse.json({ error: "db_unconfigured" }, { status: 503 });
  }
  try {
    const sql = neon(url);
    const rows = await sql`
      SELECT
        a.slug, a.title, a.tagline, a.description, a.category, a.genre,
        a.platform, a.source_kind, a.age, a.price, a.version, a.size,
        a.icon, a.released,
        d.name AS developer, d.verified AS developer_verified,
        d.id AS developer_id
      FROM apps a
      JOIN developers d ON d.id = a.developer_id
      WHERE a.slug = ${slug}
    `;
    if (rows.length === 0) {
      return NextResponse.json({ error: "not_found" }, { status: 404 });
    }
    return NextResponse.json({ app: rows[0] });
  } catch {
    return NextResponse.json({ error: "db_error" }, { status: 500 });
  }
}
