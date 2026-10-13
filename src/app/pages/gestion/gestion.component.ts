import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { Noticia } from '../../models/noticia.model';
import { FavoritosService } from '../../services/favoritos.service';
import { NoticiasService } from '../../services/noticias.service';

type NoticiaFormulario = {
  categoria: string;
  titulo: string;
  resumen: string;
  cuerpo: string;
  autor: string;
  fecha: string;
  tiempoLectura: number;
  imagen: string;
};

@Component({
  selector: 'app-gestion',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './gestion.component.html',
})
export class GestionComponent implements OnInit, OnDestroy {
  noticias: Noticia[] = [];
  mensaje = '';
  tipoMensaje: 'ok' | 'error' = 'ok';
  private suscripcion?: Subscription;

  modelo: NoticiaFormulario = this.modeloInicial();

  constructor(
    public noticiasService: NoticiasService,
    private favoritosService: FavoritosService
  ) {}

  ngOnInit(): void {
    this.suscripcion = this.noticiasService.noticias$.subscribe((noticias) => {
      this.noticias = noticias;
    });
  }

  private modeloInicial(): NoticiaFormulario {
    return {
      categoria: 'Tecnología',
      titulo: '',
      resumen: '',
      cuerpo: '',
      autor: 'Redacción INFORME',
      fecha: new Date().toISOString().slice(0, 10),
      tiempoLectura: 3,
      imagen: 'noticia-informe',
    };
  }

  crear(formulario: NgForm): void {
    if (formulario.invalid) {
      this.tipoMensaje = 'error';
      this.mensaje = 'Revisa los campos obligatorios antes de publicar.';
      return;
    }

    const parrafos = this.modelo.cuerpo
      .split(/\n+/)
      .map((p) => p.trim())
      .filter(Boolean);

    this.noticiasService.crear({
      categoria: this.modelo.categoria.trim(),
      titulo: this.modelo.titulo.trim(),
      resumen: this.modelo.resumen.trim(),
      cuerpo: parrafos,
      autor: this.modelo.autor.trim(),
      fecha: this.modelo.fecha,
      tiempoLectura: Number(this.modelo.tiempoLectura),
      imagen: this.modelo.imagen.trim() || 'noticia-informe',
    });

    this.tipoMensaje = 'ok';
    this.mensaje = 'Noticia creada y guardada en este navegador.';
    this.modelo = this.modeloInicial();
    formulario.resetForm(this.modelo);
  }

  eliminar(noticia: Noticia): void {
    const confirmado = window.confirm(`¿Eliminar la noticia “${noticia.titulo}”?`);
    if (!confirmado) return;

    const eliminada = this.noticiasService.eliminar(noticia.id);
    if (eliminada) {
      this.favoritosService.eliminarReferencia(noticia.id);
      this.tipoMensaje = 'ok';
      this.mensaje = 'Noticia eliminada correctamente.';
    } else {
      this.tipoMensaje = 'error';
      this.mensaje = 'No fue posible encontrar la noticia para eliminarla.';
    }
  }

  restablecer(): void {
    const confirmado = window.confirm('¿Restablecer las noticias iniciales del proyecto?');
    if (!confirmado) return;
    this.noticiasService.restablecerDatos();
    this.tipoMensaje = 'ok';
    this.mensaje = 'Se restablecieron los datos iniciales.';
  }

  ngOnDestroy(): void {
    this.suscripcion?.unsubscribe();
  }
}
