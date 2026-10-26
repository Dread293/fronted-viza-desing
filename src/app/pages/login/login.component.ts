import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

// ─── Página de Iniciar Sesión ─────────────────────────────────────────────────
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  correo = '';
  password = '';
  cargando = false;
  errorMensaje: string | null = null;

  constructor(
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  iniciarSesion(): void {
    if (!this.correo.trim() || !this.password) {
      this.errorMensaje = 'Por favor ingresa tu correo y contraseña.';
      return;
    }

    this.cargando = true;
    this.errorMensaje = null;

    this.auth.login(this.correo.trim(), this.password).subscribe({
      next: () => {
        this.cargando = false;
        const redirect = this.route.snapshot.queryParamMap.get('redirect') || '/mis-pedidos';
        this.router.navigateByUrl(redirect);
      },
      error: (err) => {
        this.cargando = false;
        this.errorMensaje = err?.error?.mensaje || err?.error?.message || 'Correo o contraseña incorrectos.';
      }
    });
  }
}
