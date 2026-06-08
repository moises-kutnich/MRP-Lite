import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DataPackage } from '../data-package';

@Injectable({
  providedIn: 'root'
})
export class TallerService {
  private url = 'http://localhost:8080/rest/talleres';
  
  constructor(private http: HttpClient) { }

  findAll(): Observable<DataPackage> {
    return this.http.get<DataPackage>(this.url);
  }

  guardarTaller(taller: any): Observable<DataPackage> {
    return this.http.post<DataPackage>(this.url, taller);
  }

  actualizarTaller(codigoTaller: string, equipo: any): Observable<DataPackage> {
    return this.http.put<DataPackage>(`${this.url}/${codigoTaller}/equipos`, equipo);
  }
}