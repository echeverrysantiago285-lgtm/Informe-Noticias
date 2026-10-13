import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NoticiasComponent } from './pages/noticias/noticias.component';
import { DetalleComponent } from './pages/detalle/detalle.component';
import { FavoritosComponent } from './pages/favoritos/favoritos.component';
import { ContactoComponent } from './pages/contacto/contacto.component';
import { GestionComponent } from './pages/gestion/gestion.component';

/**
 * Rutas del aplicativo. Cada ruta mapea a un componente "página",
 * manteniendo el encabezado y el pie de página fijos en AppComponent.
 */
export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'noticias', component: NoticiasComponent },
  { path: 'detalle/:id', component: DetalleComponent },
  { path: 'detalle', component: DetalleComponent },
  { path: 'favoritos', component: FavoritosComponent },
  { path: 'contacto', component: ContactoComponent },
  { path: 'gestion', component: GestionComponent },
  { path: '**', redirectTo: '' },
];
