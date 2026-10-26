import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

// ─── Página de Registro de Clientes ──────────────────────────────────────────
@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {
  nombre = '';
  telefono = '';
  email = '';
  password = '';
  passwordConfirm = '';

  cargando = false;
  errorMensaje: string | null = null;
  exito = false;

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  registrar(): void {
    this.errorMensaje = null;

    if (!this.nombre.trim() || !this.telefono.trim() || !this.email.trim() || !this.password) {
      this.errorMensaje = 'Todos los campos son obligatorios.';
      return;
    }

    if (this.password !== this.passwordConfirm) {
      this.errorMensaje = 'Las contraseñas no coinciden.';
      return;
    }

    if (this.password.length < 8) {
      this.errorMensaje = 'La contraseña debe tener al menos 8 caracteres.';
      return;
    }

    this.cargando = true;

    const payload = {
      nombre: this.nombre.trim(),
      telefono: this.telefono.trim(),
      email: this.email.trim(),
      password: this.password
    };

    this.auth.registro(payload).subscribe({
      next: () => {
        // Auto-login con las credenciales registradas
        this.auth.login(payload.email, payload.password).subscribe({
          next: () => {
            this.cargando = false;
            this.router.navigate(['/mis-pedidos']);
          },
          error: () => {
            this.cargando = false;
            this.exito = true;
          }
        });
      },
      error: (err) => {
        this.cargando = false;
        this.errorMensaje = err?.error?.mensaje || err?.error?.message || 'Error al registrarse. Por favor verifica tus datos.';
      }
    });
  }
}
