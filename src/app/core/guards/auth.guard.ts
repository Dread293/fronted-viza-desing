import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

// ─── Guard de autenticación ───────────────────────────────────────────────────
// Si no hay token en localStorage, redirige a /login.
export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const token = localStorage.getItem('token');

  if (token) {
    return true;
  }

  // Sin sesión → al login
  router.navigate(['/login']);
  return false;
};
