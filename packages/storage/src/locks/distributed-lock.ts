/**
 * Distributed lock interface. Production deployments can implement
 * redlock or database advisory locks.
 */
export interface DistributedLock {
  acquire(key: string, ttlMs: number): Promise<{ release: () => Promise<void> } | null>;
}

export class InMemoryLock implements DistributedLock {
  private held = new Map<string, number>();
  async acquire(key: string, ttlMs: number) {
    const now = Date.now();
    const until = this.held.get(key) ?? 0;
    if (until > now) return null;
    this.held.set(key, now + ttlMs);
    return { release: async () => { this.held.delete(key); } };
  }
}
