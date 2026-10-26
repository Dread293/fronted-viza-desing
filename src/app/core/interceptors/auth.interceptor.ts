import { HttpInterceptorFn } from '@angular/common/http';

// ─── Interceptor de autenticación ────────────────────────────────────────────
// Agrega el header Authorization: Bearer <token> si hay token en localStorage.
// Si el server responde 401, borra el token y redirige a /login.
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token');

  // Si hay token, clonamos la request con el header
  const reqConToken = token
    ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
    : req;

  return next(reqConToken);
};
