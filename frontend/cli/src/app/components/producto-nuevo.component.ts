import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { ProductoService } from '../services/producto.service';
import { TipoEquipoService } from '../services/tipo-equipo.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-producto-nuevo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container mt-4">
      
      <div *ngIf="mensajeExito" class="alert alert-success alert-dismissible fade show shadow mb-4" role="alert" style="border-radius: 8px;">
        <i class="bi bi-check-circle-fill me-2"></i> {{ mensajeExito }}
        <button type="button" class="btn-close" (click)="mensajeExito = null" aria-label="Close"></button>
      </div>

      <div class="card shadow-lg card-premium text-light">
        <div class="card-header header-premium py-3">
          <h3 class="m-0 font-weight-bold text-white text-uppercase tracking-wide fs-4">
            <i class="bi bi-box me-2 text-accent-premium"></i>Ingresar Nuevo Producto y Tareas
          </h3>
        </div>
        
        <div class="card-body p-4">
          <form (ngSubmit)="guardar(productoForm)" #productoForm="ngForm">
            
            <div class="mb-4">
              <label for="prod-name" class="form-label text-white fs-5 font-semibold">Nombre del Producto</label>
              <input 
                type="text" 
                id="prod-name" 
                name="nombre" 
                class="form-control input-premium" 
                [(ngModel)]="producto.nombre" 
                required />
            </div>

            <div class="d-flex justify-content-between align-items-center mt-4 mb-3 border-bottom border-secondary pb-2">
              <h4 class="text-white m-0 fs-5 font-semibold">Secuencia Operativa (Lista de Tareas)</h4>
              <button type="button" class="btn btn-sm btn-outline-primary" (click)="agregarTarea()">
                <i class="bi bi-plus-lg"></i> Insertar Tareas
              </button>
            </div>

            <div *ngFor="let t of producto.tareas; let i = index" class="row g-3 align-items-center mb-3 bg-black bg-opacity-25 p-3 rounded border border-secondary">
              <div class="col-md-4">
                <label class="form-label text-secondary small">Nombre de la Tarea</label>
                <input type="text" [name]="'tname-' + i" class="form-control input-premium" [(ngModel)]="t.nombreTarea" required />
              </div>
              <div class="col-md-4">
                <label class="form-label text-secondary small">Estación / Tipo de Equipo</label>
                <select [name]="'ttipo-' + i" class="form-select input-premium" [(ngModel)]="t.tipoEquipo" required>
                  <option [ngValue]="null" disabled>Seleccione estación...</option>
                  <option *ngFor="let te of tipos" [ngValue]="te">{{te.nombre}}</option>
                </select>
              </div>
              <div class="col-md-3">
                <label class="form-label text-secondary small">Duración (Minutos)</label>
                <input type="number" [name]="'ttime-' + i" class="form-control input-premium" [(ngModel)]="t.tiempo" required min="1" />
              </div>
              
              <div class="col-md-1 d-flex justify-content-end align-items-end mt-0 mb-2">
                <button type="button" class="btn btn-link text-danger p-0 fs-4" (click)="removerTarea(i)" title="Eliminar Tarea">
                  <i class="bi bi-trash"></i>
                </button>
              </div>
            </div>

            <div class="d-flex justify-content-end gap-3 mt-5 border-top border-secondary pt-4">
              <button type="button" class="btn btn-outline-secondary px-4 text-light border-secondary" (click)="cancelar()">Cancelar</button>
              <button type="submit" class="btn btn-premium-action px-5 py-2" [disabled]="productoForm.invalid || guardando">
                {{ guardando ? 'Guardando...' : 'Guardar Producto' }}
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  `
})
export class ProductoNuevoComponent implements OnInit {
  producto: any = { nombre: '', tareas: [] };
  tipos: any[] = [];
  mensajeExito: string | null = null;
  guardando: boolean = false;

  constructor(private productoService: ProductoService, private tipoService: TipoEquipoService, private router: Router) {}

  ngOnInit(): void {
    this.tipoService.findAll().subscribe((res: any) => this.tipos = res.data || res);
  }

  agregarTarea(): void {
    this.producto.tareas.push({ nombreTarea: '', tipoEquipo: null, tiempo: 10 });
  }

  removerTarea(index: number): void {
    this.producto.tareas.splice(index, 1);
  }

  guardar(form: NgForm): void {
    this.guardando = true;
    this.productoService.guardar(this.producto).subscribe({
      next: (res: any) => {
        this.mensajeExito = res.message || 'Producto registrado correctamente';
        
        this.producto = { nombre: '', tareas: [] };
        form.resetForm();
        
        this.guardando = false;

        setTimeout(() => {
          this.mensajeExito = null;
        }, 4000);
      },
      error: (err: any) => {
        console.error(err);
        this.guardando = false;
      }
    });
  }

  cancelar(): void {
    this.router.navigate(['/']);
  }
}