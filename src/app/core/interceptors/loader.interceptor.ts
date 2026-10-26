import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize, timer, switchMap } from 'rxjs';
import { LoaderService } from '../services/loader.service';

// ─── Interceptor del Loader ───────────────────────────────────────────────────
// Solo activa el loader para requests GET.
// Espera ~200ms antes de mostrar (evita parpadeos en requests rápidos).
export const loaderInterceptor: HttpInterceptorFn = (req, next) => {
  const loader = inject(LoaderService);

  // Solo activar para GETs
  if (req.method !== 'GET') {
    return next(req);
  }

  // Timer de 200ms antes de mostrar el loader
  let timerActivo = true;
  const timerSub = timer(200).subscribe(() => {
    if (timerActivo) loader.mostrar();
  });

  return next(req).pipe(
    finalize(() => {
      // Cancelar timer si la respuesta llegó antes de 200ms
      timerActivo = false;
      timerSub.unsubscribe();
      loader.ocultar();
    })
  );
};
