import { prisma } from "../config/prisma";
import { Prisma } from "../generated/prisma/client";
import type { LibroCreateInput, LibroUpdateInput } from "../validations/libro.validation";

// Tipo para el listado y detalle (Libro + Autor + Categorías)
export type LibroConAutor = Prisma.LibroGetPayload<{
  include: { autor: true; categorias: true };
}>;

export type LibroDetalle = LibroConAutor;

const libroInclude = {
  autor: true,
  categorias: true,
} satisfies Prisma.LibroInclude;

export async function findAll(disponible?: boolean): Promise<LibroConAutor[]> {
  return prisma.libro.findMany({
    where: disponible !== undefined ? { disponible } : undefined,
    include: libroInclude,
    orderBy: {
      id: "asc",
    },
  });
}

export async function findById(id: number): Promise<LibroDetalle | null> {
  return prisma.libro.findUnique({
    where: { id },
    include: libroInclude,
  });
}

export async function create(datos: LibroCreateInput): Promise<LibroDetalle> {
  const { categoriaIds, ...campos } = datos;
  return prisma.libro.create({
    data: {
      ...campos,
      ...(categoriaIds && categoriaIds.length > 0
        ? { categorias: { connect: categoriaIds.map((id) => ({ id })) } }
        : {}),
    },
    include: libroInclude,
  });
}

export async function update(id: number, datos: LibroUpdateInput): Promise<LibroDetalle | null> {
  const existe = await prisma.libro.findUnique({ where: { id } });
  if (!existe) return null;

  const { categoriaIds, ...campos } = datos;
  return prisma.libro.update({
    where: { id },
    data: {
      ...campos,
      ...(categoriaIds !== undefined
        ? { categorias: { set: categoriaIds.map((catId) => ({ id: catId })) } }
        : {}),
    },
    include: libroInclude,
  });
}

export async function remove(id: number): Promise<boolean> {
  const existe = await prisma.libro.findUnique({ where: { id } });
  if (!existe) return false;
  await prisma.libro.delete({ where: { id } });
  return true;
}