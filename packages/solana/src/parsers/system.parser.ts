export type Parsed = { program: "system"; type: string; info: any };

export function parseSystemInstruction(_ix: any): Parsed | null {
  // placeholder: implement SystemProgram decode using @solana/web3.js if needed
  return null;
}
