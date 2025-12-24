# Pagination

Winmem uses cursor-based pagination for list endpoints.

## Parameters

- `limit` (optional): number of items to return (default 50, max 200)
- `cursor` (optional): opaque cursor string returned by the previous response

## Response Shape (Recommended)

List endpoints should return:

- `items`: array of results
- `nextCursor`: cursor for the next page (or null)

Example:

```json
{
  "items": [{ "...": "..." }],
  "nextCursor": "eyJpZCI6IjEyMyJ9"
}
```

## Best Practices

- Keep cursors opaque (base64-encoded JSON or similar).
- Sort by stable key (createdAt, id) to avoid duplicates.
- Use consistent filtering with pagination.
