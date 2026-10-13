import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

const CLAVE_STORAGE = 'informe_favoritos';

/**
 * Servicio de favoritos: persiste los ids de noticias guardadas en localStorage
 * y expone un Observable para mantener sincronizados los componentes.
 */
@Injectable({ providedIn: 'root' })
export class FavoritosService {
  private favoritosSubject = new BehaviorSubject<number[]>(this.leerStorage());
  readonly favoritos$ = this.favoritosSubject.asObservable();

  private leerStorage(): number[] {
    try {
      const datos = localStorage.getItem(CLAVE_STORAGE);
      const ids = datos ? (JSON.parse(datos) as unknown) : [];
      return Array.isArray(ids) ? ids.filter((id): id is number => typeof id === 'number') : [];
    } catch {
      return [];
    }
  }

  private guardar(ids: number[]): void {
    localStorage.setItem(CLAVE_STORAGE, JSON.stringify(ids));
    this.favoritosSubject.next(ids);
  }

  esFavorito(id: number): boolean {
    return this.favoritosSubject.value.includes(id);
  }

  alternar(id: number): void {
    const actuales = this.favoritosSubject.value;
    const nuevos = actuales.includes(id)
      ? actuales.filter((f) => f !== id)
      : [...actuales, id];
    this.guardar(nuevos);
  }

  eliminarReferencia(id: number): void {
    if (this.esFavorito(id)) {
      this.guardar(this.favoritosSubject.value.filter((f) => f !== id));
    }
  }
}
