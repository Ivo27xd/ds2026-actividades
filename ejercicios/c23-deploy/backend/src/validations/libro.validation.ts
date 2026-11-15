import { z } from "zod";

export const IMAGEN_PLACEHOLDER = "/imagenes/placeholder-libro.svg";

const libroBaseSchema = z.object({
  titulo: z.string().trim().min(1, "El título es obligatorio").max(200),
  precio: z.number().int().positive("El precio debe ser mayor a 0"),
  imagen: z.string().trim().optional(),
  disponible: z.boolean().optional(),
  autorId: z.number().int().positive("El autor es obligatorio"),
  categoriaIds: z.array(z.number().int().positive()).optional(),
});

export const libroCreateSchema = libroBaseSchema.transform((data) => ({
  ...data,
  imagen: data.imagen || IMAGEN_PLACEHOLDER,
}));

export const libroUpdateSchema = libroBaseSchema.partial().transform((data) => ({
  ...data,
  ...(data.imagen !== undefined ? { imagen: data.imagen || IMAGEN_PLACEHOLDER } : {}),
}));

export type LibroCreateInput = z.infer<typeof libroCreateSchema>;
export type LibroUpdateInput = z.infer<typeof libroUpdateSchema>;

export const idParamSchema = z.object({
  id: z.coerce.number().int().positive("El id debe ser un número positivo"),
});