import { describe, it, expect, vi } from "vitest";
import type { Request, Response, NextFunction } from "express";
import { authorize, authenticate } from "./auth.middleware";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env";

function crearMocks(reqParcial: Partial<Request> = {}) {
  const res = {
    status: vi.fn().mockReturnThis(),
    json: vi.fn().mockReturnThis(),
  } as unknown as Response;

  const next = vi.fn() as unknown as NextFunction;

  return { req: reqParcial as Request, res, next };
}

describe("auth.middleware (Unitario con mocks)", () => {
  it("authorize responde 403 a un CLIENTE si se requiere ADMIN", () => {
    const { req, res, next } = crearMocks({
      usuario: { id: 2, rol: "CLIENTE" },
    });

    authorize("ADMIN")(req, res, next);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(next).not.toHaveBeenCalled();
  });

  it("authenticate setea req.usuario y llama a next con token válido", () => {
    const token = jwt.sign({ id: 10, rol: "ADMIN" }, JWT_SECRET, { expiresIn: "1h" });
    const { req, res, next } = crearMocks({
      headers: { authorization: `Bearer ${token}` },
    });

    authenticate(req, res, next);

    expect(next).toHaveBeenCalledTimes(1);
    expect(req.usuario).toEqual({ id: 10, rol: "ADMIN" });
  });

  it("authenticate responde 401 si el token está expirado", () => {
    const token = jwt.sign({ id: 10, rol: "ADMIN" }, JWT_SECRET, { expiresIn: "-1s" });
    const { req, res, next } = crearMocks({
      headers: { authorization: `Bearer ${token}` },
    });

    authenticate(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: "Token expirado" });
  });
});