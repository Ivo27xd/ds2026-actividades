import { prisma } from "../config/prisma";
import { Prisma } from "../generated/prisma/client";

// Tipo para el listado (Libro + su Autor)
export type LibroConAutor = Prisma.LibroGetPayload<{
  include: { autor: true };
}>;

// Tipo para el detalle (Libro + Autor + Categorías)
export type LibroDetalle = Prisma.LibroGetPayload<{
  include: { autor: true; categorias: true };
}>;

export async function findAll(disponible?: boolean): Promise<LibroConAutor[]> {
  return prisma.libro.findMany({
    where: disponible !== undefined ? { disponible } : undefined,
    include: { autor: true },
    orderBy: {
      id: "asc",
    },
  });
}

export async function findById(id: number): Promise<LibroDetalle | null> {
  return prisma.libro.findUnique({
    where: { id },
    include: { autor: true, categorias: true },
  });
}

export async function create(data: Prisma.LibroCreateInput) {
  return prisma.libro.create({ data });
}

export async function update(id: number, data: Prisma.LibroUpdateInput) {
  return prisma.libro.update({
    where: { id },
    data,
  });
}

export async function remove(id: number) {
  return prisma.libro.delete({
    where: { id },
  });
}