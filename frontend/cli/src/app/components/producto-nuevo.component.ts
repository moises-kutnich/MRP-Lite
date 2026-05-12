import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ProductoService } from '../services/producto.service';
import { TipoEquipoService } from '../services/tipo-equipo.service';

@Component({
  selector: 'app-producto-nuevo',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="container mt-4 p-4 border rounded shadow-sm bg-white">
      <h2 class="mb-4">Ingresar Nuevo Producto y Tareas</h2>
      
      <form [formGroup]="productoForm" (ngSubmit)="onGuardar()">
        <div class="mb-4">
          <label class="form-label">Nombre del Producto</label>
          <input formControlName="nombre" class="form-control" placeholder="ej: Soporte metálico mediano">
        </div>

        <div class="card mb-4">
          <div class="card-header bg-secondary text-white d-flex justify-content-between align-items-center">
            <span>Lista de Tareas</span>
            <button type="button" class="btn btn-sm btn-light" (click)="agregarTarea()">+ Agregar Tarea</button>
          </div>
          <div class="card-body">
            <table class="table">
              <thead>
                <tr>
                  <th>Orden</th>
                  <th>Tarea</th>
                  <th>Tiempo (min)</th>
                  <th>Tipo de Equipo</th>
                  <th></th>
                </tr>
              </thead>
              <tbody formArrayName="tareas">
                <tr *ngFor="let tarea of tareas.controls; let i=index" [formGroupName]="i">
                  <td><input type="number" formControlName="orden" class="form-control" style="width: 70px;"></td>
                  <td><input formControlName="nombreTarea" class="form-control" placeholder="ej: Cortar"></td>
                  <td><input type="number" formControlName="tiempo" class="form-control"></td>
                  <td>
                    <select formControlName="tipoEquipo" class="form-select">
                      <option *ngFor="let tipo of tipos" [ngValue]="tipo">{{tipo.nombre}}</option>
                    </select>
                  </td>
                  <td>
                    <button type="button" class="btn btn-danger btn-sm" (click)="quitarTarea(i)">X</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <button type="submit" class="btn btn-primary w-100" [disabled]="productoForm.invalid">Guardar Producto</button>
      </form>

      <div *ngIf="mensaje" class="alert alert-info mt-4">
        {{ mensaje }}
      </div>
    </div>
  `
})
export class ProductoNuevoComponent implements OnInit {
  productoForm: FormGroup;
  tipos: any[] = [];
  mensaje: string = '';

  constructor(
    private fb: FormBuilder,
    private productoService: ProductoService,
    private tipoEquipoService: TipoEquipoService
  ) {
    this.productoForm = this.fb.group({
      nombre: ['', Validators.required],
      tareas: this.fb.array([])
    });
  }

  ngOnInit() {
    this.tipoEquipoService.findAll().subscribe(res => {
      this.tipos = res.data;
    });
    this.agregarTarea(); 
  }

  get tareas() {
    return this.productoForm.get('tareas') as FormArray;
  }

  agregarTarea() {
    const tareaForm = this.fb.group({
      nombreTarea: ['', Validators.required],
      orden: [this.tareas.length + 1, Validators.required],
      tiempo: [0, [Validators.required, Validators.min(1)]],
      tipoEquipo: [null, Validators.required]
    });
    this.tareas.push(tareaForm);
  }

  quitarTarea(index: number) {
    this.tareas.removeAt(index);
  }

  onGuardar() {
    this.productoService.guardar(this.productoForm.value).subscribe({
      next: (res) => {
        this.mensaje = res.message;
        this.productoForm.reset();
        this.tareas.clear();
        this.agregarTarea();
      },
      error: () => this.mensaje = 'Error al guardar el producto'
    });
  }
}