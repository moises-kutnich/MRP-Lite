import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlanificacionService } from '../services/planificacion.service';

@Component({
  selector: 'app-planificacion-visor',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container mt-4">
      <div class="card shadow-lg card-premium text-light" style="border-radius: 12px !important;">
        <div class="card-header header-premium py-3">
          <h3 class="m-0 font-weight-bold text-white text-uppercase tracking-wide fs-4">
            <i class="bi bi-calendar-week me-2 text-light"></i>Cronograma de Planificaciones
          </h3>
        </div>

        <div class="card-body p-0">
          <div class="table-responsive" *ngIf="planificaciones && planificaciones.length > 0">
            <table id="tabla-planificaciones" class="table table-dark table-striped table-hover m-0 align-middle">
              <thead>
                <tr class="text-secondary-custom text-uppercase fs-7 tracking-wider border-bottom border-secondary">
                  <th class="ps-4 py-3">Pedido ID</th>
                  <th class="py-3">Taller</th>
                  <th class="py-3">Equipo Asignado</th>
                  <th class="py-3">Tarea Ejecutada</th>
                  <th class="py-3">Inicio</th>
                  <th class="py-3">Fin</th>
                  <th class="pe-4 py-3 text-center">Asignación</th>
                </tr>
              </thead>
              <tbody>
                <tr *ngFor="let plan of planificaciones" class="border-bottom border-secondary">
                  <td class="ps-4 font-medium text-info py-3">#{{ plan.pedido?.id || 'N/A' }}</td>
                  <td class="py-3 text-white font-semibold">{{ plan.taller?.codigo }}</td>
                  <td class="py-3 text-light-50"><i class="bi bi-tools me-1 text-secondary"></i> {{ plan.equipo?.nombre }}</td>
                  <td class="py-3 font-medium text-white">{{ plan.nombreTarea }}</td>
                  <td class="py-3 text-white font-mono fs-7">{{ plan.inicio | date: 'dd/MM/yyyy HH:mm' }}</td>
                  <td class="py-3 text-white font-mono fs-7">{{ plan.fin | date: 'dd/MM/yyyy HH:mm' }}</td>
                  <td class="pe-4 py-3 text-center">
                    <span class="badge bg-danger bg-opacity-25 text-danger border border-danger border-opacity-50 px-2 py-1 fs-8 text-uppercase">
                      Límite Entrega
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div *ngIf="!planificaciones || planificaciones.length === 0" class="text-center py-5 text-white bg-black bg-opacity-25">
            <i class="bi bi-inbox fs-2 d-block mb-2 text-secondary"></i> 
            <span class="fs-5 text-light-custom tracking-wide d-block">No hay planificaciones generadas en el sistema.</span>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .font-mono { font-family: 'Courier New', Courier, monospace; }
    .fs-7 { font-size: 0.85rem; }
    .fs-8 { font-size: 0.75rem; }
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
}