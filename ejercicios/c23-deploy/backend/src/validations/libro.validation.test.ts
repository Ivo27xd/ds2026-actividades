import { describe, it, expect } from "vitest";
import { libroCreateSchema, libroUpdateSchema, idParamSchema, IMAGEN_PLACEHOLDER } from "./libro.validation";

const libroValido = {
  titulo: "Rayuela",
  precio: 7000,
  imagen: "https://ejemplo.com/rayuela.jpg",
  autorId: 1,
};

describe("libroCreateSchema (Unitario)", () => {
  it("rechaza si el precio es negativo", () => {
    const res = libroCreateSchema.safeParse({ ...libroValido, precio: -500 });
    expect(res.success).toBe(false);
  });

  it("recorta los espacios innecesarios del título", () => {
    const res = libroCreateSchema.safeParse({ ...libroValido, titulo: "   Rayuela   " });
    expect(res.success).toBe(true);
    if (res.success) {
      expect(res.data.titulo).toBe("Rayuela");
    }
  });

  it("asigna la imagen placeholder si no se envía imagen", () => {
    const res = libroCreateSchema.safeParse({
      titulo: "Rayuela",
      precio: 7000,
      imagen: "   ",
      autorId: 1,
    });
    expect(res.success).toBe(true);
    if (res.success) {
      expect(res.data.imagen).toBe(IMAGEN_PLACEHOLDER);
    }
  });

  it("no pisa la imagen existente en libroUpdateSchema cuando no se envía", () => {
    const res = libroUpdateSchema.safeParse({ disponible: false });
    expect(res.success).toBe(true);
    if (res.success) {
      expect(res.data).toEqual({ disponible: false });
      expect("imagen" in res.data).toBe(false);
    }
  });

  it("coacciona idParamSchema a un número válido", () => {
    const res = idParamSchema.safeParse({ id: "42" });
    expect(res.success).toBe(true);
    if (res.success) {
      expect(res.data.id).toBe(42);
    }
  });
});