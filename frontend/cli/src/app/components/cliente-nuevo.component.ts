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
      <div class="card shadow-lg card-premium text-light" style="border-radius: 12px !important;">
        <div class="card-header header-premium">
          <h3 class="m-0 font-weight-bold text-white text-uppercase tracking-wide fs-4">
            <i class="bi bi-person-plus me-2 text-white"></i>Registrar Nuevo Cliente
          </h3>
        </div>
        
        <div class="card-body p-4">
          <form (ngSubmit)="guardar()" #clienteForm="ngForm">
            
            <div class="mb-4">
              <label for="input-nombre" class="form-label text-white font-medium fs-5">
                Nombre completo
              </label>
              <input 
                type="text" 
                id="input-nombre" 
                name="razonSocial" 
                class="form-control input-premium" 
                [(ngModel)]="cliente.razonSocial" 
                required 
                #nombreField="ngModel" />
              <div *ngIf="nombreField.invalid && nombreField.touched" class="text-danger mt-1 small">
                El nombre completo es requerido.
              </div>
            </div>

            <div class="mb-4">
              <label for="input-cuit" class="form-label text-white font-medium fs-5">
                CUIT
              </label>
              <input 
                type="text" 
                id="input-cuit" 
                name="cuit" 
                class="form-control input-premium" 
                [(ngModel)]="cliente.cuit" 
                required />
            </div>

            <div class="mb-4">
              <label for="input-obs" class="form-label text-white font-medium fs-5">
                Observaciones
              </label>
              <textarea 
                id="input-obs" 
                name="observaciones" 
                class="form-control input-premium" 
                rows="3" 
                placeholder="Opcional..." 
                [(ngModel)]="cliente.observaciones"></textarea>
            </div>

            <div class="d-flex justify-content-end gap-3 mt-5 border-top border-secondary pt-4">
              <button type="button" class="btn btn-outline-secondary px-4 py-2 text-light border-secondary" style="border-radius: 8px;" (click)="cancelar()">
                Cancelar
              </button>
              <button 
                type="submit" 
                id="btn-guardar" 
                class="btn btn-premium-action px-5 py-2" 
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
  cliente: any = { razonSocial: '', cuit: '', observaciones: '' };

  constructor(private clienteService: ClienteService, private router: Router) {}

  guardar(): void {
    this.clienteService.save(this.cliente).subscribe({
      next: () => this.router.navigate(['/']),
      error: (err: any) => console.error(err)
    });
  }

  cancelar(): void {
    this.router.navigate(['/']);
  }
}