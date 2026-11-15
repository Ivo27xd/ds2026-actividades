import { prisma } from "../config/prisma";

export async function findAll() {
  return prisma.categoria.findMany({
    orderBy: { id: "asc" },
  });
}
