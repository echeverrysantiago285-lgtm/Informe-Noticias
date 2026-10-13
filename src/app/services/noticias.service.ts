import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Noticia } from '../models/noticia.model';
import { NOTICIAS } from '../data/noticias.data';

const CLAVE_STORAGE = 'informe_noticias';

/**
 * Servicio que centraliza el acceso y la gestión de las noticias.
 * Los datos iniciales provienen del arreglo local NOTICIAS y los cambios del mini CRUD
 * se persisten en localStorage para conservarse en el navegador.
 */
@Injectable({ providedIn: 'root' })
export class NoticiasService {
  private noticiasSubject = new BehaviorSubject<Noticia[]>(this.cargarNoticias());
  readonly noticias$ = this.noticiasSubject.asObservable();

  private cargarNoticias(): Noticia[] {
    try {
      const datos = localStorage.getItem(CLAVE_STORAGE);
      if (datos) {
        const noticias = JSON.parse(datos) as Noticia[];
        if (Array.isArray(noticias)) {
          return noticias;
        }
      }
    } catch {
      // Si el almacenamiento está dañado, se recuperan los datos iniciales.
    }
    return NOTICIAS.map((n) => ({ ...n, cuerpo: [...n.cuerpo] }));
  }

  private guardar(noticias: Noticia[]): void {
    localStorage.setItem(CLAVE_STORAGE, JSON.stringify(noticias));
    this.noticiasSubject.next(noticias);
  }

  obtenerTodas(): Noticia[] {
    return this.noticiasSubject.value;
  }

  obtenerPorId(id: number): Noticia | undefined {
    return this.obtenerTodas().find((n) => n.id === id);
  }

  obtenerCategorias(): string[] {
    return ['Todos', ...new Set(this.obtenerTodas().map((n) => n.categoria))];
  }

  obtenerUltimas(cantidad = 3): Noticia[] {
    return [...this.obtenerTodas()]
      .sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime())
      .slice(0, cantidad);
  }

  obtenerDestacada(): Noticia | undefined {
    return this.obtenerUltimas(1)[0];
  }

  obtenerRelacionadas(categoria: string, idExcluir: number, cantidad = 3): Noticia[] {
    return this.obtenerTodas()
      .filter((n) => n.categoria === categoria && n.id !== idExcluir)
      .slice(0, cantidad);
  }

  crear(datos: Omit<Noticia, 'id'>): Noticia {
    const noticias = this.obtenerTodas();
    const nuevoId = noticias.length > 0 ? Math.max(...noticias.map((n) => n.id)) + 1 : 1;
    const nueva: Noticia = { id: nuevoId, ...datos };
    this.guardar([nueva, ...noticias]);
    return nueva;
  }

  eliminar(id: number): boolean {
    const noticias = this.obtenerTodas();
    const nuevas = noticias.filter((n) => n.id !== id);
    if (nuevas.length === noticias.length) {
      return false;
    }
    this.guardar(nuevas);
    return true;
  }

  restablecerDatos(): void {
    this.guardar(NOTICIAS.map((n) => ({ ...n, cuerpo: [...n.cuerpo] })));
  }

  urlImagen(semilla: string, ancho = 600, alto = 400): string {
    return `https://picsum.photos/seed/${encodeURIComponent(semilla)}/${ancho}/${alto}`;
  }

  formatearFecha(fechaISO: string): string {
    const fecha = new Date(fechaISO + 'T00:00:00');
    return fecha.toLocaleDateString('es-CO', { day: '2-digit', month: 'short', year: 'numeric' });
  }
}
