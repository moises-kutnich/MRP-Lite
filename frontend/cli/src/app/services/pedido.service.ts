import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DataPackage } from '../data-package';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  private url = '/rest/pedidos';

  constructor(private http: HttpClient) { }

  guardar(pedido: any): Observable<DataPackage> {
    return this.http.post<DataPackage>(this.url, pedido);
  }
}