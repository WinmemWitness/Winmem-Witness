# RPC Recommendations

Solana RPC quality determines ingestion reliability and verification speed.

## Recommended Practices

- Use dedicated RPC endpoints with SLAs.
- Configure multiple providers (pool).
- Use different providers for ingestion vs verification when possible.
- Implement bounded retries and exponential backoff.

## Timeouts and Retries

- request timeout: 10-30s depending on provider
- max retries: 3-8
- circuit breaker for failing endpoints

## Rate Limits

- detect 429 responses
- slow down via backoff
- batch requests where supported

## Data Consistency

RPC providers can differ temporarily.
Always store:
- signature
- slot
- blockTime
so clients can independently re-fetch.

## Recommended Providers

Operators should evaluate providers based on:
- throughput
- historical reliability
- geographic latency
- cost and rate limits
