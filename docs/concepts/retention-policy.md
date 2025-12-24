# Retention Policy

Retention policy determines what data Winmem stores, for how long, and at what fidelity.

Retention is critical for:
- cost control
- legal constraints
- performance
- audit requirements

## Default Policy (Recommended)

- Raw references: retain forever
- Proof roots and manifests: retain forever
- Witness logs: retain forever
- Normalized events: retain 90-180 days, then compact
- Full transaction payloads: optional; retain 7-30 days

## Policy Dimensions

- **Windowing**: daily/weekly windows for witness logs and proofs
- **Sampling**: sample events for high-throughput sources
- **Compaction**: collapse event sequences into witness logs
- **Redaction**: exclude sensitive fields from canonical objects
- **Archival triggers**: rules to freeze data

## Per-Project Overrides

Projects can override:
- event retention duration
- sampling rate
- proof batch size
- witness cadence
- archive thresholds

## Compliance Notes

Retention rules may be constrained by:
- data protection policies
- internal security requirements
- jurisdictional requirements

Operators should document their chosen policy in the project manifest.
