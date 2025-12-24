/**
 * Winmem Exporter Example
 *
 * Demonstrates using the JS SDK to export an audit snapshot and store it on disk.
 *
 * Run:
 *   pnpm add @winmem/sdk-js
 *   WINMEM_API_BASE_URL=http://localhost:8080
 *   WINMEM_API_TOKEN=...
 *   ts-node exporter-example.ts
 */
import fs from "fs";
import path from "path";
// In your monorepo this import will be "@winmem/sdk-js"
import { WinmemClient } from "../../packages/sdk-js/src/client";

async function main() {
  const baseUrl = process.env.WINMEM_API_BASE_URL || "http://localhost:8080";
  const token = process.env.WINMEM_API_TOKEN || "";
  const projectId = process.env.WINMEM_PROJECT_ID || "token-project";

  if (!token) throw new Error("Missing WINMEM_API_TOKEN");

  const client = new WinmemClient({ baseUrl, token });

  // Export latest snapshot
  const exportResp = await client.exports.createProjectExport(projectId, {
    format: "jsonl",
    includeProofs: true
  });

  const outDir = path.join(process.cwd(), "out");
  fs.mkdirSync(outDir, { recursive: true });

  const outPath = path.join(outDir, `winmem-export-${projectId}-${exportResp.exportId}.json`);
  fs.writeFileSync(outPath, JSON.stringify(exportResp, null, 2));
  console.log("Saved:", outPath);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
