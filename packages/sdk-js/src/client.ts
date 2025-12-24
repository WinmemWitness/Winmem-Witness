import { joinUrl, readJson } from "./helpers.js";
import type { Page, Project, Source, Memory, AuditBatch } from "./types.js";

export type ClientOpts = { baseUrl: string; apiKey?: string; fetch?: typeof fetch };

export class WinmemClient {
  private baseUrl: string;
  private apiKey?: string;
  private f: typeof fetch;

  constructor(opts: ClientOpts) {
    this.baseUrl = opts.baseUrl;
    this.apiKey = opts.apiKey;
    this.f = opts.fetch ?? fetch;
  }

  private headers(): Record<string, string> {
    const h: Record<string, string> = { "content-type": "application/json" };
    if (this.apiKey) h["x-winmem-api-key"] = this.apiKey;
    return h;
  }

  whoami() {
    return readJson<{ role: string; tenantId: string }>(
      this.f(joinUrl(this.baseUrl, "/v1/auth/whoami"), { headers: this.headers() })
    );
  }

  projects = {
    list: (q?: { limit?: number; cursor?: string }) =>
      readJson<Page<Project>>(this.f(joinUrl(this.baseUrl, `/v1/projects?limit=${q?.limit ?? 50}${q?.cursor ? `&cursor=${encodeURIComponent(q.cursor)}` : ""}`), { headers: this.headers() })),
    create: (body: { name: string; cluster: "mainnet-beta"|"devnet"|"testnet"; description?: string }) =>
      readJson<Project>(this.f(joinUrl(this.baseUrl, "/v1/projects"), { method: "POST", headers: this.headers(), body: JSON.stringify(body) })),
    get: (id: string) =>
      readJson<Project>(this.f(joinUrl(this.baseUrl, `/v1/projects/${id}`), { headers: this.headers() }))
  };

  sources = {
    list: (projectId: string) =>
      readJson<Source[]>(this.f(joinUrl(this.baseUrl, `/v1/projects/${projectId}/sources`), { headers: this.headers() })),
    add: (projectId: string, body: { kind: "ADDRESS"|"PROGRAM"|"ACCOUNT_SNAPSHOT"; value: string }) =>
      readJson<Source>(this.f(joinUrl(this.baseUrl, `/v1/projects/${projectId}/sources`), { method: "POST", headers: this.headers(), body: JSON.stringify(body) }))
  };

  memories = {
    list: (projectId: string, q?: { limit?: number; cursor?: string; kind?: string }) => {
      const qs = new URLSearchParams();
      qs.set("limit", String(q?.limit ?? 50));
      if (q?.cursor) qs.set("cursor", q.cursor);
      if (q?.kind) qs.set("kind", q.kind);
      return readJson<Page<Memory>>(this.f(joinUrl(this.baseUrl, `/v1/projects/${projectId}/memories?${qs.toString()}`), { headers: this.headers() }));
    }
  };

  audits = {
    batches: (projectId: string, q?: { limit?: number }) =>
      readJson<{ items: AuditBatch[]; nextCursor: string | null }>(this.f(joinUrl(this.baseUrl, `/v1/projects/${projectId}/audits/batches?limit=${q?.limit ?? 50}`), { headers: this.headers() })),
    proof: (leaf: string) =>
      readJson<any>(this.f(joinUrl(this.baseUrl, `/v1/audits/proof?leaf=${encodeURIComponent(leaf)}`), { headers: this.headers() }))
  };

  exports = {
    list: (projectId: string) =>
      readJson<any>(this.f(joinUrl(this.baseUrl, `/v1/projects/${projectId}/exports`), { headers: this.headers() })),
    create: (projectId: string) =>
      readJson<any>(this.f(joinUrl(this.baseUrl, `/v1/projects/${projectId}/exports`), { method: "POST", headers: this.headers() })),
    get: (exportId: string) =>
      readJson<any>(this.f(joinUrl(this.baseUrl, `/v1/exports/${exportId}`), { headers: this.headers() }))
  };
}
