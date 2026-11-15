import { describe, it, expect } from "vitest";
import request from "supertest";
import jwt from "jsonwebtoken";
import app from "../app";
import { JWT_SECRET } from "../config/env";

const tokenCliente = jwt.sign({ id: 2, rol: "CLIENTE" }, JWT_SECRET, { expiresIn: "1h" });
const tokenAdmin = jwt.sign({ id: 1, rol: "ADMIN" }, JWT_SECRET, { expiresIn: "1h" });

describe("Matriz de Permisos /api/libros (Integración sin DB)", () => {
  it("POST /api/libros sin token devuelve 401", async () => {
    const res = await request(app).post("/api/libros").send({
      titulo: "El Tunel",
      precio: 10000,
      imagen: "test.jpg",
      autorId: 1,
    });

    expect(res.status).toBe(401);
  });

  it("POST /api/libros como CLIENTE devuelve 403", async () => {
    const res = await request(app)
      .post("/api/libros")
      .set("Authorization", `Bearer ${tokenCliente}`)
      .send({
        titulo: "El Tunel",
        precio: 10000,
        imagen: "test.jpg",
        autorId: 1,
      });

    expect(res.status).toBe(403);
  });

  it("POST /api/libros como ADMIN con body inválido devuelve 400 (no 403)", async () => {
    const res = await request(app)
      .post("/api/libros")
      .set("Authorization", `Bearer ${tokenAdmin}`)
      .send({
        precio: -100,
      });

    expect(res.status).toBe(400);
  });
});