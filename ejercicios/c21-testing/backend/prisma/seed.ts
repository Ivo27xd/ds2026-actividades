import { prisma } from "../src/config/prisma";
import bcrypt from "bcrypt";

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

const usuarios = [
  {
    email: "admin@libreria.test",
    nombre: "Admin",
    rol: "ADMIN" as const,
    password: "Admin1234",
  },
  {
    email: "cliente@libreria.test",
    nombre: "Cliente",
    rol: "CLIENTE" as const,
    password: "Cliente1234",
  },
];

async function main() {
  // 1. Cargar Autores y Categorías (evitando duplicados)
  await prisma.autor.createMany({ data: autores, skipDuplicates: true });
  await prisma.categoria.createMany({ data: categorias, skipDuplicates: true });

  // 2. Cargar Libros con sus relaciones
  for (const { autor, cats, ...datos } of libros) {
    const libroExistente = await prisma.libro.findFirst({
      where: { titulo: datos.titulo },
    });

    if (!libroExistente) {
      await prisma.libro.create({
        data: {
          ...datos,
          autor: { connect: { nombre: autor } },
          categorias: { connect: cats.map((nombre) => ({ nombre })) },
        },
      });
    }
  }

  // 3. Cargar Usuarios con contraseña hasheada (Idempotente mediante upsert)
  for (const { password, ...datos } of usuarios) {
    const passwordHash = await bcrypt.hash(password, 10);
    await prisma.usuario.upsert({
      where: { email: datos.email },
      update: {},
      create: {
        ...datos,
        passwordHash,
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