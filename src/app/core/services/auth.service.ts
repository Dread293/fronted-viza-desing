import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { API } from '../config/api.config';
import { LoginRespuesta, ClientePerfil, RegistroBody, RegistroRespuesta, CambiarPasswordBody } from '../models/auth.model';

// ─── Servicio de autenticación ───────────────────────────────────────────────
// Gestiona login, registro, perfil y cierre de sesión.
// Guarda el token y el cliente en localStorage.
@Injectable({ providedIn: 'root' })
export class AuthService {
  // Signal con el cliente logueado (null = no hay sesión)
  readonly cliente = signal<ClientePerfil | null>(this._leerCliente());

  constructor(private http: HttpClient, private router: Router) {}

  // Devuelve el token del localStorage
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // Hay sesión activa?
  estaLogueado(): boolean {
    return !!this.getToken();
  }

  // Login → guarda token y cliente
  login(correo: string, password: string) {
    return this.http.post<LoginRespuesta>(API.login, { correo, password }).pipe(
      tap((resp) => {
        localStorage.setItem('token', resp.token);
        localStorage.setItem('cliente', JSON.stringify(resp.cliente));
        this.cliente.set(resp.cliente);
      })
    );
  }

  // Registro de cliente nuevo
  registro(body: RegistroBody) {
    return this.http.post<RegistroRespuesta>(API.registro, body);
  }

  // Obtener perfil desde el backend
  obtenerPerfil() {
    return this.http.get<ClientePerfil>(API.yo);
  }

  // Cambiar contraseña
  cambiarPassword(body: CambiarPasswordBody) {
    return this.http.post<void>(API.cambiarPassword, body);
  }

  // Cerrar sesión: limpia localStorage y redirige
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('cliente');
    this.cliente.set(null);
    this.router.navigate(['/login']);
  }

  // Lee el cliente guardado en localStorage al iniciar la app
  private _leerCliente(): ClientePerfil | null {
    const raw = localStorage.getItem('cliente');
    if (!raw) return null;
    try { return JSON.parse(raw) as ClientePerfil; }
    catch { localStorage.removeItem('cliente'); return null; }
  }
}
