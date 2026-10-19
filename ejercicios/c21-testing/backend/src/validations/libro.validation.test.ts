import { describe, it, expect } from "vitest";
import { libroCreateSchema, idParamSchema } from "./libro.validation";

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

  it("coacciona idParamSchema a un número válido", () => {
    const res = idParamSchema.safeParse({ id: "42" });
    expect(res.success).toBe(true);
    if (res.success) {
      expect(res.data.id).toBe(42);
    }
  });
});