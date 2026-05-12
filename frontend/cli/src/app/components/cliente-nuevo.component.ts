import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClienteService } from '../services/cliente.service';

@Component({
  selector: 'app-cliente-nuevo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="card-container">
      <div class="card-header">
        <h2>Nuevo Cliente</h2>
      </div>
      
      <div class="card-body">
        <div class="form-group">
          <label>Razón Social</label>
          <input type="text" [(ngModel)]="cliente.razonSocial" placeholder="Ej: Prilidiano Pueyrredon">
        </div>

        <div class="form-group">
          <label>CUIT</label>
          <input type="number" [(ngModel)]="cliente.cuit" placeholder="Solo números">
        </div>

        <div class="form-group">
          <label>Observaciones</label>
          <textarea [(ngModel)]="cliente.observaciones" rows="3" placeholder="Opcional..."></textarea>
        </div>

        <div class="button-group">
          <button class="btn-primary" (click)="guardar()">Guardar</button>
          <button class="btn-secondary" (click)="limpiar()">Cancelar</button>
        </div>

        @if (respuestaBackend) {
          <div class="alert-success">
            {{ respuestaBackend }}
          </div>
        }
      </div>
    </div>
  `,
  styles: [`
    .card-container {
      max-width: 500px;
      margin: 2rem auto;
      border: 1px solid #ddd;
      border-radius: 8px;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
      background: white;
font-family: system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;    }
    .card-header {
      background-color: #343a40; 
      color: white;
      padding: 1rem;
      border-radius: 8px 8px 0 0;
    }
    .card-header h2 { margin: 0; font-size: 1.3rem; text-transform: uppercase; letter-spacing: 1px; }
    .card-body { padding: 1.5rem; }
    .form-group { margin-bottom: 1.2rem; }
    .form-group label { display: block; margin-bottom: 0.4rem; font-weight: bold; color: #333}
    .form-group input, .form-group textarea {
      width: 100%;
      padding: 0.6rem;
      border: 1px solid #ccc;
      border-radius: 4px;
      box-sizing: border-box;
      font-family: inherit;
    }
    .button-group { display: flex; gap: 10px; margin-top: 1rem; }
    button { padding: 0.6rem 1.2rem; border: none; border-radius: 4px; cursor: pointer; font-weight: bold; }
    .btn-primary { background-color: #2d9846; color: white; }
    .btn-secondary { background-color: #d44a27; color: white; }
    .alert-success {
      margin-top: 1rem;
      padding: 0.8rem;
      background-color: #d4edda;
      color: #155724;
      border-radius: 4px;
      border: 1px solid #c3e6cb;
    }
    
    button {
    transition: all 0.2s ease-in-out;
    cursor: pointer;
    }
    button:hover {
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(0,0,0,0.3);
    filter: brightness(1.1);

    }
    button:active {
    transform: scale(0.95); 
    filter: brightness(0.8);
    box-shadow: 0 2px 5px rgba(0,0,0,0.2);
    }
  `]
})
export class ClienteNuevoComponent {
  cliente = { razonSocial: '', cuit: null, observaciones: '' };
  respuestaBackend = '';

  constructor(private clienteService: ClienteService) {}

  guardar() {
    this.clienteService.save(this.cliente).subscribe({
      next: (res) => {
        this.respuestaBackend = res.message; 
        this.limpiar();
      },
      error: (err) => console.error(err)
    });
  }

  limpiar() {
    this.cliente = { razonSocial: '', cuit: null, observaciones: '' };
  }
}