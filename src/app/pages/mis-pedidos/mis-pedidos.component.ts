import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PedidosService } from '../../core/services/pedidos.service';
import { MiPedidoResumen } from '../../core/models/pedido.model';
import { timeout } from 'rxjs';

// ─── Página Mis Pedidos (Listado) ─────────────────────────────────────────────
@Component({
  selector: 'app-mis-pedidos',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './mis-pedidos.component.html',
  styleUrl: './mis-pedidos.component.css'
})
export class MisPedidosComponent implements OnInit {
  pedidos: MiPedidoResumen[] = [];
  cargando = true;
  error: string | null = null;

  constructor(private pedidosService: PedidosService) {}

  ngOnInit(): void {
    this.cargarPedidos();
  }

  cargarPedidos(): void {
    this.cargando = true;
    this.error = null;
    this.pedidosService.obtenerMisPedidos().pipe(timeout({ first: 15000 })).subscribe({
      next: (data) => {
        // El endpoint actual devuelve un array. Evitar que una respuesta vacía/null rompa la vista.
        this.pedidos = Array.isArray(data) ? data : [];
        this.cargando = false;
      },
      error: (err) => {
        if (err?.status === 401) {
          this.error = 'Tu sesión expiró o no se pudo validar. Cierra sesión e inicia sesión nuevamente.';
        } else if (err?.status === 0) {
          this.error = 'No se pudo conectar con el backend. Comprueba que ASP.NET Core esté ejecutándose en http://localhost:5205.';
        } else if (err?.name === 'TimeoutError') {
          this.error = 'El servidor tardó demasiado en responder. Intenta nuevamente.';
        } else {
          this.error = err?.error?.mensaje || err?.error?.message || 'No se pudieron cargar tus pedidos.';
        }
        this.cargando = false;
      }
    });
  }

  formatearFecha(fecha: string | null): string {
    if (!fecha) return 'Sin fecha estimada';
    try {
      const d = new Date(fecha);
      return d.toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' });
    } catch {
      return fecha;
    }
  }
}
