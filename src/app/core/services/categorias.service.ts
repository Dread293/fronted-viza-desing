import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API } from '../config/api.config';
import { Categoria } from '../models/categoria.model';
import { Trabajo } from '../models/trabajo.model';

// ─── Servicio de Categorías ──────────────────────────────────────────────────
@Injectable({ providedIn: 'root' })
export class CategoriasService {
  constructor(private http: HttpClient) {}

  // GET /api/categorias
  obtenerTodas() {
    return this.http.get<Categoria[]>(API.categorias);
  }

  // GET /api/categorias/{slug}/trabajos
  obtenerTrabajosPorSlug(slug: string) {
    return this.http.get<Trabajo[]>(API.categoriaTrabados(slug));
  }
}
