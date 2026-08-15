/**
 * Seed: sinkronkan developer + app dari data mock ke database.
 * Jalankan: npm run db:seed
 * (idempoten — pakai ON CONFLICT)
 */
import "dotenv/config";
import { neon } from "@neondatabase/serverless";
import { APPS, DEVELOPERS } from "../src/lib/data";

const url = process.env.DATABASE_URL;
if (!url) {
  console.error("DATABASE_URL tidak disetel.");
  process.exit(1);
}

const sql = neon(url);

async function main() {
  // 1) Developer
  for (const d of DEVELOPERS) {
    await sql`
      INSERT INTO developers (id, name, tagline, bio, website, email, verified, location, joined_at)
      VALUES (${d.id}, ${d.name}, ${d.tagline}, ${d.bio}, ${d.website ?? null},
              ${d.supportEmail}, ${d.verified}, ${d.location ?? null}, now())
      ON CONFLICT (id) DO UPDATE SET
        name = EXCLUDED.name,
        tagline = EXCLUDED.tagline,
        bio = EXCLUDED.bio,
        verified = EXCLUDED.verified,
        location = EXCLUDED.location
    `;
  }

  // 2) App (semua saat ini milik developer pertama)
  const dev = DEVELOPERS[0];
  for (const a of APPS) {
    await sql`
      INSERT INTO apps (
        slug, developer_id, title, tagline, description, category, genre,
        platform, source_kind, age, price, version, size, icon, released
      )
      VALUES (
        ${a.slug}, ${dev.id}, ${a.title}, ${a.tagline}, ${a.description},
        ${a.category}, ${a.genre ?? null}, ${a.platform}, ${a.sourceKind},
        ${a.age}, ${a.price ? Number(a.price.replace(/[^0-9]/g, "")) : null},
        ${a.version}, ${a.size}, ${a.icon}, ${a.released}
      )
      ON CONFLICT (slug) DO UPDATE SET
        title = EXCLUDED.title,
        tagline = EXCLUDED.tagline,
        description = EXCLUDED.description,
        category = EXCLUDED.category,
        genre = EXCLUDED.genre,
        platform = EXCLUDED.platform,
        source_kind = EXCLUDED.source_kind,
        age = EXCLUDED.age,
        price = EXCLUDED.price,
        version = EXCLUDED.version,
        size = EXCLUDED.size,
        icon = EXCLUDED.icon,
        updated_at = now()
    `;
  }

  const apps = await sql`SELECT count(*)::int AS n FROM apps`;
  const devs = await sql`SELECT count(*)::int AS n FROM developers`;
  console.log(
    `Seed selesai: ${(devs[0] as { n: number }).n} developer, ${(apps[0] as { n: number }).n} app`,
  );
}

main().catch((e) => {
  console.error("Seed gagal:", (e as Error).message);
  process.exit(1);
});
