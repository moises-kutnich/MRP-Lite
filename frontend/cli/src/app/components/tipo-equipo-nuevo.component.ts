import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms'; 
import { TipoEquipoService } from '../services/tipo-equipo.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tipo-equipo-nuevo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container mt-4 main-card">
      
      <div *ngIf="mensajeExito" class="alert alert-success alert-dismissible fade show shadow mb-4" role="alert" style="border-radius: 8px;">
        <i class="bi bi-check-circle-fill me-2"></i> {{ mensajeExito }}
        <button type="button" class="btn-close" (click)="mensajeExito = null" aria-label="Close"></button>
      </div>

      <div class="card shadow-lg card-premium text-light">
        <div class="card-header header-premium">
          <h3 class="m-0 font-weight-bold text-white text-uppercase tracking-wide fs-4">
            <i class="bi bi-hdd-stack me-2 text-white"></i>Registrar Tipo de Equipo
          </h3>
        </div>
        
        <div class="card-body p-4">
          <form (ngSubmit)="guardar(tipoForm)" #tipoForm="ngForm">
            
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
                Volver
              </button>
              <button 
                type="submit" 
                id="btn-guardar" 
                class="btn btn-premium-action px-5 py-2" 
                [disabled]="tipoForm.invalid || guardando">
                {{ guardando ? 'Guardando...' : 'Guardar Tipo de Equipo' }}
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
  mensajeExito: string | null = null;
  guardando: boolean = false;

  constructor(private tipoEquipoService: TipoEquipoService, private router: Router) {}

  guardar(form: NgForm): void {
    this.guardando = true;
    this.tipoEquipoService.save(this.tipoEquipo).subscribe({
      next: (res: any) => {
        this.mensajeExito = res.respuesta || 'Tipo de equipo registrado correctamente';
        
        this.tipoEquipo = { codigo: '', nombre: '' };
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