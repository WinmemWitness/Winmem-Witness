export type Parsed = { program: "memo"; memo: string };
export function parseMemoInstruction(ix: { data?: string | Uint8Array }): Parsed | null {
  if (!ix?.data) return null;
  try {
    if (typeof ix.data === "string") return { program: "memo", memo: ix.data };
    return { program: "memo", memo: Buffer.from(ix.data).toString("utf8") };
  } catch { return null; }
}
