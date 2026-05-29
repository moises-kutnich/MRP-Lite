import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TallerService } from '../services/taller.service';
import { TipoEquipoService } from '../services/tipo-equipo.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-taller-nuevo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container mt-4">
      <div class="card shadow-lg card-premium text-light">
        <div class="card-header header-premium py-3">
          <h2 class="m-0 font-weight-bold text-white fs-3 tracking-wide text-uppercase">
            <i class="bi bi-gear-wide-connected me-2 text-accent-premium"></i>Gestión de Talleres
          </h2>
        </div>
        
        <div class="card-body p-4">
          <form (ngSubmit)="guardar()" #tallerForm="ngForm">
            
            <div class="mb-4">
              <label class="form-label text-white font-medium fs-5">Código de Identificación</label>
              <input type="text" name="codigo" class="form-control input-premium" [(ngModel)]="taller.codigo" required />
            </div>

            <div class="mb-4">
              <label class="form-label text-white font-medium fs-5">Nombre Comercial</label>
              <input type="text" name="nombre" class="form-control input-premium" [(ngModel)]="taller.nombre" required />
            </div>

            <h4 class="text-white mt-4 mb-3 border-bottom border-secondary pb-2 fs-5 font-semibold">Configurar Equipamiento</h4>
            
            <div class="row bg-black bg-opacity-25 p-3 rounded border border-secondary mb-4 align-items-center" *ngFor="let eq of taller.equipos; let i = index">
              <div class="col-md-5">
                <label class="form-label text-secondary small">Tipo de Máquina/Equipo</label>
                <select [name]="'tipo-' + i" class="form-select input-premium" [(ngModel)]="eq.tipo" required>
                  <option [ngValue]="null" disabled>Seleccione tipo...</option>
                  <option *ngFor="let t of tipos" [ngValue]="t">{{t.nombre}}</option>
                </select>
              </div>
              <div class="col-md-4">
                <label class="form-label text-secondary small">Capacidad Productiva</label>
                <input type="number" [name]="'cap-' + i" class="form-control input-premium" [(ngModel)]="eq.capacidad" required min="1" />
              </div>
              <div class="col-md-3 d-flex align-items-end justify-content-end mt-3 mt-md-0">
                <button type="button" class="btn btn-outline-danger w-100" (click)="removerEquipo(i)">
                  <i class="bi bi-trash me-1"></i> Eliminar
                </button>
              </div>
            </div>

            <button type="button" class="btn btn-outline-primary mb-4" (click)="agregarEquipo()">
              <i class="bi bi-plus-circle me-1"></i> Añadir Unidad Operativa
            </button>

            <div class="d-flex justify-content-end gap-3 border-top border-secondary pt-4 mt-4">
              <button type="button" class="btn btn-outline-secondary px-4 text-light border-secondary" (click)="cancelar()">Cancelar</button>
              <button type="submit" class="btn btn-premium-action px-5" [disabled]="tallerForm.invalid">Guardar Taller</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `
})
export class TallerNuevoComponent implements OnInit {
  taller: any = { codigo: '', nombre: '', equipos: [] };
  tipos: any[] = [];

  constructor(private tallerService: TallerService, private tipoService: TipoEquipoService, private router: Router) {}

  ngOnInit(): void {
    this.tipoService.findAll().subscribe((data: any) => this.tipos = data);
  }

  agregarEquipo(): void {
    this.taller.equipos.push({ tipo: null, capacidad: 1 });
  }

  removerEquipo(index: number): void {
    this.taller.equipos.splice(index, 1);
  }

  guardar(): void {
    this.tallerService.guardarTaller(this.taller).subscribe({
      next: () => this.router.navigate(['/']),
      error: (err: any) => console.error(err)
    });
  }

  cancelar(): void {
    this.router.navigate(['/']);
  }
}