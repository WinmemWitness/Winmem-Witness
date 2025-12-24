export type Page<T> = { items: T[]; nextCursor: string | null };

export type Project = { id: string; name: string; cluster: string; status: string; description?: string | null };
export type Source = { id: string; kind: string; value: string };
export type Memory = { id: string; kind: string; windowStart: number; windowEnd: number; leafHash?: string | null; content: any };
export type AuditBatch = { id: string; windowStart: number; windowEnd: number; root: string; count: number };
