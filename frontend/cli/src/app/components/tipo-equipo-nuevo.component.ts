import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TipoEquipoService } from '../services/tipo-equipo.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tipo-equipo-nuevo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container mt-4 main-card">
      <div class="card shadow-lg card-premium text-light">
        <div class="card-header header-premium">
          <h3 class="m-0 font-weight-bold text-white text-uppercase tracking-wide fs-4">
            <i class="bi bi-hdd-stack me-2 text-white"></i>Registrar Tipo de Equipo
          </h3>
        </div>
        
        <div class="card-body p-4">
          <form (ngSubmit)="guardar()" #tipoForm="ngForm">
            
            <div class="mb-4">
              <label for="input-codigo" class="form-label text-white font-medium fs-5">
                Código del Tipo de Equipo
              </label>
              <input 
                type="text" 
                id="input-codigo" 
                name="codigo" 
                class="form-control input-premium" 
                [(ngModel)]="tipoEquipo.codigo" 
                required />
            </div>

            <div class="mb-4">
              <label for="input-nombre" class="form-label text-white font-medium fs-5">
                Nombre de la Categoría / Máquina
              </label>
              <input 
                type="text" 
                id="input-nombre" 
                name="nombre" 
                class="form-control input-premium" 
                [(ngModel)]="tipoEquipo.nombre" 
                required />
            </div>

            <div class="d-flex justify-content-end gap-3 mt-5 border-top border-secondary pt-4">
              <button type="button" class="btn btn-outline-secondary px-4 py-2 text-light border-secondary" style="border-radius: 8px;" (click)="cancelar()">
                Cancelar
              </button>
              <button 
                type="submit" 
                id="btn-guardar" 
                class="btn btn-premium-action px-5 py-2" 
                [disabled]="tipoForm.invalid">
                Guardar Tipo de Equipo
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  `
})
export class TipoEquipoNuevoComponent {
  tipoEquipo: any = { codigo: '', nombre: '' };

  constructor(private tipoEquipoService: TipoEquipoService, private router: Router) {}

  guardar(): void {
    this.tipoEquipoService.save(this.tipoEquipo).subscribe({
      next: () => this.router.navigate(['/']),
      error: (err: any) => console.error(err)
    });
  }

  cancelar(): void {
    this.router.navigate(['/']);
  }
}