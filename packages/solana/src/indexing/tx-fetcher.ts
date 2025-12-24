import { RpcPool } from "../rpc-pool/pool.js";

export class TxFetcher {
  constructor(private pool: RpcPool) {}
  async fetch(signature: string) {
    const conn = this.pool.pick();
    return await conn.getTransaction(signature, { commitment: "confirmed", maxSupportedTransactionVersion: 0 });
  }
}
