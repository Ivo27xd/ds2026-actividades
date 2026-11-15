import type { Autor } from "./Autor";
import type { Categoria } from "./Categoria";

export interface Libro {
  id: number;
  titulo: string;
  precio: number;
  imagen: string;
  disponible: boolean;
  autorId: number;
  
  autor: Autor;
  categorias?: Categoria[];
}