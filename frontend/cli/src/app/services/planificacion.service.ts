import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DataPackage } from '../data-package';

@Injectable({
  providedIn: 'root'
})
export class PlanificacionService {
  private url = 'http://localhost:8080/rest/pedidos/planificacion';

  constructor(private http: HttpClient) { }

  obtenerPorTaller(idTaller: string): Observable<DataPackage> {
    return this.http.get<DataPackage>(`${this.url}/${idTaller}`);
  }
}