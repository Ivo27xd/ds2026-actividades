import type { Libro } from "../types/Libro";

const DESCRIPCIONES_POR_TITULO: Record<string, string> = {
  "peter pan":
    "La historia clásica del niño que se niega a crecer y lleva a Wendy y sus hermanos al País de Nunca Jamás, entre hadas, niños perdidos y el capitán Garfio.",
  "la invención de morel":
    "Un fugitivo llega a una isla aparentemente desierta donde descubre misteriosos visitantes y una máquina capaz de capturar eternamente la realidad.",
  "el hombre invisible":
    "Un brillante científico logra volverse invisible, pero descubre demasiado tarde el peso del aislamiento y la obsesión por el poder absoluto.",
  "el italiano":
    "Inspirada en hechos reales de la Segunda Guerra Mundial, una novela de coraje, lealtad y dilemas humanos frente al mar en tiempos de conflicto.",
  "dragon ball piccolo 3":
    "La batalla contra Piccolo alcanza un nuevo nivel de intensidad mientras Goku enfrenta a uno de los enemigos más peligrosos que haya conocido.",
  "babel":
    "En un Oxford alternativo del siglo XIX, el poder de la traducción y la plata mueve al imperio británico, desatando una rebelión sobre lengua e identidad.",
};

export function obtenerDescripcionLibro(libro: Libro): string {
  const clave = libro.titulo.trim().toLowerCase();
  if (DESCRIPCIONES_POR_TITULO[clave]) {
    return DESCRIPCIONES_POR_TITULO[clave];
  }

  const categorias = libro.categorias?.map((c) => c.nombre).join(", ");
  if (categorias) {
    return `Obra de ${libro.autor.nombre} en ${categorias}. Disponible en nuestra colección seleccionada.`;
  }

  return `Obra destacada de ${libro.autor.nombre}, parte de nuestra colección seleccionada.`;
}
