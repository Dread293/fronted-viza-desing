import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { ClientePerfil } from '../../core/models/auth.model';

// ─── Página de Perfil de Cliente ──────────────────────────────────────────────
@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent implements OnInit {
  perfil: ClientePerfil | null = null;
  cargando = true;
  errorPerfil: string | null = null;

  // Cambiar contraseña
  passwordActual = '';
  passwordNueva = '';
  passwordConfirm = '';
  cambiandoPassword = false;
  errorPassword: string | null = null;
  exitoPassword = false;

  constructor(public auth: AuthService) {}

  ngOnInit(): void {
    this.cargarPerfil();
  }

  cargarPerfil(): void {
    this.cargando = true;
    this.auth.obtenerPerfil().subscribe({
      next: (data) => {
        this.perfil = data;
        this.cargando = false;
      },
      error: (err) => {
        this.errorPerfil = err?.error?.mensaje || err?.error?.message || 'No se pudo cargar el perfil.';
        this.cargando = false;
      }
    });
  }

  cambiarPassword(): void {
    this.errorPassword = null;
    this.exitoPassword = false;

    if (!this.passwordActual || !this.passwordNueva || !this.passwordConfirm) {
      this.errorPassword = 'Todos los campos de contraseña son requeridos.';
      return;
    }

    if (this.passwordNueva !== this.passwordConfirm) {
      this.errorPassword = 'La nueva contraseña y su confirmación no coinciden.';
      return;
    }

    if (this.passwordNueva.length < 8) {
      this.errorPassword = 'La nueva contraseña debe tener al menos 8 caracteres.';
      return;
    }

    this.cambiandoPassword = true;

    this.auth
      .cambiarPassword({
        passwordActual: this.passwordActual,
        passwordNueva: this.passwordNueva
      })
      .subscribe({
        next: () => {
          this.cambiandoPassword = false;
          this.exitoPassword = true;
          this.passwordActual = '';
          this.passwordNueva = '';
          this.passwordConfirm = '';
        },
        error: (err) => {
          this.cambiandoPassword = false;
          this.errorPassword = err?.error?.mensaje || err?.error?.message || 'Error al cambiar la contraseña. Verifica tu contraseña actual.';
        }
      });
  }

  cerrarSesion(): void {
    this.auth.logout();
  }

  formatearFecha(fecha: string | undefined): string {
    if (!fecha) return '-';
    try {
      const d = new Date(fecha);
      return d.toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' });
    } catch {
      return fecha;
    }
  }
}
