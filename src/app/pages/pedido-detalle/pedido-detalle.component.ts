import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PedidosService } from '../../core/services/pedidos.service';
import { MiPedidoDetalle, EstadoPedidoInfo, Diseno } from '../../core/models/pedido.model';
import { ImgUrlPipe } from '../../pipes/img-url.pipe';

// ─── Página Detalle y Seguimiento de Pedido ──────────────────────────────────
@Component({
  selector: 'app-pedido-detalle',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, ImgUrlPipe],
  templateUrl: './pedido-detalle.component.html',
  styleUrl: './pedido-detalle.component.css'
})
export class PedidoDetalleComponent implements OnInit {
  pedidoId!: number;
  pedido: MiPedidoDetalle | null = null;
  estadoInfo: EstadoPedidoInfo | null = null;
  disenos: Diseno[] = [];

  cargando = true;
  error: string | null = null;

  // Estado para el modal/acción de rechazo
  disenoParaRechazar: Diseno | null = null;
  comentarioRechazo = '';
  enviandoAccion = false;
  accionError: string | null = null;

  // Vista ampliada de imagen
  imagenZoom: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private pedidosService: PedidosService
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.pedidoId = Number(idParam);
      this.cargarDatos();
    } else {
      this.error = 'Identificador de pedido no válido.';
      this.cargando = false;
    }
  }

  cargarDatos(): void {
    this.cargando = true;
    this.error = null;

    // Cargar detalle
    this.pedidosService.obtenerDetalle(this.pedidoId).subscribe({
      next: (det) => {
        this.pedido = det;
        this.cargando = false;
      },
      error: (err) => {
        this.error = err?.error?.mensaje || err?.error?.message || 'No se pudo cargar la información del pedido.';
        this.cargando = false;
      }
    });

    // Cargar estado & línea de tiempo
    this.pedidosService.obtenerEstado(this.pedidoId).subscribe({
      next: (est) => {
        this.estadoInfo = est;
      },
      error: () => {}
    });

    // Cargar diseños
    this.cargarDisenos();
  }

  cargarDisenos(): void {
    this.pedidosService.obtenerDisenos(this.pedidoId).subscribe({
      next: (dis) => {
        this.disenos = dis;
      },
      error: () => {}
    });
  }

  aprobarDiseno(diseno: Diseno): void {
    if (!confirm(`¿Estás seguro de que deseas aprobar el diseño "${diseno.etiqueta}"?`)) {
      return;
    }

    this.enviandoAccion = true;
    this.pedidosService.aprobarDiseno(this.pedidoId, diseno.id).subscribe({
      next: () => {
        this.enviandoAccion = false;
        this.cargarDisenos();
      },
      error: (err) => {
        this.enviandoAccion = false;
        alert(err?.error?.mensaje || err?.error?.message || 'Error al aprobar el diseño.');
      }
    });
  }

  abrirModalRechazo(diseno: Diseno): void {
    this.disenoParaRechazar = diseno;
    this.comentarioRechazo = '';
    this.accionError = null;
  }

  cerrarModalRechazo(): void {
    this.disenoParaRechazar = null;
    this.comentarioRechazo = '';
    this.accionError = null;
  }

  confirmarRechazo(): void {
    if (!this.disenoParaRechazar) return;
    if (!this.comentarioRechazo.trim()) {
      this.accionError = 'Por favor escribe el motivo o las observaciones del rechazo.';
      return;
    }

    this.enviandoAccion = true;
    this.accionError = null;

    this.pedidosService
      .rechazarDiseno(this.pedidoId, this.disenoParaRechazar.id, this.comentarioRechazo.trim())
      .subscribe({
        next: () => {
          this.enviandoAccion = false;
          this.cerrarModalRechazo();
          this.cargarDisenos();
        },
        error: (err) => {
          this.enviandoAccion = false;
          this.accionError = err?.error?.mensaje || err?.error?.message || 'Error al registrar el rechazo.';
        }
      });
  }

  abrirZoom(url: string | null | undefined): void {
    if (!url) {
      this.imagenZoom = 'assets/placeholder.png';
      return;
    }
    if (url.startsWith('http')) {
      this.imagenZoom = url;
    } else if (url.startsWith('/')) {
      this.imagenZoom = `http://localhost:5205${url}`;
    } else {
      this.imagenZoom = url;
    }
  }

  formatearFecha(fecha: string | null): string {
    if (!fecha) return '-';
    try {
      const d = new Date(fecha);
      return d.toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
    } catch {
      return fecha;
    }
  }
}
