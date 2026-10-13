import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Noticia } from '../../models/noticia.model';
import { NoticiasService } from '../../services/noticias.service';

/**
 * Componente reutilizable que representa una tarjeta de noticia.
 * - @Input(): recibe la noticia a mostrar (property binding desde el padre).
 * - @Output(): emite un evento cuando se quita de favoritos (event binding).
 * Se usa en Home, Noticias y Favoritos.
 */
@Component({
  selector: 'app-noticia-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './noticia-card.component.html',
})
export class NoticiaCardComponent {
  @Input({ required: true }) noticia!: Noticia;
  @Input() modoFavoritos = false;
  @Output() quitar = new EventEmitter<number>();

  constructor(public noticiasService: NoticiasService) {}
}
