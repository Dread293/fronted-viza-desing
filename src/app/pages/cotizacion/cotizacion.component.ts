import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { CategoriasService } from '../../core/services/categorias.service';
import { PedidosService } from '../../core/services/pedidos.service';
import { AuthService } from '../../core/services/auth.service';
import { Categoria } from '../../core/models/categoria.model';

import { catchError, finalize, timeout, throwError } from 'rxjs';

// ─── Página Pedir Cotización ──────────────────────────────────────────────────
@Component({
  selector: 'app-cotizacion',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './cotizacion.component.html',
  styleUrl: './cotizacion.component.css',
})
export class CotizacionComponent implements OnInit {
  categorias: Categoria[] = [];

  // Campos del formulario
  categoriaId: number | null = null;
  descripcion = '';
  fechaEntregaEstimada = '';

  // Estados del loader de cotización
  enviando = false;
  exito = false;
  errorMensaje: string | null = null;
  formularioInvalido = false;

  constructor(
    private categoriasService: CategoriasService,
    private pedidosService: PedidosService,
    public auth: AuthService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    // Cargar categorías disponibles
    this.categoriasService.obtenerTodas().subscribe({
      next: (cats) => {
        this.categorias = cats;
        // Si vino categoriaId por queryParam (ej: desde trabajo-detalle)
        const qpCatId = this.route.snapshot.queryParamMap.get('categoriaId');
        if (qpCatId) {
          this.categoriaId = Number(qpCatId);
        }
      },
      error: () => {},
    });
  }

  enviarCotizacion(): void {
    this.errorMensaje = null;
    this.formularioInvalido = false;

    if (!this.auth.estaLogueado()) {
      this.router.navigate(['/login'], { queryParams: { redirect: '/cotizacion' } });
      return;
    }

    const cliente = this.auth.cliente();
    if (!cliente || !Number.isFinite(Number(cliente.id)) || Number(cliente.id) <= 0) {
      // Si el navegador perdió el perfil guardado, intentar recuperarlo desde el token.
      this.auth.obtenerPerfil().subscribe({
        next: (perfil) => {
          localStorage.setItem('cliente', JSON.stringify(perfil));
          this.auth.cliente.set(perfil);
          this.enviarCotizacion();
        },
        error: () => {
          this.errorMensaje =
            'Tu sesión no tiene un perfil válido. Cierra sesión e inicia sesión nuevamente.';
        },
      });
      return;
    }

    if (!this.descripcion.trim()) {
      this.formularioInvalido = true;
      return;
    }

    this.enviando = true;

    const payload = {
      clienteId: cliente.id,
      categoriaId: this.categoriaId ? Number(this.categoriaId) : null,
      descripcion: this.descripcion.trim(),
      fechaEntregaEstimada: this.fechaEntregaEstimada ? this.fechaEntregaEstimada : null,
    };

    this.pedidosService
      .crearPedido(payload)
      .pipe(
        // Evita que el overlay quede abierto si el servidor no termina de responder.
        timeout({ first: 25000 }),
        catchError((err) => {
          if (err?.name === 'TimeoutError') {
            return throwError(
              () =>
                new Error(
                  'El servidor tardó demasiado en responder. Comprueba Mis pedidos antes de volver a enviar la solicitud.',
                ),
            );
          }
          return throwError(() => err);
        }),
        finalize(() => {
          this.enviando = false;
        }),
      )
      .subscribe({
        next: () => {
          this.enviando = false;
          this.exito = true;
          this.errorMensaje = null;
          this.descripcion = '';
          this.fechaEntregaEstimada = '';
          // Cerrar automáticamente el modal de éxito para no dejar la pantalla bloqueada.
          setTimeout(() => {
            this.exito = false;
          }, 3500);
        },
        error: (err) => {
          this.enviando = false;
          this.exito = false;
          this.errorMensaje =
            err?.error?.mensaje ||
            err?.error?.message ||
            err?.message ||
            'No se pudo registrar la cotización. Verifica tu conexión e inténtalo nuevamente.';
          // El error queda visible unos segundos y después permite volver al formulario.
          setTimeout(() => {
            this.errorMensaje = null;
          }, 5000);
        },
      });
  }
}
