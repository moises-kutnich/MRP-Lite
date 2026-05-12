import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: false,
  template: `
    <div class="px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
      <h1 class="display-4">Bienvenido a Print the Bill</h1>
      <p class="lead">Este es el frontend de nuestra aplicación.</p>
    </div>
  `,
  styles: ``
})
export class HomeComponent { }