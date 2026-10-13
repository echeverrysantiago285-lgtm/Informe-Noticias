/**
 * Modelo de datos de una noticia dentro del aplicativo.
 */
export interface Noticia {
  id: number;
  categoria: string;
  titulo: string;
  resumen: string;
  cuerpo: string[];
  autor: string;
  fecha: string;
  tiempoLectura: number;
  imagen: string;
}
