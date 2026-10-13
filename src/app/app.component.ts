import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

/**
 * Componente raíz: contiene la barra superior, el encabezado con el menú
 * de navegación, el <router-outlet> donde se insertan las páginas y el
 * pie de página. Se mantiene fijo entre rutas para no repetir el layout
 * en cada página (fundamento básico de componentes en Angular).
 */
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  fechaHoy = '';

  ngOnInit(): void {
    this.fechaHoy = new Date()
      .toLocaleDateString('es-CO', { weekday: 'long', day: '2-digit', month: 'short', year: 'numeric' })
      .toUpperCase();
  }
}
