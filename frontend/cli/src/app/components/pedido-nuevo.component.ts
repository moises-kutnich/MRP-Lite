import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
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
      
      <div *ngIf="mensajeExito" class="alert alert-success alert-dismissible fade show shadow mb-4" role="alert" style="border-radius: 8px;">
        <i class="bi bi-check-circle-fill me-2"></i> {{ mensajeExito }}
        <button type="button" class="btn-close" (click)="mensajeExito = null" aria-label="Close"></button>
      </div>

      <div class="card shadow-lg card-premium text-light" style="border-radius: 12px !important;">
        <div class="card-header header-premium">
          <h3 class="m-0 font-weight-bold text-white text-uppercase tracking-wide fs-4">
            <i class="bi bi-box-seam me-2 text-white"></i>Registrar Pedido de Fabricación
          </h3>
        </div>
        
        <div class="card-body p-4">
          <form (ngSubmit)="guardar(pedidoForm)" #pedidoForm="ngForm">
            
            <div class="mb-4">
              <label for="select-cliente" class="form-label text-white font-medium fs-5">
                Cliente
              </label>
              <select 
                id="select-cliente" 
                name="cliente" 
                class="form-select input-premium" 
                [(ngModel)]="clienteSeleccionado" 
                required
                #clienteField="ngModel">
                <option [ngValue]="null" disabled selected>Seleccione cliente por nombre / CUIT</option>
                <option *ngFor="let clie of clientes" [ngValue]="clie">
                  {{ clie.razonSocial }} ({{ clie.cuit }})
                </option>
              </select>
              <div *ngIf="clienteField.invalid && clienteField.touched" class="text-danger mt-1 small">
                El cliente es obligatorio para realizar el pedido.
              </div>
            </div>

            <div class="mb-4">
              <label for="select-producto" class="form-label text-white font-medium fs-5">
                Producto a Fabricar
              </label>
              <select 
                id="select-producto" 
                name="producto" 
                class="form-select input-premium" 
                [(ngModel)]="productoSeleccionado" 
                required>
                <option [ngValue]="null" disabled selected>Seleccione el producto de la lista</option>
                <option *ngFor="let prod of productos" [ngValue]="prod">
                  {{ prod.nombre }}
                </option>
              </select>
            </div>

            <div class="mb-4">
              <label for="input-cantidad" class="form-label text-white font-medium fs-5">
                Cantidad de Unidades
              </label>
              <input 
                type="number" 
                id="input-cantidad" 
                name="cantidad" 
                class="form-control input-premium control-flechas-premium" 
                [(ngModel)]="cantidadInput" 
                required 
                min="1" />
            </div>

            <div class="row">
              <div class="col-md-6 mb-4">
                <label for="input-fecha-pedido" class="form-label text-white font-medium fs-5">
                  Fecha de Registro del Pedido
                </label>
                <input 
                  type="date" 
                  id="input-fecha-pedido" 
                  name="fechaPedido" 
                  class="form-control input-premium date-picker-premium" 
                  [(ngModel)]="fechaPedidoInput" 
                  required />
              </div>

              <div class="col-md-6 mb-4">
                <label for="input-fecha-entrega" class="form-label text-white font-medium fs-5">
                  Fecha de Entrega
                </label>
                <input 
                  type="date" 
                  id="input-fecha-entrega" 
                  name="fechaEntrega" 
                  class="form-control input-premium date-picker-premium" 
                  [(ngModel)]="fechaEntregaInput" 
                  required />
              </div>
            </div>

            <div class="d-flex justify-content-end gap-3 mt-5 border-top border-secondary pt-4">
              <button type="button" class="btn btn-outline-secondary px-4 py-2 text-light border-secondary" style="border-radius: 8px;" (click)="cancelar()">
                Cancelar
              </button>
              <button 
                type="submit" 
                id="btn-guardar" 
                class="btn btn-premium-action px-5 py-2" 
                [disabled]="pedidoForm.invalid || guardando">
                {{ guardando ? 'Guardando...' : 'Generar Pedido' }}
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .date-picker-premium::-webkit-calendar-picker-indicator {
      filter: invert(1) opacity(0.7);
    }
    .control-flechas-premium::-webkit-inner-spin-button,
    .control-flechas-premium::-webkit-outer-spin-button {
      background-color: #212529 !important;
      filter: invert(1) brightness(1.5);
      cursor: pointer;
    }
  `]
})
export class PedidoNuevoComponent implements OnInit {
  productos: any[] = [];
  clientes: any[] = [];

  clienteSeleccionado: any = null;
  productoSeleccionado: any = null;
  cantidadInput: number | null = null;
  fechaPedidoInput: string = '';
  fechaEntregaInput: string = '';

  mensajeExito: string | null = null;
  guardando: boolean = false;

  constructor(
    private productoService: ProductoService, 
    private clienteService: ClienteService, 
    private pedidoService: PedidoService, 
    private router: Router
  ) {}

  ngOnInit(): void {
    this.productoService.findAll().subscribe((res: any) => this.productos = res.data || res);
    this.clienteService.findAll().subscribe((res: any) => this.clientes = res.data || res);
  }

  guardar(form: NgForm): void {
    this.guardando = true;

    const payload = {
      cliente: this.clienteSeleccionado ? { id: this.clienteSeleccionado.id } : null,
      producto: this.productoSeleccionado ? { id: this.productoSeleccionado.id } : null,
      cantidad: this.cantidadInput,
      fechaPedido: this.fechaPedidoInput,
      fechaEntrega: this.fechaEntregaInput
    };

    this.pedidoService.guardar(payload).subscribe({
      next: (res: any) => {
        this.mensajeExito = res.message || 'Pedido de fabricación generado correctamente';
        
        this.clienteSeleccionado = null;
        this.productoSeleccionado = null;
        this.cantidadInput = null;
        this.fechaPedidoInput = '';
        this.fechaEntregaInput = '';
        
        form.resetForm();
        this.guardando = false;

        setTimeout(() => {
          this.mensajeExito = null;
        }, 4000);
      },
      error: (err: any) => {
        console.error('Error al enviar los datos:', err);
        this.guardando = false;
      }
    });
  }

  cancelar(): void {
    this.router.navigate(['/']);
  }
}