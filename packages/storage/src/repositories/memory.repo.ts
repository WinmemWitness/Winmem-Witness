import { PrismaClient } from "@prisma/client";
export class MemoryRepository {
  constructor(private db: PrismaClient) {}
  list(projectId: string, take=50) { return this.db.memory.findMany({ where: { projectId }, orderBy: { createdAt: "desc" }, take }); }
  create(data: any) { return this.db.memory.create({ data }); }
}
