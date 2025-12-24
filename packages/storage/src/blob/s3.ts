/**
 * S3 blob store stub.
 * Keep this package dependency-free; wire AWS SDK in the app layer if needed.
 */
export type S3Put = { bucket: string; key: string; body: Uint8Array };

export class S3BlobStore {
  constructor(private _opts: { bucket: string }) {}
  async put(_key: string, _data: Buffer): Promise<{ url: string; checksum: string }> {
    throw new Error("S3BlobStore is a stub. Provide an implementation in your deployment.");
  }
}
