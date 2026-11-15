import { Request, Response } from "express";
import * as categoriaService from "../services/categoria.service";

export async function getAll(_req: Request, res: Response) {
  return res.json(await categoriaService.findAll());
}

export async function create(req: Request, res: Response) {
  const nueva = await categoriaService.create(req.body.nombre);
  return res.status(201).json(nueva);
}
