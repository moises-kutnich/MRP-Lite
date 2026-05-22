import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClienteService } from '../services/cliente.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cliente-nuevo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container mt-4 main-card">
      <div class="card shadow-lg border-0 bg-dark text-light">
        <div class="card-header header-custom py-3">
          <h3 class="m-0 font-weight-bold tracking-wide text-uppercase">
            <i class="bi bi-person-plus me-2"></i>Registrar Nuevo Cliente
          </h3>
        </div>
        
        <div class="card-body p-4">
          <form (ngSubmit)="guardar()" #clienteForm="ngForm">
            
            <div class="mb-4">
              <label for="input-razon-social" class="form-label text-secondary-custom font-medium">
                Razón Social / Nombre Completo
              </label>
              <input 
                type="text" 
                id="input-razon-social" 
                name="razonSocial" 
                class="form-control custom-input" 
                [(ngModel)]="cliente.razonSocial" 
                required 
                #razonField="ngModel" />
              <div *ngIf="razonField.invalid && razonField.touched" class="text-danger mt-1 small">
                La razón social es obligatoria.
              </div>
            </div>

            <div class="mb-4">
              <label for="input-cuit" class="form-label text-secondary-custom font-medium">
                CUIT
              </label>
              <input 
                type="text" 
                id="input-cuit" 
                name="cuit" 
                class="form-control custom-input" 
                [(ngModel)]="cliente.cuit" 
                required 
                #cuitField="ngModel" />
              <div *ngIf="cuitField.invalid && cuitField.touched" class="text-danger mt-1 small">
                El CUIT es obligatorio.
              </div>
            </div>

            <div class="mb-4">
              <label for="input-observaciones" class="form-label text-secondary-custom font-medium">
                Observaciones
              </label>
              <textarea 
                id="input-observaciones" 
                name="observaciones" 
                class="form-control custom-input" 
                [(ngModel)]="cliente.observaciones" 
                rows="3"
                placeholder="Opcional..."></textarea>
            </div>

            <div class="d-flex justify-content-end gap-3 mt-5">
              <button type="button" class="btn btn-outline-secondary px-4 py-2" (click)="cancelar()">
                Cancelar
              </button>
              <button 
                type="submit" 
                class="btn btn-action px-5 py-2" 
                [disabled]="clienteForm.invalid">
                Guardar Cliente
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  `
})
export class ClienteNuevoComponent {
  cliente: any = { razonSocial: '', cuit: null, observaciones: '' };

  constructor(
    private clienteService: ClienteService, 
    private router: Router
  ) {}

  guardar(): void {
    this.clienteService.save(this.cliente).subscribe({
      next: () => {
        this.router.navigate(['/clientes']);
      },
      error: (err) => console.error(err)
    });
  }

  cancelar(): void {
    this.router.navigate(['/']);
  }
}