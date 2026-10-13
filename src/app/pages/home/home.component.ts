import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { Noticia } from '../../models/noticia.model';
import { NoticiasService } from '../../services/noticias.service';
import { NoticiaCardComponent } from '../../components/noticia-card/noticia-card.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, NoticiaCardComponent],
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit, OnDestroy {
  destacada?: Noticia;
  ultimas: Noticia[] = [];
  destacadas: Noticia[] = [];
  private suscripcion?: Subscription;

  constructor(public noticiasService: NoticiasService) {}

  ngOnInit(): void {
    this.suscripcion = this.noticiasService.noticias$.subscribe(() => this.cargar());
  }

  private cargar(): void {
    this.destacada = this.noticiasService.obtenerDestacada();
    this.ultimas = this.noticiasService.obtenerUltimas(3);
    this.destacadas = this.noticiasService.obtenerTodas().slice(0, 6);
  }

  ngOnDestroy(): void {
    this.suscripcion?.unsubscribe();
  }
}
