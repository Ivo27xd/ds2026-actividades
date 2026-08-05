import { Request, Response } from "express";
import {
  findAll,
  findById,
  create as createLibro,
  update as updateLibro,
  remove as removeLibro
} from "../services/libro.service";

export function getAll(req: Request, res: Response) {
  const { disponible } = req.query;

  let disponibleBool: boolean | undefined;

  if (disponible === "true") {
    disponibleBool = true;
  } else if (disponible === "false") {
    disponibleBool = false;
  }

  res.json(findAll(disponibleBool));
}

export function getById(req: Request, res: Response) {
  const id = Number(req.params.id);

  const libro = findById(id);

  if (!libro) {
    res.status(404).json({
      mensaje: "Libro no encontrado"
    });
    return;
  }

  res.json(libro);
}

export function create(req: Request, res: Response) {
  const nuevoLibro = createLibro(req.body);

  res.status(201).json(nuevoLibro);
}

export function update(req: Request, res: Response) {
  const id = Number(req.params.id);

  const libroActualizado = updateLibro(id, req.body);

  if (!libroActualizado) {
    res.status(404).json({
      mensaje: "Libro no encontrado"
    });
    return;
  }

  res.json(libroActualizado);
}

export function remove(req: Request, res: Response) {
  const id = Number(req.params.id);

  const eliminado = removeLibro(id);

  if (!eliminado) {
    res.status(404).json({
      mensaje: "Libro no encontrado"
    });
    return;
  }

  res.status(204).send();
}