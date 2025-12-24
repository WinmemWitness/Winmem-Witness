-- Winmem PostgreSQL bootstrap
-- This file initializes extensions and creates schema-level defaults.
-- Safe to run multiple times where possible.

CREATE EXTENSION IF NOT EXISTS pgcrypto;
CREATE EXTENSION IF NOT EXISTS citext;

-- Optional: enable pg_stat_statements for performance analysis
-- CREATE EXTENSION IF NOT EXISTS pg_stat_statements;

-- Minimal schema scaffolding (real schema created via migrations in packages/storage/prisma)
-- The init script ensures the DB is ready and has recommended extensions.
