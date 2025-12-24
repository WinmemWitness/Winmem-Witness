import { PrismaClient } from "@prisma/client";
export class AuditRepository {
  constructor(private db: PrismaClient) {}
  listBatches(projectId: string, take=50) { return this.db.auditBatch.findMany({ where: { projectId }, orderBy: { windowEnd: "desc" }, take }); }
  getProofByLeaf(leaf: string) { return this.db.auditItem.findFirst({ where: { leaf } }); }
}
