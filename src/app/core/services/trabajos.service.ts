import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { API } from '../config/api.config';
import { Trabajo } from '../models/trabajo.model';

// ─── Servicio de Trabajos ────────────────────────────────────────────────────
@Injectable({ providedIn: 'root' })
export class TrabajosService {
  constructor(private http: HttpClient) {}

  // GET /api/trabajos?categoriaId=X (categoriaId es opcional)
  obtenerTodos(categoriaId?: number) {
    let params = new HttpParams();
    if (categoriaId !== undefined) {
      params = params.set('categoriaId', categoriaId.toString());
    }
    return this.http.get<Trabajo[]>(API.trabajos, { params });
  }

  // GET /api/trabajos/{id}
  obtenerPorId(id: number) {
    return this.http.get<Trabajo>(API.trabajoDetalle(id));
  }
}
