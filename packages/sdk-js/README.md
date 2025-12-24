# Winmem SDK (JS)

Type-safe client for Winmem API.

```ts
import { WinmemClient } from "@winmem/sdk-js";

const client = new WinmemClient({ baseUrl: "http://localhost:8787", apiKey: "..." });
const projects = await client.projects.list({ limit: 50 });
```
