-- ClickHouse optional schema for high-volume event storage
-- Use with docker compose --profile clickhouse up -d

CREATE DATABASE IF NOT EXISTS winmem;

CREATE TABLE IF NOT EXISTS winmem.events
(
  tenant_id String,
  project_id String,
  signature String,
  slot UInt64,
  block_time UInt32,
  event_type LowCardinality(String),
  data_json String,
  created_at DateTime DEFAULT now()
)
ENGINE = MergeTree
PARTITION BY toYYYYMM(toDateTime(block_time))
ORDER BY (tenant_id, project_id, slot, signature);

CREATE TABLE IF NOT EXISTS winmem.audit_batches
(
  tenant_id String,
  project_id String,
  batch_id String,
  window_start UInt32,
  window_end UInt32,
  root String,
  count UInt64,
  created_at DateTime DEFAULT now()
)
ENGINE = MergeTree
PARTITION BY toYYYYMM(toDateTime(window_end))
ORDER BY (tenant_id, project_id, window_end, batch_id);
