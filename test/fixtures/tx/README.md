# Transaction fixtures

These fixtures are simplified Solana transaction objects used by unit/integration tests.
They are **not** exact RPC responses; instead they represent the minimum structure
Winmem parsers and normalizers rely on.

If you need to refresh fixtures from real RPC traffic, use:
- `apps/indexer` backfill to pull transactions
- then run a small script to extract + sanitize and store here
