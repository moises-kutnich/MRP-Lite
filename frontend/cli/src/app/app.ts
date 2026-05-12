import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule],
  template: `
    <div class="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom shadow-sm">
      <h5 class="my-0 mr-md-auto font-weight-normal">Delivery</h5>
      
      <nav class="my-2 my-md-0 mr-md-3 d-flex align-items-center">
        <div class="dropdown d-inline-block">
          <a class="p-2 text-dark dropdown-toggle" (click)="menuAbierto = !menuAbierto" style="cursor: pointer; text-decoration: none;">
            Empresas (Clientes)
          </a>
          <div class="dropdown-menu" [class.show]="menuAbierto">
             <a class="dropdown-item" routerLink="/empresa" (click)="menuAbierto = false">Nuevo</a>
             <a class="dropdown-item" routerLink="/empresa" (click)="menuAbierto = false">Listar</a>
          </div>
        </div>
      </nav>
    </div>

    <div class="container">
      <router-outlet></router-outlet>
    </div>
  `,
  styles: []
})
export class App {
  menuAbierto = false;
}