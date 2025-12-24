import { SignatureStream } from "./signature-stream.js";

export async function backfill(stream: SignatureStream, onBatch: (items: any[]) => Promise<void>, opts?: { maxBatches?: number; limit?: number }) {
  const maxBatches = opts?.maxBatches ?? 50;
  const limit = opts?.limit ?? 200;
  for (let i = 0; i < maxBatches; i++) {
    const items = await stream.nextBatch(limit);
    if (!items.length) break;
    await onBatch(items);
  }
}
