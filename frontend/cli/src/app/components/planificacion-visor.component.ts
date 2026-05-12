import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { PlanificacionService } from '../services/planificacion.service';
import { TallerService } from '../services/taller.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

declare var google: any;

@Component({
  selector: 'app-planificacion-visor',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container mt-4">
      <h2 class="display-6 mb-4">Visualización de Planificación</h2>
      
      <div class="mb-4">
        <label class="form-label">Seleccionar Taller para ver Cronograma:</label>
        <select class="form-select" [(ngModel)]="tallerId" (change)="cargarDatos()">
          <option *ngFor="let t of talleres" [value]="t.id">{{t.nombre}} ({{t.codigo}})</option>
        </select>
      </div>

      <div #chart_div style="height: 500px; border: 1px solid #ddd;" [hidden]="!hayDatos"></div>
      
      <div *ngIf="!hayDatos" class="alert alert-warning">
        No hay planificaciones para mostrar en este taller.
      </div>
    </div>
  `
})
export class PlanificacionVisorComponent implements OnInit {
  @ViewChild('chart_div', { static: true }) chartDiv!: ElementRef;
  talleres: any[] = [];
  tallerId: number | null = null;
  hayDatos = false;

  constructor(
    private planificacionService: PlanificacionService,
    private tallerService: TallerService
  ) {}

  ngOnInit() {
    this.tallerService.findAll().subscribe((res: any) => {
        this.talleres = res.data;
    });
    
    google.charts.load('current', {'packages':['timeline'], 'language': 'es'});
  }

  cargarDatos() {
    if (!this.tallerId) return;

    this.planificacionService.obtenerPorTaller(this.tallerId).subscribe(res => {
      if (res.data && res.data.length > 0) {
        this.hayDatos = true;
        this.drawChart(res.data);
      } else {
        this.hayDatos = false;
      }
    });
  }

  drawChart(planificaciones: any[]) {
    const container = this.chartDiv.nativeElement;
    const chart = new google.visualization.Timeline(container);
    const dataTable = new google.visualization.DataTable();

    dataTable.addColumn({ type: 'string', id: 'Maquina' });
    dataTable.addColumn({ type: 'string', id: 'Tarea' });
    dataTable.addColumn({ type: 'string', role: 'style' });
    dataTable.addColumn({ type: 'date', id: 'Inicio' });
    dataTable.addColumn({ type: 'date', id: 'Fin' });

    const rows = planificaciones.map(p => [
      p.equipo.nombre, 
      p.nombreTarea,
      p.color,
      new Date(p.inicio), 
      new Date(p.fin)
    ]);

    dataTable.addRows(rows);
    
    const options = {
      timeline: { colorByRowLabel: false },
      avoidOverlappingGridLines: false
    };

    chart.draw(dataTable, options);
  }
}