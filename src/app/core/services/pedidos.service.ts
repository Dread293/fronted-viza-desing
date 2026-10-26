import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API } from '../config/api.config';
import {
  MiPedidoResumen,
  MiPedidoDetalle,
  EstadoPedidoInfo,
  Diseno,
  PedidoCrear,
  PedidoCreado,
} from '../models/pedido.model';

// ─── Servicio de Pedidos ─────────────────────────────────────────────────────
// Todos los endpoints son privados (el interceptor agrega el Bearer token).
@Injectable({ providedIn: 'root' })
export class PedidosService {
  constructor(private http: HttpClient) {}

  // GET /api/mis-pedidos
  obtenerMisPedidos() {
    return this.http.get<MiPedidoResumen[]>(API.misPedidos);
  }

  // GET /api/mis-pedidos/{id}
  obtenerDetalle(id: number) {
    return this.http.get<MiPedidoDetalle>(API.miPedido(id));
  }

  // GET /api/mis-pedidos/{id}/estado
  obtenerEstado(id: number) {
    return this.http.get<EstadoPedidoInfo>(API.estadoPedido(id));
  }

  // GET /api/mis-pedidos/{pedidoId}/disenos
  obtenerDisenos(pedidoId: number) {
    return this.http.get<Diseno[]>(API.disenos(pedidoId));
  }

  // POST /api/mis-pedidos/{pedidoId}/disenos/{disenoId}/aprobar
  aprobarDiseno(pedidoId: number, disenoId: number) {
    return this.http.post<Diseno>(API.aprobarDiseno(pedidoId, disenoId), {});
  }

  // POST /api/mis-pedidos/{pedidoId}/disenos/{disenoId}/rechazar
  rechazarDiseno(pedidoId: number, disenoId: number, comentario: string) {
    return this.http.post<Diseno>(API.rechazarDiseno(pedidoId, disenoId), { comentario });
  }

  // POST /api/pedidos (crear cotización)
  crearPedido(body: PedidoCrear) {
    return this.http.post<PedidoCreado>(API.pedidos, body);
  }
}
