import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PedidoService } from '../services/pedido.service';
import { ClienteService } from '../services/cliente.service';
import { ProductoService } from '../services/producto.service';
import { TallerService } from '../services/taller.service';

@Component({
  selector: 'app-pedido-nuevo',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="container mt-4 p-4 border rounded shadow-sm bg-white">
      <h2 class="mb-4">Registrar y Planificar Pedido</h2>
      
      <form [formGroup]="pedidoForm" (ngSubmit)="onGuardar()" class="row g-3">
        <div class="col-md-6">
          <label class="form-label">Cliente</label>
          <select id="select-cliente" formControlName="cliente" class="form-select">
            <option [ngValue]="null">Seleccionar Cliente...</option>
            <option *ngFor="let c of clientes" [ngValue]="c">{{c.razonSocial}}</option>
          </select>
        </div>

        <div class="col-md-6">
          <label class="form-label">Producto</label>
          <select id="select-producto" formControlName="producto" class="form-select">
            <option [ngValue]="null">Seleccionar Producto...</option>
            <option *ngFor="let p of productos" [ngValue]="p">{{p.nombre}}</option>
          </select>
        </div>

        <div class="col-md-6">
          <label class="form-label">Taller de Fabricación</label>
          <select id="select-taller" formControlName="taller" class="form-select">
            <option [ngValue]="null">Seleccionar Taller...</option>
            <option *ngFor="let t of talleres" [ngValue]="t">{{t.nombre}}</option>
          </select>
        </div>

        <div class="col-md-3">
          <label class="form-label">Cantidad</label>
          <input id="input-cantidad" type="number" formControlName="cantidad" class="form-control">
        </div>

        <div class="col-md-3">
          <label class="form-label">Fecha Programada</label>
          <input id="input-fecha" type="date" formControlName="fechaEntrega" class="form-control">
        </div>

        <div class="col-12 mt-4">
          <button id="btn-guardar" type="submit" class="btn btn-primary w-100" [disabled]="pedidoForm.invalid">
            Confirmar y Planificar
          </button>
        </div>
      </form>

      <div *ngIf="mensaje" id="mensaje-exito" class="alert alert-info mt-4">
        {{ mensaje }}
      </div>
    </div>
  `
})
export class PedidoNuevoComponent implements OnInit {
  pedidoForm: FormGroup;
  clientes: any[] = [];
  productos: any[] = [];
  talleres: any[] = [];
  mensaje: string = '';

  constructor(
    private fb: FormBuilder,
    private pedidoService: PedidoService,
    private clienteService: ClienteService,
    private productoService: ProductoService,
    private tallerService: TallerService
  ) {
    this.pedidoForm = this.fb.group({
      cliente: [null, Validators.required],
      producto: [null, Validators.required],
      taller: [null],
      cantidad: [1, [Validators.required, Validators.min(1)]],
      fechaEntrega: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.clienteService.findAll().subscribe(res => this.clientes = res.data);
    this.productoService.findAll().subscribe(res => this.productos = res.data);
    this.tallerService.findAll().subscribe(res => this.talleres = res.data);
  }

  onGuardar() {
    this.pedidoService.guardar(this.pedidoForm.value).subscribe({
      next: (res: any) => {
        this.mensaje = res.message;
        this.pedidoForm.reset({cantidad: 1});
      },
      error: () => this.mensaje = 'Error al registrar el pedido'
    });
  }
}