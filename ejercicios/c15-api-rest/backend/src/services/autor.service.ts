import { Autor } from "../types/autor.types";

const autores: Autor[] = [
  {
    id: 1,
    nombre: "Barrie J.M.",
    nacionalidad: "Escocia"
  },
  {
    id: 2,
    nombre: "Adolfo Bioy Casares",
    nacionalidad: "Argentina"
  },
  {
    id: 3,
    nombre: "H.G. Wells",
    nacionalidad: "Reino Unido"
  },
  {
    id: 4,
    nombre: "Tito Calderón",
    nacionalidad: "Italia"
  },
  {
    id: 5,
    nombre: "Akira Toriyama",
    nacionalidad: "Japón"
  },
  {
    id: 6,
    nombre: "R.F. Kuang",
    nacionalidad: "China"
  }
];

export function findAll(): Autor[] {
  return autores;
}

export function findById(id: number): Autor | undefined {
  return autores.find(autor => autor.id === id);
}

let proximoId = 7;

export function create(datos: Omit<Autor, "id">): Autor {
  const nuevo: Autor = {
    id: proximoId++,
    ...datos
  };

  autores.push(nuevo);

  return nuevo;
}

export function update(
  id: number,
  datos: Partial<Omit<Autor, "id">>
): Autor | undefined {
  const autor = autores.find(autor => autor.id === id);

  if (!autor) {
    return undefined;
  }

  if (datos.nombre !== undefined) {
    autor.nombre = datos.nombre;
  }

  if (datos.nacionalidad !== undefined) {
    autor.nacionalidad = datos.nacionalidad;
  }

  return autor;
}

export function remove(id: number): boolean {
  const i = autores.findIndex(autor => autor.id === id);

  if (i === -1) {
    return false;
  }

  autores.splice(i, 1);

  return true;
}
