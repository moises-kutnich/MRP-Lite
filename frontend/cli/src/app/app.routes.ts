import { Routes } from '@angular/router';
import { ClienteNuevoComponent } from './components/cliente-nuevo.component';
import { TipoEquipoNuevoComponent } from './components/tipo-equipo-nuevo.component';
import { TallerNuevoComponent } from './components/taller-nuevo.component';
import { ProductoNuevoComponent } from './components/producto-nuevo.component';
import { PedidoNuevoComponent } from './components/pedido-nuevo.component';
import { PlanificacionVisorComponent } from './components/planificacion-visor.component';

export const routes: Routes = [
  { path: 'clientes/nuevo', component: ClienteNuevoComponent },
  { path: 'tipo-equipo/nuevo', component: TipoEquipoNuevoComponent },
  { path: 'talleres/nuevo', component: TallerNuevoComponent },
  { path: 'productos/nuevo', component: ProductoNuevoComponent },
  { path: 'pedidos', component: PedidoNuevoComponent },
  { path: 'planificacion', component: PlanificacionVisorComponent },
  { path: 'pedidos/nuevo', component: PedidoNuevoComponent },
  { path: '', redirectTo: 'clientes/nuevo', pathMatch: 'full' }
];