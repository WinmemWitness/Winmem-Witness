# Privacy Notice

Winmem is self-hostable software. Your privacy and data practices depend on how you deploy it.

## What Winmem processes

Winmem ingests and stores:
- public on-chain data (Solana RPC responses)
- normalized events derived from public on-chain activity
- operator-provided configuration (project definitions, policy files)
- optional webhook delivery logs (metadata)

Winmem **does not require** user identity data by default.

## Optional data

Depending on configuration, Winmem may also store:
- API access logs
- user accounts for the dashboard (email + password hash if enabled)
- audit exports and snapshots (which may include operator annotations)

## Redaction

Winmem includes redaction policies to prevent storing:
- private keys / seed phrases
- bearer tokens / API keys
- email addresses (optional)
- long numeric identifiers

You should review `docs/security/data-redaction.md` and tune rules to match your needs.

## Data retention

Retention is configurable per deployment:
- raw events can be stored temporarily
- compressed memory and audit proofs can be kept long-term

See `docs/concepts/retention-policy.md`.

## Third-party services

If you enable LLM summarization, requests may be sent to the configured provider.
You control:
- provider choice
- model
- which content is sent
- whether to enable the feature

## Contact

For questions, see the project website and public channels.
