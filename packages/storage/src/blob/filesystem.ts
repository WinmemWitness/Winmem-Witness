import fs from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";

export class FilesystemBlobStore {
  constructor(private baseDir: string) {}
  async put(key: string, data: Buffer): Promise<{ url: string; checksum: string }> {
    await fs.mkdir(this.baseDir, { recursive: true });
    const full = path.join(this.baseDir, key);
    await fs.mkdir(path.dirname(full), { recursive: true });
    await fs.writeFile(full, data);
    const checksum = crypto.createHash("sha256").update(data).digest("hex");
    return { url: `file://${path.resolve(full)}`, checksum };
  }
}
