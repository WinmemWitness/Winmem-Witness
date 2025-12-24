# Archive Mode

Archive Mode is a read-only system state designed for long-term preservation and portability.

In Archive Mode:
- ingestion may stop or switch to minimal sampling
- the system focuses on exports and verification
- UI becomes an archive viewer
- mutations are restricted to operator actions (e.g., re-export)

## When to Enter Archive Mode

- project is inactive for a long window (e.g., 60-180 days)
- operator chooses to freeze
- legal or compliance needs require immutability

## Archive Artifacts

An archive export should include:
- project manifest (sources, policies, boundaries)
- raw refs (signatures + metadata)
- witness logs (primary)
- proofs (Merkle roots + paths)
- optional full normalized events
- checksums and a verification script

## Read-Only Guarantees

- no deletion of archived items
- no modification of finalized batches
- exports are content-addressed by hash

## Rehydration

A separate deployment can:
- import an archive
- verify proofs
- expose it in a new API/UI without re-ingesting
