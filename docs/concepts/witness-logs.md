# Witness Logs

Witness Logs are structured memory entries that describe what happened on-chain during a specific window.

They are not raw logs and not narrative fiction. They are a compression layer:
- derived from normalized events
- linked to raw transaction signatures
- bounded by deterministic time/slot ranges
- accompanied by audit proofs

## Structure

A witness log typically includes:

- `project_id`
- `window`: start/end time and slot range
- `event_counts`: counts by event type
- `key_changes`: detected changes in state or behavior
- `notable_signatures`: pointers to representative transactions
- `checksums`: canonical hash and Merkle batch references

## Determinism Requirements

Even if Winmem uses an LLM for summaries:
- the underlying event set is deterministic
- the input window boundaries are deterministic
- the output must conform to a schema
- the log must include provenance metadata (model, prompt hash, config)

## Output Formats

- JSON (canonical)
- Markdown (human-readable)
- "Windows log" style (UI mode)

## Query Patterns

- timeline view (windowed)
- event type filters
- search by signature
- audit proof lookup

## Anti-Goals

- Do not invent facts not present on-chain.
- Do not hide errors; log them as part of witness output.
- Do not include secrets or private config.
