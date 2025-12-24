/**
 * Checkpoint model used for resumable indexing.
 */
export type Checkpoint = { id: string; cursor?: string; updatedAt: string };

export function makeCheckpoint(id: string, cursor?: string): Checkpoint {
  return { id, cursor, updatedAt: new Date().toISOString() };
}
