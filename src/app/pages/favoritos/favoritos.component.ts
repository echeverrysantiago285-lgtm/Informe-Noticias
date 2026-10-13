import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { Noticia } from '../../models/noticia.model';
import { NoticiasService } from '../../services/noticias.service';
import { FavoritosService } from '../../services/favoritos.service';
import { NoticiaCardComponent } from '../../components/noticia-card/noticia-card.component';

@Component({
  selector: 'app-favoritos',
  standalone: true,
  imports: [CommonModule, RouterLink, NoticiaCardComponent],
  templateUrl: './favoritos.component.html',
})
export class FavoritosComponent implements OnInit, OnDestroy {
  noticiasFavoritas: Noticia[] = [];
  private suscripcion?: Subscription;

  constructor(private noticiasService: NoticiasService, private favoritosService: FavoritosService) {}

  ngOnInit(): void {
    this.suscripcion = this.favoritosService.favoritos$.subscribe((ids) => {
      this.noticiasFavoritas = this.noticiasService.obtenerTodas().filter((n) => ids.includes(n.id));
    });
  }

  quitarFavorito(id: number): void {
    this.favoritosService.alternar(id);
  }

  ngOnDestroy(): void {
    this.suscripcion?.unsubscribe();
  }
}
