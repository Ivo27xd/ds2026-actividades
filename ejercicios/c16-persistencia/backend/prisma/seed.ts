import { prisma } from "../src/config/prisma";

const libros = [
  {
    "titulo": "Peter Pan",
    "autor": "Barrie J.M.",
    "imagen": "/imagenes/peter_pan.webp",
    "precio": 15000,
    "disponible": true
  },
  {
    "titulo": "La Invención de Morel",
    "autor": "Adolfo Bioy Casares",
    "imagen": "/imagenes/lidm.webp",
    "precio": 18000,
    "disponible": true
  },
  {
    "titulo": "El Hombre Invisible",
    "autor": "H.G. Wells",
    "imagen": "/imagenes/el_hombre_invisible.jpg",
    "precio": 22000,
    "disponible": false
  },
  {
    "titulo": "El Italiano",
    "autor": "Tito Calderón",
    "imagen": "/imagenes/el_italiano.png",
    "precio": 19000,
    "disponible": true
  },
  {
    "titulo": "Dragon Ball Piccolo 3",
    "autor": "Akira Toriyama",
    "imagen": "/imagenes/dragon_ball.webp",
    "precio": 12000,
    "disponible": true
  },
  {
    "titulo": "Babel",
    "autor": "R.F. Kuang",
    "imagen": "/imagenes/babel.webp",
    "precio": 35000,
    "disponible": false
  }
];

const autores = [
  {
    "nombre": "Barrie J.M.",
    "nacionalidad": "Escocia"
  },
  {
    "nombre": "Adolfo Bioy Casares",
    "nacionalidad": "Argentina"
  },
  {
    "nombre": "H.G. Wells",
    "nacionalidad": "Reino Unido"
  },
  {
    "nombre": "Tito Calderón",
    "nacionalidad": "Italia"
  },
  {
    "nombre": "Akira Toriyama",
    "nacionalidad": "Japón"
  },
  {
    "nombre": "R.F. Kuang",
    "nacionalidad": "China"
  }
];

async function main() {
  await prisma.libro.createMany({ data: libros });
  await prisma.autor.createMany({ data: autores });
}

main();