import { prisma } from "../config/prisma";

export async function findAll() {
  return prisma.categoria.findMany({
    orderBy: { id: "asc" },
  });
}

export async function create(nombre: string) {
  return prisma.categoria.create({
    data: { nombre },
  });
}
