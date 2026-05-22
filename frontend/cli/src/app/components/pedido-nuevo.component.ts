import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductoService } from '../services/producto.service';
import { ClienteService } from '../services/cliente.service';
import { PedidoService } from '../services/pedido.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pedido-nuevo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container mt-4 main-card">
      <div class="card shadow-lg border-0 bg-dark text-light">
        <div class="card-header header-custom py-3">
          <h3 class="m-0 font-weight-bold tracking-wide text-uppercase">
            <i class="bi bi-box-seam me-2"></i>Registrar Pedido de Fabricación
          </h3>
        </div>
        
        <div class="card-body p-4">
          <form (ngSubmit)="guardar()" #pedidoForm="ngForm">
            
            <div class="mb-4">
              <label for="select-cliente" class="form-label text-secondary-custom font-medium">
                Cliente Solicitante
              </label>
              <select 
                id="select-cliente" 
                name="cliente" 
                class="form-select custom-input" 
                [(ngModel)]="pedido.cliente" 
                required
                #clienteField="ngModel">
                <option [ngValue]="null" disabled selected>Seleccione el cliente por Razón Social / CUIT</option>
                <option *ngFor="let clie of clientes" [ngValue]="clie">
                  {{ clie.razonSocial }} ({{ clie.cuit }})
                </option>
              </select>
              <div *ngIf="clienteField.invalid && clienteField.touched" class="text-danger mt-1 small">
                El cliente es obligatorio para confeccionar el pedido.
              </div>
            </div>

            <div class="mb-4">
              <label for="select-producto" class="form-label text-secondary-custom font-medium">
                Producto a Fabricar
              </label>
              <select 
                id="select-producto" 
                name="producto" 
                class="form-select custom-input" 
                [(ngModel)]="pedido.producto" 
                required
                #prodField="ngModel">
                <option [ngValue]="null" disabled selected>Seleccione el producto de la lista</option>
                <option *ngFor="let prod of productos" [ngValue]="prod">
                  {{ prod.nombre }}
                </option>
              </select>
              <div *ngIf="prodField.invalid && prodField.touched" class="text-danger mt-1 small">
                El producto es requerido.
              </div>
            </div>

            <div class="mb-4">
              <label for="input-cantidad" class="form-label text-secondary-custom font-medium">
                Cantidad de Unidades
              </label>
              <input 
                type="number" 
                id="input-cantidad" 
                name="cantidad" 
                class="form-control custom-input" 
                [(ngModel)]="pedido.cantidad" 
                required 
                min="1"
                #cantField="ngModel" />
              <div *ngIf="cantField.invalid && cantField.touched" class="text-danger mt-1 small">
                La cantidad debe ser mayor o igual a 1.
              </div>
            </div>

            <div class="row">
              <div class="col-md-6 mb-4">
                <label for="input-fecha-pedido" class="form-label text-secondary-custom font-medium">
                  Fecha de Registro del Pedido
                </label>
                <input 
                  type="date" 
                  id="input-fecha-pedido" 
                  name="fechaPedido" 
                  class="form-control custom-input date-picker-custom" 
                  [(ngModel)]="pedido.fechaPedido" 
                  required
                  #fpField="ngModel" />
                <div *ngIf="fpField.invalid && fpField.touched" class="text-danger mt-1 small">
                  La fecha de registro del pedido es requerida.
                </div>
              </div>

              <div class="col-md-6 mb-4">
                <label for="input-fecha-entrega" class="form-label text-secondary-custom font-medium">
                  Fecha Prometida de Entrega
                </label>
                <input 
                  type="date" 
                  id="input-fecha-entrega" 
                  name="fechaEntrega" 
                  class="form-control custom-input date-picker-custom" 
                  [(ngModel)]="pedido.fechaEntrega" 
                  required
                  #feField="ngModel" />
                <div *ngIf="feField.invalid && feField.touched" class="text-danger mt-1 small">
                  La fecha de entrega estimada es requerida.
                </div>
              </div>
            </div>

            <div class="d-flex justify-content-end gap-3 mt-5">
              <button type="button" class="btn btn-outline-secondary px-4 py-2" (click)="cancelar()">
                Cancelar
              </button>
              <button 
                type="submit" 
                id="btn-guardar" 
                class="btn btn-action px-5 py-2" 
                [disabled]="pedidoForm.invalid">
                Generar Pedido
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  `,
  styles: [`
    /* Inversión cromática nativa local para que los iconos de fecha de webkit no queden negros e invisibles */
    .date-picker-custom::-webkit-calendar-picker-indicator {
      filter: invert(1) sepia(0) saturate(0) hue-rotate(0deg) opacity(0.7);
      cursor: pointer;
    }
    .date-picker-custom::-webkit-calendar-picker-indicator:hover {
      opacity: 1;
    }
  `]
})
export class PedidoNuevoComponent implements OnInit {
  productos: any[] = [];
  clientes: any[] = [];
  
  pedido: any = { 
    cliente: null, 
    producto: null, 
    cantidad: null, 
    fechaPedido: '', 
    fechaEntrega: '' 
  };

  constructor(
    private productoService: ProductoService,
    private clienteService: ClienteService,
    private pedidoService: PedidoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.productoService.findAll().subscribe((data: any) => {
      this.productos = data;
    });

    this.clienteService.findAll().subscribe((data: any) => {
      this.clientes = data;
    });
  }

  guardar(): void {
    this.pedidoService.guardar(this.pedido).subscribe({
      next: () => {
        this.router.navigate(['/planificaciones']);
      },
      error: (err: any) => console.error(err)
    });
  }

  cancelar(): void {
    this.router.navigate(['/']);
  }
}