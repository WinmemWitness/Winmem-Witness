import { describe, it, beforeAll, expect } from "vitest";
import fetch from "node-fetch";

const apiBase = process.env.E2E_API_BASE ?? "http://localhost:8080";

async function json(url: string, init?: any) {
  const res = await fetch(url, init);
  const text = await res.text();
  let body: any = null;
  try { body = JSON.parse(text); } catch { body = text; }
  return { res, body };
}

describe("api e2e", () => {
  let token = "";

  beforeAll(async () => {
    // login as dev admin (docker compose dev seeds this user)
    const { res, body } = await json(`${apiBase}/auth/login`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ email: "admin@winmem.local", password: "winmem" })
    });
    expect(res.status).toBe(200);
    token = body.accessToken;
    expect(typeof token).toBe("string");
  });

  it("lists projects", async () => {
    const { res, body } = await json(`${apiBase}/projects`, {
      headers: { authorization: `Bearer ${token}` }
    });
    expect(res.status).toBe(200);
    expect(Array.isArray(body.items)).toBe(true);
  });

  it("creates a project (idempotent)", async () => {
    const payload = {
      id: "e2e-project",
      name: "E2E Project",
      kind: "token",
      spec: { mint: "So11111111111111111111111111111111111111112" }
    };

    const { res, body } = await json(`${apiBase}/projects`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${token}`
      },
      body: JSON.stringify(payload)
    });

    expect([200, 201, 409]).toContain(res.status);
    // 409 allowed if already exists
    if (res.status !== 409) {
      expect(body).toHaveProperty("id", "e2e-project");
    }
  });
});
