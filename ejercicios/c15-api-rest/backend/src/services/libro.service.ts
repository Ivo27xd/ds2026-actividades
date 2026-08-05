import { Libro } from "../types/libro.types";

const libros: Libro[] = [
  {
    id: 1,
    titulo: "Peter Pan",
    autor: "Barrie J.M.",
    imagen: "/imagenes/peter_pan.webp",
    precio: 15000,
    disponible: true
  },
  {
    id: 2,
    titulo: "La Invención de Morel",
    autor: "Adolfo Bioy Casares",
    imagen: "/imagenes/lidm.webp",
    precio: 18000,
    disponible: true
  },
  {
    id: 3,
    titulo: "El Hombre Invisible",
    autor: "H.G. Wells",
    imagen: "/imagenes/el_hombre_invisible.jpg",
    precio: 22000,
    disponible: false
  },
  {
    id: 4,
    titulo: "El Italiano",
    autor: "Tito Calderón",
    imagen: "/imagenes/el_italiano.png",
    precio: 19000,
    disponible: true
  },
  {
    id: 5,
    titulo: "Dragon Ball Piccolo 3",
    autor: "Akira Toriyama",
    imagen: "/imagenes/dragon_ball.webp",
    precio: 12000,
    disponible: true
  },
  {
    id: 6,
    titulo: "Babel",
    autor: "R.F. Kuang",
    imagen: "/imagenes/babel.webp",
    precio: 35000,
    disponible: false
  }
];

let proximoId = 7;

export function findAll(disponible?: boolean): Libro[] {
  if (disponible === undefined) return libros;
  return libros.filter(libro => libro.disponible === disponible);
}

export function findById(id: number): Libro | undefined {
  return libros.find(libro => libro.id === id);
}

export function create(datos: Omit<Libro, "id">): Libro {
  const nuevo: Libro = { id: proximoId++, ...datos };
  libros.push(nuevo);
  return nuevo;
}

export function update(
  id: number,
  datos: Partial<Omit<Libro, "id">>
): Libro | undefined {
  const libro = libros.find(libro => libro.id === id);

  if (!libro) {
    return undefined;
  }

  if (datos.titulo !== undefined) {
    libro.titulo = datos.titulo;
  }

  if (datos.autor !== undefined) {
    libro.autor = datos.autor;
  }

  if (datos.precio !== undefined) {
    libro.precio = datos.precio;
  }

  if (datos.imagen !== undefined) {
    libro.imagen = datos.imagen;
  }

  if (datos.disponible !== undefined) {
    libro.disponible = datos.disponible;
  }

  return libro;
}

export function remove(id: number): boolean {
  const i = libros.findIndex(libro => libro.id === id);
  if (i === -1) return false;
  libros.splice(i, 1);
  return true;
}