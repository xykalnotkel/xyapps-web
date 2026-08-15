/**
 * Migrasi skema database.
 * Jalankan: npm run db:migrate
 * (membaca DATABASE_URL dari .env via dotenv)
 */
import "dotenv/config";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { neon } from "@neondatabase/serverless";

async function main() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    console.error("DATABASE_URL tidak disetel. Salin .env.example ke .env.");
    process.exit(1);
  }

  const sql = neon(url);
  const schema = readFileSync(join(process.cwd(), "db", "schema.sql"), "utf8");

  // Neon pooler menolak multi-perintah dalam satu prepared statement —
  // pecah per pernyataan, buang baris komentar, jalankan satu-satu.
  const statements = schema
    .split(";")
    .map((s) =>
      s
        .split("\n")
        .filter((l) => !l.trim().startsWith("--"))
        .join("\n")
        .trim(),
    )
    .filter((s) => s.length > 0);

  for (const stmt of statements) {
    await sql.query(stmt);
  }
  const tables = await sql`
    SELECT table_name FROM information_schema.tables
    WHERE table_schema = 'public' ORDER BY table_name
  `;
  console.log("Migrasi selesai. Tabel aktif:");
  for (const t of tables as { table_name: string }[]) {
    console.log("  -", t.table_name);
  }
}

main().catch((e) => {
  console.error("Migrasi gagal:", (e as Error).message);
  process.exit(1);
});
