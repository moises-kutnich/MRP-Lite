import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlanificacionService } from '../services/planificacion.service';

declare var google: any;

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

        <div class="card-body p-4 bg-dark bg-opacity-25">
          
          <div id="taller-title-container" class="mb-3 d-none">
            <h2 class="text-white font-weight-bold tracking-wide border-bottom border-secondary pb-2" style="font-size: 1.75rem;">
              <i class="bi bi-building me-2 text-info"></i>Taller: {{ nombreTaller }}
            </h2>
          </div>

          <div id="timeline-chart" class="rounded p-3 bg-white text-dark shadow-sm" style="width: 100%; min-height: 400px;">
          </div>

          <div id="no-data-msg" class="text-center py-5 text-white d-none">
            <i class="bi bi-inbox fs-2 d-block mb-2 text-secondary"></i> 
            <span class="fs-5 text-light-custom tracking-wide d-block">No hay planificaciones generadas en el sistema.</span>
          </div>

        </div>
      </div>
    </div>
  `
})
export class PlanificacionVisorComponent implements OnInit, AfterViewInit {
  planificaciones: any[] = [];
  nombreTaller: string = 'Cargando...';

  constructor(private planificacionService: PlanificacionService) {}

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    if (typeof google === 'undefined') {
      const script = document.createElement('script');
      script.src = 'https://www.gstatic.com/charts/loader.js';
      script.type = 'text/javascript';
      script.async = true;
      script.onload = () => {
        google.charts.load('current', { packages: ['timeline'] });
        google.charts.setOnLoadCallback(() => {
          this.pedirDatosYDibujar();
        });
      };
      document.head.appendChild(script);
    } else {
      this.pedirDatosYDibujar();
    }
  }

  pedirDatosYDibujar(): void {
    const codigoTallerReal = 'T-01';
    
    this.planificacionService.obtenerPorTaller(codigoTallerReal).subscribe((res: any) => {
      this.planificaciones = res.data || res;
      
      const container = document.getElementById('timeline-chart');
      const noDataMsg = document.getElementById('no-data-msg');
      const titleContainer = document.getElementById('taller-title-container');

      if (!this.planificaciones || this.planificaciones.length === 0) {
        if (container) container.style.display = 'none';
        if (noDataMsg) noDataMsg.classList.remove('d-none');
        return;
      }

      if (this.planificaciones[0]?.taller) {
       const t = this.planificaciones[0].taller;
        this.nombreTaller = t.nombre ? t.nombre.toUpperCase() : t.codigo;
      } else {
        this.nombreTaller = codigoTallerReal;
      }

      if (titleContainer) titleContainer.classList.remove('d-none');

      const chart = new google.visualization.Timeline(container);
      const dataTable = new google.visualization.DataTable();

      dataTable.addColumn({ type: 'string', id: 'Equipo' });
      dataTable.addColumn({ type: 'string', id: 'Tarea' });
      dataTable.addColumn({ type: 'date', id: 'Inicio' });
      dataTable.addColumn({ type: 'date', id: 'Fin' });

      const rows = this.planificaciones.map((plan: any) => {
        const nombreEquipo = plan.equipo?.codigo || 'Equipo';
        const nombreTarea = plan.nombreTarea || 'Operación';
        const fechaInicio = new Date(plan.inicio);
        const fechaFin = new Date(plan.fin);
        
        return [nombreEquipo, nombreTarea, fechaInicio, fechaFin];
      });

      dataTable.addRows(rows);

      const opciones = {
        timeline: { 
          showRowLabels: true,
          groupByRowLabel: true 
        },
        backgroundColor: '#ffffff'
      };

      chart.draw(dataTable, opciones);
    });
  }
}