import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlanificacionService } from '../services/planificacion.service';

@Component({
  selector: 'app-planificacion-visor',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container mt-4">
      <div class="card shadow-lg border-0 bg-dark text-light">
        <div class="card-header header-custom py-3">
          <h3 class="m-0 font-weight-bold tracking-wide text-uppercase">
            <i class="bi bi-layout-text-sidebar-reverse me-2"></i>Cronograma de Planificaciones
          </h3>
        </div>

        <div class="card-body p-0">
          <div class="table-responsive">
            <table id="tabla-planificaciones" class="table table-dark table-striped table-hover m-0 align-middle">
              <thead>
                <tr class="text-secondary-custom text-uppercase fs-7 tracking-wider border-bottom border-secondary">
                  <th class="ps-4 py-3">Pedido ID</th>
                  <th class="py-3">Taller</th>
                  <th class="py-3">Equipo Asignado</th>
                  <th class="py-3">Tarea Ejecutada</th>
                  <th class="py-3">Inicio</th>
                  <th class="py-3">Fin</th>
                  <th class="py-3">Asignación</th>
                  <th class="pe-4 py-3 text-center">Identificador Visual</th>
                </tr>
              </thead>
              <tbody>
                <tr *ngFor="let plan of planificaciones" class="fila-planificacion border-bottom border-light-subtle">
                  <td class="ps-4 font-medium py-3 text-info">
                    #{{ plan.pedido?.id || 'N/A' }}
                  </td>
                  <td class="py-3 font-semibold text-warning-custom">
                    {{ plan.taller?.codigo }}
                  </td>
                  <td class="py-3 text-light-custom">
                    <i class="bi bi-tools me-1 text-secondary"></i> {{ plan.equipo?.nombre }}
                  </td>
                  <td class="celda-tarea py-3 font-medium">
                    {{ plan.nombreTarea }}
                  </td>
                  <td class="celda-inicio py-3 text-secondary-custom font-mono fs-7">
                    {{ plan.inicio | date: 'dd/MM/yyyy HH:mm' }}
                  </td>
                  <td class="celda-fin py-3 text-secondary-custom font-mono fs-7">
                    {{ plan.fin | date: 'dd/MM/yyyy HH:mm' }}
                  </td>
                  <td class="py-3">
                    <span class="badge bg-danger bg-opacity-25 text-danger border border-danger border-opacity-50 px-2 py-1 fs-8 text-uppercase">
                      Límite Entrega
                    </span>
                  </td>
                  <td class="pe-4 py-3 text-center">
                    <span 
                      class="color-indicator-dot d-inline-block rounded-circle shadow-sm"
                      [style.backgroundColor]="obtenerColorPorPedido(plan.pedido?.id)">
                    </span>
                  </td>
                </tr>
                <tr *ngIf="planificaciones.length === 0">
                  <td colspan="8" class="text-center py-5 text-muted">
                    <i class="bi bi-inbox fs-2 d-block mb-2"></i> No hay planificaciones generadas en el sistema.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .font-mono { font-family: 'Courier New', Courier, monospace; }
    .fs-7 { font-size: 0.85rem; }
    .fs-8 { font-size: 0.75rem; letter-spacing: 0.5px; }
    .color-indicator-dot {
      width: 18px;
      height: 18px;
      border: 2px solid rgba(255, 255, 255, 0.2);
    }
  `]
})
export class PlanificacionVisorComponent implements OnInit {
  planificaciones: any[] = [];

  constructor(private planificacionService: PlanificacionService) {}

  ngOnInit(): void {
    const idTallerDefault = 1;
    this.planificacionService.obtenerPorTaller(idTallerDefault).subscribe((data: any) => {
      this.planificaciones = data.data || data; 
    });
  }

  obtenerColorPorPedido(id: number | null): string {
    if (!id) return '#6c757d';
    return (id % 2 === 0) ? '#ff5252' : '#448aff';
  }
}