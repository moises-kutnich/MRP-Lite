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
      <div class="card shadow-lg border-0 bg-dark text-light">
        <div class="card-header header-custom py-3">
          <h3 class="m-0 font-weight-bold tracking-wide text-uppercase">
            <i class="bi bi-tools me-2"></i>Nuevo Tipo de Equipo
          </h3>
        </div>
        
        <div class="card-body p-4">
          <form (ngSubmit)="guardar()" #tipoForm="ngForm">
            
            <div class="mb-4">
              <label for="input-nombre" class="form-label text-secondary-custom font-medium">
                Nombre del Tipo de Equipo
              </label>
              <input 
                type="text" 
                id="input-nombre" 
                name="nombre" 
                class="form-control custom-input" 
                [(ngModel)]="tipoEquipo.nombre" 
                required 
                #nombreField="ngModel" />
              <div *ngIf="nombreField.invalid && nombreField.touched" class="text-danger mt-1 small">
                El nombre es obligatorio.
              </div>
            </div>

            <div class="d-flex justify-content-end gap-3 mt-5">
              <button type="button" class="btn btn-outline-secondary px-4 py-2" (click)="cancelar()">
                Cancelar
              </button>
              <button 
                type="submit" 
                class="btn btn-action px-5 py-2" 
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
  tipoEquipo: any = { nombre: '' };

  constructor(private tipoEquipoService: TipoEquipoService, private router: Router) {}

  guardar(): void {
    this.tipoEquipoService.save(this.tipoEquipo).subscribe(() => {
      this.router.navigate(['/tipos-equipo']);
    });
  }

  cancelar(): void {
    this.router.navigate(['/']);
  }
}