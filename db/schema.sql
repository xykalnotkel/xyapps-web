-- Skema database XyApps (Postgres / Neon)
-- Dijalankan oleh: npm run db:migrate

CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- ============================================================
-- USERS — akun pengguna & developer
-- ============================================================
CREATE TABLE IF NOT EXISTS users (
  id            TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  name          TEXT NOT NULL,
  email         TEXT UNIQUE,
  xy_id         TEXT UNIQUE,
  password_hash TEXT,
  image         TEXT,
  role          TEXT NOT NULL DEFAULT 'user'
                CHECK (role IN ('user', 'developer', 'admin')),
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================================
-- DEVELOPERS — profil developer resmi XySpace
-- ============================================================
CREATE TABLE IF NOT EXISTS developers (
  id        TEXT PRIMARY KEY,          -- id hash publik (profil /profile/dev/[id])
  name      TEXT NOT NULL,
  tagline   TEXT,
  bio       TEXT,
  website   TEXT,
  email     TEXT NOT NULL,
  verified  BOOLEAN NOT NULL DEFAULT false,
  location  TEXT,
  joined_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================================
-- APPS — metadata listing toko
-- ============================================================
CREATE TABLE IF NOT EXISTS apps (
  slug          TEXT PRIMARY KEY,
  developer_id  TEXT NOT NULL REFERENCES developers(id) ON DELETE CASCADE,
  title         TEXT NOT NULL,
  tagline       TEXT,
  description   TEXT,
  category      TEXT NOT NULL,
  genre         TEXT,
  platform      TEXT NOT NULL,
  source_kind   TEXT NOT NULL DEFAULT 'xysanc',
  age           TEXT NOT NULL DEFAULT '3+',
  price         INTEGER,               -- rupiah, null = gratis
  version       TEXT,
  size          TEXT,
  icon          TEXT,
  released      TEXT,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================================
-- RELEASES — rilis AAB/APK + status XyScan
-- ============================================================
CREATE TABLE IF NOT EXISTS releases (
  id          TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  app_slug    TEXT NOT NULL REFERENCES apps(slug) ON DELETE CASCADE,
  version     TEXT NOT NULL,
  size_bytes  BIGINT,
  sha256      TEXT,
  status      TEXT NOT NULL DEFAULT 'pending_scan'
              CHECK (status IN ('pending_scan', 'scanning', 'published', 'needs_review', 'rejected')),
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================================
-- REVIEWS — rating & ulasan
-- ============================================================
CREATE TABLE IF NOT EXISTS reviews (
  id          TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  app_slug    TEXT NOT NULL REFERENCES apps(slug) ON DELETE CASCADE,
  user_id     TEXT REFERENCES users(id) ON DELETE SET NULL,
  rating      INT NOT NULL CHECK (rating BETWEEN 1 AND 5),
  text        TEXT,
  helpful     INT NOT NULL DEFAULT 0,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_reviews_app ON reviews (app_slug);

-- ============================================================
-- TICKETS — tiket unduh (HMAC, TTL 10 menit)
-- ============================================================
CREATE TABLE IF NOT EXISTS tickets (
  token       TEXT PRIMARY KEY,
  app_slug    TEXT NOT NULL REFERENCES apps(slug) ON DELETE CASCADE,
  user_id     TEXT REFERENCES users(id) ON DELETE SET NULL,
  expires_at  TIMESTAMPTZ NOT NULL,
  used_at     TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_tickets_expires ON tickets (expires_at);

-- ============================================================
-- INGEST TOKENS — token developer untuk upload/CI (scope minimal)
-- ============================================================
CREATE TABLE IF NOT EXISTS ingest_tokens (
  id            TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  developer_id  TEXT NOT NULL REFERENCES developers(id) ON DELETE CASCADE,
  token_hash    TEXT NOT NULL,         -- hash, bukan plaintext
  scope         TEXT NOT NULL DEFAULT 'upload_asset',
  last_used_at  TIMESTAMPTZ,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);
