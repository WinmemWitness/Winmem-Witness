import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";
import crypto from "crypto";

/**
 * This regression test validates that golden fixtures are well-formed.
 * In the full repo, you should also compute canonical JSON + hash using
 * packages/cryptography + packages/core and compare with golden hashes.
 */

function sha256Hex(buf: Buffer) {
  return crypto.createHash("sha256").update(buf).digest("hex");
}

describe("golden fixtures integrity", () => {
  it("golden-events files parse", () => {
    const dir = path.join(process.cwd(), "test/regression/golden-events");
    const files = fs.readdirSync(dir).filter((f) => f.endsWith(".json"));
    expect(files.length).toBeGreaterThan(0);

    for (const f of files) {
      const p = path.join(dir, f);
      const raw = fs.readFileSync(p);
      const data = JSON.parse(raw.toString("utf-8"));
      expect(data).toHaveProperty("version");
      expect(data).toHaveProperty("expectedEvent");
      // sanity hash
      expect(sha256Hex(raw).length).toBe(64);
    }
  });

  it("golden-memories files parse", () => {
    const dir = path.join(process.cwd(), "test/regression/golden-memories");
    const files = fs.readdirSync(dir).filter((f) => f.endsWith(".json"));
    expect(files.length).toBeGreaterThan(0);

    for (const f of files) {
      const p = path.join(dir, f);
      const raw = fs.readFileSync(p);
      const data = JSON.parse(raw.toString("utf-8"));
      expect(data).toHaveProperty("version");
      expect(data).toHaveProperty("expected");
    }
  });
});
