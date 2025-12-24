import { PrismaClient } from "@prisma/client";
export class SourceRepository {
  constructor(private db: PrismaClient) {}
  list(projectId: string) { return this.db.source.findMany({ where: { projectId }, orderBy: { createdAt: "desc" } }); }
  create(projectId: string, kind: any, value: string) { return this.db.source.create({ data: { projectId, kind, value } }); }
}
