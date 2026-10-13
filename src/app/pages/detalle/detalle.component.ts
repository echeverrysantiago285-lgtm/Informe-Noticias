import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Noticia } from '../../models/noticia.model';
import { NoticiasService } from '../../services/noticias.service';
import { FavoritosService } from '../../services/favoritos.service';

@Component({
  selector: 'app-detalle',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './detalle.component.html',
})
export class DetalleComponent implements OnInit, OnDestroy {
  noticia?: Noticia;
  relacionadas: Noticia[] = [];
  esFavorita = false;

  private suscripcionRuta?: Subscription;
  private suscripcionFavoritos?: Subscription;

  constructor(
    private route: ActivatedRoute,
    public noticiasService: NoticiasService,
    private favoritosService: FavoritosService
  ) {}

  ngOnInit(): void {
    this.suscripcionRuta = this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      // Si se entra a /detalle sin id, se muestra la primera noticia por defecto
      this.noticia = id ? this.noticiasService.obtenerPorId(Number(id)) : this.noticiasService.obtenerTodas()[0];

      if (this.noticia) {
        this.relacionadas = this.noticiasService.obtenerRelacionadas(this.noticia.categoria, this.noticia.id);
        this.actualizarFavorito();
      }
    });

    this.suscripcionFavoritos = this.favoritosService.favoritos$.subscribe(() => this.actualizarFavorito());
  }

  private actualizarFavorito(): void {
    this.esFavorita = this.noticia ? this.favoritosService.esFavorito(this.noticia.id) : false;
  }

  alternarFavorito(): void {
    if (this.noticia) {
      this.favoritosService.alternar(this.noticia.id);
    }
  }

  ngOnDestroy(): void {
    this.suscripcionRuta?.unsubscribe();
    this.suscripcionFavoritos?.unsubscribe();
  }
}
