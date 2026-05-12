import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule],
  template: `
    <nav class="navbar">
      <div class="nav-brand">Gorpbal S.R.L. </div>
      <div class="nav-links">
        <a routerLink="/clientes/nuevo" routerLinkActive="active-link">Clientes</a>        
        <a routerLink="/tipo-equipo/nuevo" routerLinkActive="active-link">Tipo de Equipo</a>
        <a routerLink="/talleres/nuevo" routerLinkActive="active-link">Taller y Equipo</a>     
        <a routerLink="/productos/nuevo" routerLinkActive="active-link">Productos</a>
        <a routerLink="/planificacion" routerLinkActive="active-link">Visualizar Planificación</a>
        <a routerLink="/pedidos" routerLinkActive="active-link">Pedidos</a>
      </div>
    </nav>

    <main class="content">
      <router-outlet></router-outlet>
    </main>
  `,
  styles: [`
    :host {
      display: block;
      font-family: system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
      background-color: #f4f7f6; 
      min-height: 100vh;
    }

    .navbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: #1a252f; 
      padding: 0.7rem 2.5rem;
      color: white;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      border-bottom: 3px solid #3498db;
      position: sticky;
      top: 0;
      z-index: 1000;
    }

    .nav-brand {
      font-size: 1.4rem;
      font-weight: 800;
      letter-spacing: 2px;
      color: #ffffff;
    }

    .nav-links {
      display: flex;
      gap: 12px;
    }

    .nav-links a {
      color: #bdc3c7;
      text-decoration: none;
      font-weight: 600;
      padding: 0.6rem 1.2rem;
      border-radius: 6px;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .nav-links a:hover {
      color: white;
      background-color: rgba(255, 255, 255, 0.08);
      transform: translateY(-1px);
    }

    /* Estilo para cuando el link está activo */
    .active-link {
      color: white !important;
      background-color: #3498db !important;
    }

    .nav-links a:active {
      transform: scale(0.95);
    }

    .content {
      max-width: 1200px;
      margin: 0 auto;
      padding: 40px 20px;
    }
  `]
})
export class AppComponent {}