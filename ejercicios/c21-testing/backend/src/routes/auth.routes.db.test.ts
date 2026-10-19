// ESTE ARCHIVO REQUIERE TENER LA DB DE DOCKER LEVANTADA Y CON SEED
import { describe, it, expect, afterAll } from "vitest";
import request from "supertest";
import app from "../app";
import { prisma } from "../config/prisma";

describe("Auth Routes (Integración con DB)", () => {
  afterAll(async () => {
    await prisma.$disconnect();
  });

  it("login con credenciales válidas devuelve 200 y token sin revelar passwordHash", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: "cliente@libreria.test", password: "Cliente1234" });

    // Imprime en la consola el cuerpo de la respuesta para ver la causa del 500
    console.log("DETALLE DEL ERROR 500:", res.body);

    expect(res.status).toBe(200);
    expect(res.body.token).toEqual(expect.any(String));
    expect(res.body.usuario).toMatchObject({
      email: "cliente@libreria.test",
      rol: "CLIENTE",
    });
    expect(res.body.usuario).not.toHaveProperty("passwordHash");
  });

  it("login con password incorrecta devuelve 401 genérico", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: "cliente@libreria.test", password: "PasswordErronea" });

    expect(res.status).toBe(401);
    expect(res.body).toEqual({ error: "Credenciales inválidas" });
  });
});