import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DataPackage } from '../data-package';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private url = 'http://localhost:8080/productos';

  constructor(private http: HttpClient) { }

  guardar(producto: any): Observable<DataPackage> {
    return this.http.post<DataPackage>(this.url, producto);
  }
  
  findAll(): Observable<DataPackage> {
  return this.http.get<DataPackage>(this.url);
  }
}