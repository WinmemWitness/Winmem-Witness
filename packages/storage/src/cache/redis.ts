/**
 * Redis cache wrapper stub.
 * BullMQ already needs Redis; this wrapper is optional.
 */
export class RedisCache {
  constructor(private _url: string) {}
  async get(_key: string): Promise<string | null> { return null; }
  async set(_key: string, _value: string, _ttlSec?: number): Promise<void> {}
}
