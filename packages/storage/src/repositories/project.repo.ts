import { PrismaClient } from "@prisma/client";

export class ProjectRepository {
  constructor(private db: PrismaClient) {}
  list(tenantId: string) { return this.db.project.findMany({ where: { tenantId }, orderBy: { createdAt: "desc" } }); }
  get(tenantId: string, id: string) { return this.db.project.findFirst({ where: { tenantId, id } }); }
  create(tenantId: string, input: { name: string; description?: string; cluster: string }) { return this.db.project.create({ data: { tenantId, ...input } }); }
}
