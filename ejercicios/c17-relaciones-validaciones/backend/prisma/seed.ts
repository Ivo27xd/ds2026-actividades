import { prisma } from "../src/config/prisma";

const autores = [
  { nombre: "Barrie J.M.", nacionalidad: "Escocia" },
  { nombre: "Adolfo Bioy Casares", nacionalidad: "Argentina" },
  { nombre: "H.G. Wells", nacionalidad: "Reino Unido" },
  { nombre: "Tito Calderón", nacionalidad: "Italia" },
  { nombre: "Akira Toriyama", nacionalidad: "Japón" },
  { nombre: "R.F. Kuang", nacionalidad: "China" },
];

const categorias = [
  { nombre: "Novela" },
  { nombre: "Ciencia Ficción" },
  { nombre: "Fantasía" },
  { nombre: "Manga / Cómic" },
];

const libros = [
  {
    titulo: "Peter Pan",
    autor: "Barrie J.M.",
    imagen: "/imagenes/peter_pan.webp",
    precio: 15000,
    disponible: true,
    cats: ["Fantasía"],
  },
  {
    titulo: "La Invención de Morel",
    autor: "Adolfo Bioy Casares",
    imagen: "/imagenes/lidm.webp",
    precio: 18000,
    disponible: true,
    cats: ["Novela", "Ciencia Ficción"],
  },
  {
    titulo: "El Hombre Invisible",
    autor: "H.G. Wells",
    imagen: "/imagenes/el_hombre_invisible.jpg",
    precio: 22000,
    disponible: false,
    cats: ["Ciencia Ficción"],
  },
  {
    titulo: "El Italiano",
    autor: "Tito Calderón",
    imagen: "/imagenes/el_italiano.png",
    precio: 19000,
    disponible: true,
    cats: ["Novela"],
  },
  {
    titulo: "Dragon Ball Piccolo 3",
    autor: "Akira Toriyama",
    imagen: "/imagenes/dragon_ball.webp",
    precio: 12000,
    disponible: true,
    cats: ["Manga / Cómic"],
  },
  {
    titulo: "Babel",
    autor: "R.F. Kuang",
    imagen: "/imagenes/babel.webp",
    precio: 35000,
    disponible: false,
    cats: ["Fantasía", "Novela"],
  },
];

async function main() {
  await prisma.autor.createMany({ data: autores });
  await prisma.categoria.createMany({ data: categorias });

  for (const { autor, cats, ...datos } of libros) {
    await prisma.libro.create({
      data: {
        ...datos,
        autor: { connect: { nombre: autor } },
        categorias: { connect: cats.map((nombre) => ({ nombre })) },
      },
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });