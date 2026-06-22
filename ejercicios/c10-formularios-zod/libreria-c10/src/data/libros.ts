import type { Libro } from '../types/Libro'

import peterPan from '../assets/peter_pan.webp'
import lidm from '../assets/lidm.webp'
import hombreInvisible from '../assets/el_hombre_invisible.jpg'
import italiano from '../assets/el_italiano.png'
import dragonBall from '../assets/dragon_ball.webp'
import babel from '../assets/babel.webp'

export const libros: Libro [] = [
  {
    id: 1,
    titulo: "Peter Pan",
    autor: "Barrie J.M.",
    imagen: peterPan
  },
  {
    id: 2,
    titulo: "La Invención de Morel",
    autor: "Adolfo Bioy Casares",
    imagen: lidm
  },
  {
    id: 3,
    titulo: "El Hombre Invisible",
    autor: "H.G. Wells",
    imagen: hombreInvisible
  },
  {
    id: 4,
    titulo: "El Italiano",
    autor: "Tito Calderón",
    imagen: italiano
  },
  {
    id: 5,
    titulo: "Dragon Ball Piccolo 3",
    autor: "Akira Toriyama",
    imagen: dragonBall
  },
  {
    id: 6,
    titulo: "Babel",
    autor: "R.F. Kuang",
    imagen: babel
  }
]