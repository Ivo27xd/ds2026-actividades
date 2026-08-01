import express from "express";

const app = express();
const PORT = 3000;

app.get("/", (_req, res) => {
  res.json({ mensaje: "Hola desde el backend!" });
});

interface Libro {
  id: number;
  titulo: string;
  autor: string;
  precio: number;
  imagen: string;
  disponible: boolean;
}

interface Autor {
  id: number;
  nombre: string;
  nacionalidad: string;
}

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

app.get("/libros", (req, res) => {
  const { disponible } = req.query;

  if (disponible == undefined) {
    res.json(libros);
    return;
  }

  if (disponible === "true" || disponible === "false") {
    res.json(
      libros.filter(
        libro => libro.disponible === (disponible === "true")
      )
    );
    return;
  }

  res.json(libros);
});

app.get("/autores", (_req, res) => {
  res.json(autores);
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});