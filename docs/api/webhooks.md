# Webhooks

Webhooks allow Winmem to notify external systems about significant events.

## Supported Events

- `project.status.changed`
- `memory.created`
- `audit.batch.finalized`
- `archive.ready`
- `export.ready`

## Webhook Delivery

- POST JSON requests to subscriber URLs
- include `X-WINMEM-SIGNATURE` header (HMAC)
- include `X-WINMEM-EVENT` header (event name)
- include `X-WINMEM-DELIVERY` header (unique delivery ID)

## Retries

- exponential backoff
- retry on network errors and 5xx responses
- do not retry on 4xx except 429

## Payload Example

```json
{
  "event": "audit.batch.finalized",
  "deliveryId": "d3f7b9a4-...",
  "timestamp": "2026-01-01T00:00:00Z",
  "data": {
    "projectId": "proj_...",
    "batchId": "batch_...",
    "root": "abcd..."
  }
}
```

## Security

- Validate signature on receipt.
- Use allowlists or private network endpoints for internal webhooks.
- Consider per-subscriber secrets.
