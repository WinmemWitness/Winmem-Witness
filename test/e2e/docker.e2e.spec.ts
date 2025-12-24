import { describe, it, beforeAll, afterAll, expect } from "vitest";
import execa from "execa";
import fetch from "node-fetch";

const composeFile = "infra/docker/docker-compose.dev.yml";
const apiBase = process.env.E2E_API_BASE ?? "http://localhost:8080";

async function waitFor(url: string, timeoutMs = 120_000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      const res = await fetch(url);
      if (res.ok) return;
    } catch {
      // ignore
    }
    await new Promise((r) => setTimeout(r, 1000));
  }
  throw new Error(`Timeout waiting for ${url}`);
}

describe("docker stack e2e", () => {
  beforeAll(async () => {
    await execa("docker", ["compose", "-f", composeFile, "up", "-d"], { stdio: "inherit" });
    await waitFor(`${apiBase}/health/live`);
    await waitFor(`${apiBase}/health/ready`);
  }, 180_000);

  afterAll(async () => {
    await execa("docker", ["compose", "-f", composeFile, "down", "-v"], { stdio: "inherit" });
  }, 180_000);

  it("serves health endpoints", async () => {
    const live = await fetch(`${apiBase}/health/live`);
    expect(live.status).toBe(200);
    const ready = await fetch(`${apiBase}/health/ready`);
    expect(ready.status).toBe(200);
  });

  it("returns version info", async () => {
    const res = await fetch(`${apiBase}/health/info`);
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body).toHaveProperty("name");
    expect(body).toHaveProperty("version");
  });
});
