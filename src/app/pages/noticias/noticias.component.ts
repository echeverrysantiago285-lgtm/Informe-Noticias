import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Noticia } from '../../models/noticia.model';
import { NoticiasService } from '../../services/noticias.service';
import { NoticiaCardComponent } from '../../components/noticia-card/noticia-card.component';

@Component({
  selector: 'app-noticias',
  standalone: true,
  imports: [CommonModule, FormsModule, NoticiaCardComponent],
  templateUrl: './noticias.component.html',
})
export class NoticiasComponent implements OnInit, OnDestroy {
  categorias: string[] = [];
  categoriaActiva = 'Todos';
  textoBusqueda = '';
  noticiasFiltradas: Noticia[] = [];
  private suscripcion?: Subscription;

  constructor(private noticiasService: NoticiasService) {}

  ngOnInit(): void {
    this.suscripcion = this.noticiasService.noticias$.subscribe(() => {
      this.categorias = this.noticiasService.obtenerCategorias();
      if (!this.categorias.includes(this.categoriaActiva)) this.categoriaActiva = 'Todos';
      this.aplicarFiltros();
    });
  }

  seleccionarCategoria(categoria: string): void {
    this.categoriaActiva = categoria;
    this.aplicarFiltros();
  }

  aplicarFiltros(): void {
    const texto = this.textoBusqueda.trim().toLowerCase();
    this.noticiasFiltradas = this.noticiasService.obtenerTodas().filter((n) => {
      const coincideCategoria = this.categoriaActiva === 'Todos' || n.categoria === this.categoriaActiva;
      const coincideTexto =
        texto === '' ||
        n.titulo.toLowerCase().includes(texto) ||
        n.resumen.toLowerCase().includes(texto) ||
        n.autor.toLowerCase().includes(texto);
      return coincideCategoria && coincideTexto;
    });
  }

  ngOnDestroy(): void {
    this.suscripcion?.unsubscribe();
  }
}
