# Legacy Runtime

Legacy Runtime is Winmem's default operational state for projects that are no longer actively maintained.

A project can stop being maintained without disappearing. Legacy Runtime ensures the project remains:
- observable (activity and status can be inspected)
- inspectable (events and memories are queryable)
- auditable (records are provable and verifiable)

## State Transitions

Winmem models the project lifecycle as state transitions:

- `ACTIVE` -> `LEGACY` -> `ARCHIVED`

A project enters `LEGACY` when:
- no new releases are detected (optional integration)
- no maintainer signals or deployments are observed (optional)
- on-chain activity drops below thresholds for a configured window

Winmem does not guess intent; it applies deterministic policies.

## What Changes in Legacy Runtime

- Ingestion continues (optionally reduced sampling).
- Witness logs shift from "live stream" to "periodic summaries".
- Audit batches become longer windows (to reduce cost).
- API/UI surface the legacy status prominently.
- Export snapshots are encouraged.

## Recommended Defaults

- Legacy detection window: 14-30 days
- Event sampling in legacy: 10-25% for high-volume sources
- Witness cadence: daily or weekly summaries
- Proof batching: per day/week depending on throughput

## Operator Controls

- Force legacy mode (manual override).
- Pin projects to active mode for special cases.
- Configure per-project thresholds.
