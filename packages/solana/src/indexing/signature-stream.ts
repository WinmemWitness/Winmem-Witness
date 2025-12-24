import { PublicKey } from "@solana/web3.js";
import { RpcPool } from "../rpc-pool/pool.js";

export type SignatureItem = { signature: string; slot: bigint; blockTime?: number | null; err?: string | null };

export class SignatureStream {
  private before: string | undefined;
  constructor(private pool: RpcPool, private address: string) {}

  async nextBatch(limit = 200): Promise<SignatureItem[]> {
    const conn = this.pool.pick();
    const pk = new PublicKey(this.address);
    const sigs = await conn.getSignaturesForAddress(pk, { limit, before: this.before });
    if (sigs.length) this.before = sigs[sigs.length - 1].signature;
    return sigs.map(s => ({ signature: s.signature, slot: BigInt(s.slot), blockTime: s.blockTime ?? null, err: s.err ? JSON.stringify(s.err) : null }));
  }
}
