import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { TallerService } from '../services/taller.service';
import { TipoEquipoService } from '../services/tipo-equipo.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-taller-nuevo',
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
            <i class="bi bi-gear-wide-connected me-2 text-white"></i>Gestión de Talleres
          </h3>
        </div>
        
        <div class="card-body p-4">
          <form (ngSubmit)="guardar(tallerForm)" #tallerForm="ngForm">
            
            <div class="mb-4">
              <label for="input-codigo" class="form-label text-white font-medium fs-5">
                Código de Identificación
              </label>
              <input 
                type="text" 
                id="input-codigo" 
                name="codigo" 
                class="form-control input-premium" 
                [(ngModel)]="taller.codigo" 
                required />
            </div>

            <div class="mb-4">
              <label for="input-nombre" class="form-label text-white font-medium fs-5">
                Nombre
              </label>
              <input 
                type="text" 
                id="input-nombre" 
                name="nombre" 
                class="form-control input-premium" 
                [(ngModel)]="taller.nombre" 
                required />
            </div>

            <h4 class="text-white mt-4 mb-3 border-bottom border-secondary pb-2 fs-5">
              Configurar Equipamiento
            </h4>
            
            <div class="row bg-black bg-opacity-25 p-3 rounded border border-secondary mb-4 align-items-center" *ngFor="let eq of taller.equipos; let i = index">
              <div class="col-md-5">
                <label class="form-label text-secondary small">Tipo de Máquina/Equipo</label>
                <select [name]="'tipo-' + i" class="form-select input-premium" [(ngModel)]="eq.tipo" required>
                  <option [ngValue]="null" disabled>Seleccione tipo...</option>
                  <option *ngFor="let t of tipos" [ngValue]="t">{{ t.nombre }}</option>
                </select>
              </div>
              <div class="col-md-4">
                <label class="form-label text-secondary small">Capacidad Productiva</label>
                <input type="number" [name]="'cap-' + i" class="form-control input-premium" [(ngModel)]="eq.capacidad" required min="1" />
              </div>
              <div class="col-md-3 d-flex align-items-end justify-content-end mt-3 mt-md-0">
                <button type="button" class="btn btn-outline-danger w-100" (click)="removerEquipo(i)">
                  Eliminar
                </button>
              </div>
            </div>

            <button type="button" class="btn btn-outline-primary mb-4" (click)="agregarEquipo()">
              Añadir Unidad Operativa
            </button>

            <div class="d-flex justify-content-end gap-3 mt-5 border-top border-secondary pt-4">
              <button type="button" class="btn btn-outline-secondary px-4 py-2 text-light border-secondary" style="border-radius: 8px;" (click)="cancelar()">
                Cancelar
              </button>
              <button 
                type="submit" 
                id="btn-guardar" 
                class="btn btn-premium-action px-5 py-2" 
                [disabled]="tallerForm.invalid || guardando">
                {{ guardando ? 'Guardando...' : 'Guardar Taller' }}
              </button>
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
  mensajeExito: string | null = null;
  guardando: boolean = false;

  constructor(private tallerService: TallerService, private tipoService: TipoEquipoService, private router: Router) {}

  ngOnInit(): void {
    this.tipoService.findAll().subscribe({
      next: (res: any) => {
        if (res && res.data) {
          this.tipos = res.data;
        } else {
          this.tipos = res;
        }
        console.log('Tipos de equipo cargados para el taller:', this.tipos);
      },
      error: (err) => {
        console.error('Error al cargar tipos de equipo:', err);
      }
    });
  }

  agregarEquipo(): void {
    this.taller.equipos.push({ tipo: null, capacidad: 1 });
  }

  removerEquipo(index: number): void {
    this.taller.equipos.splice(index, 1);
  }

  guardar(form: NgForm): void {
    this.guardando = true;

    this.taller.equipos.forEach((eq: any, index: number) => {
      if (eq.tipo && eq.tipo.codigo) {
        eq.codigo = `${this.taller.codigo}-${eq.tipo.codigo}-${index + 1}`;
      } else {
        eq.codigo = `${this.taller.codigo}-EQ-${index + 1}`;
      }
    });

    this.tallerService.guardarTaller(this.taller).subscribe({
      next: (res: any) => {
        this.mensajeExito = res.message || 'Taller ingresado correctamente';
        
        this.taller = { codigo: '', nombre: '', equipos: [] };
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