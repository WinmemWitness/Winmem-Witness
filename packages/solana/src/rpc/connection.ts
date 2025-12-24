import { Connection } from "@solana/web3.js";

export function createConnection(rpcUrl: string, timeoutMs = 20000): Connection {
  return new Connection(rpcUrl, { commitment: "confirmed", confirmTransactionInitialTimeout: timeoutMs });
}
