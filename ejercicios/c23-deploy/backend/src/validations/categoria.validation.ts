import { z } from "zod";

export const categoriaCreateSchema = z.object({
  nombre: z.string().trim().min(1, "El nombre es obligatorio").max(100),
});

export type CategoriaCreateInput = z.infer<typeof categoriaCreateSchema>;
