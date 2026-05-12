import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TallerService } from '../services/taller.service';
import { TipoEquipoService } from '../services/tipo-equipo.service';

@Component({
  selector: 'app-taller-nuevo',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="container mt-4 p-4 border rounded shadow-sm bg-white">
      <h2 class="mb-4">Gestión de Talleres </h2>
      
      <div class="card mb-4">
        <div class="card-header bg-primary text-white">Ingresar Nuevo Taller</div>
        <div class="card-body">
          <form [formGroup]="tallerForm" (ngSubmit)="onGuardarTaller()" class="row g-3">
            <div class="col-md-4">
              <input formControlName="codigo" class="form-control" placeholder="Código (ej: ALFA)">
            </div>
            <div class="col-md-6">
              <input formControlName="nombre" class="form-control" placeholder="Nombre del Taller">
            </div>
            <div class="col-md-2">
              <button type="submit" class="btn btn-primary w-100" [disabled]="tallerForm.invalid">Guardar</button>
            </div>
          </form>
        </div>
      </div>

      <div class="card">
        <div class="card-header bg-success text-white">Agregar Equipos a Taller Existente</div>
        <div class="card-body">
          <form [formGroup]="equipoForm" (ngSubmit)="onActualizarTaller()" class="row g-3">
            <div class="col-md-3">
              <input formControlName="codigoTaller" class="form-control" placeholder="Código Taller">
            </div>
            <div class="col-md-3">
              <input formControlName="codigoEquipo" class="form-control" placeholder="Código Equipo">
            </div>
            <div class="col-md-2">
              <select formControlName="tipoEquipo" class="form-select">
                <option value="">Tipo...</option>
                <option *ngFor="let tipo of tipos" [value]="tipo.nombre">{{tipo.nombre}}</option>
              </select>
            </div>
            <div class="col-md-2">
              <input formControlName="capacidad" type="number" class="form-control" placeholder="Cap">
            </div>
            <div class="col-md-2">
              <button type="submit" class="btn btn-success w-100" [disabled]="equipoForm.invalid">Actualizar</button>
            </div>
          </form>
        </div>
      </div>
      
      <div *ngIf="mensaje" class="alert alert-info mt-4" role="alert">
        {{ mensaje }}
      </div>
    </div>
  `
})
export class TallerNuevoComponent implements OnInit {
  tallerForm: FormGroup;
  equipoForm: FormGroup;
  mensaje: string = '';
  tipos: any[] = [];

  constructor(
    private fb: FormBuilder, 
    private tallerService: TallerService,
    private tipoEquipoService: TipoEquipoService
  ) {
    this.tallerForm = this.fb.group({
      codigo: ['', Validators.required],
      nombre: ['', Validators.required]
    });

    this.equipoForm = this.fb.group({
      codigoTaller: ['', Validators.required],
      codigoEquipo: ['', Validators.required],
      tipoEquipo: ['', Validators.required],
      capacidad: [1, [Validators.required, Validators.min(1)]]
    });
  }

  ngOnInit() {
    this.tipoEquipoService.findAll().subscribe(res => {
      this.tipos = res.data;
    });
  }

  onGuardarTaller() {
    this.tallerService.guardarTaller(this.tallerForm.value).subscribe({
      next: (res) => {
        this.mensaje = res.message;
        this.tallerForm.reset();
      },
      error: (err) => this.mensaje = 'Error al guardar el taller'
    });
  }

  onActualizarTaller() {
    const { codigoTaller, codigoEquipo, tipoEquipo, capacidad } = this.equipoForm.value;
    const payload = { 
      codigo: codigoEquipo, 
      tipoEquipo: tipoEquipo, 
      capacidad: capacidad 
    };
    
    this.tallerService.actualizarTaller(codigoTaller, payload).subscribe({
      next: (res) => {
        this.mensaje = res.message;
        this.equipoForm.reset({capacidad: 1});
      },
      error: (err) => this.mensaje = 'Error al actualizar el taller'
    });
  }
}