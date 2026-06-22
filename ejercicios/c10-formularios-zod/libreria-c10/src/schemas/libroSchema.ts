import { z } from 'zod'

export const libroSchema = z.object({
    titulo: z
        .string()
        .min(1, 'Ingrese un título'),

    autor: z
        .string()
        .min(1, 'Ingrese un autor'),

    precio: z
        .number({
            error: 'Ingrese un precio'
        })
        .positive('El precio debe ser mayor a 0'),

    disponible: z.boolean()
})

export type LibroValidado =
    z.infer<typeof libroSchema>