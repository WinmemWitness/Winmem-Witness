import { Connection } from "@solana/web3.js";
import { createConnection } from "../rpc/connection.js";

export type RpcEndpoint = { url: string; weight: number };
export class RpcPool {
  private endpoints: RpcEndpoint[];
  constructor(endpoints: RpcEndpoint[], private timeoutMs = 20000) {
    if (!endpoints.length) throw new Error("RpcPool requires at least one endpoint");
    this.endpoints = endpoints.map(e => ({ url: e.url, weight: Math.max(1, e.weight) }));
  }
  pick(): Connection {
    const total = this.endpoints.reduce((a, e) => a + e.weight, 0);
    let r = Math.random() * total;
    for (const e of this.endpoints) {
      r -= e.weight;
      if (r <= 0) return createConnection(e.url, this.timeoutMs);
    }
    return createConnection(this.endpoints[0].url, this.timeoutMs);
  }
}
