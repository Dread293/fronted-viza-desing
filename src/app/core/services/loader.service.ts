import { Injectable, signal } from '@angular/core';

// ─── Servicio de loader global ──────────────────────────────────────────────
// El interceptor HTTP suma/resta. El componente loader lee la señal.
@Injectable({ providedIn: 'root' })
export class LoaderService {
  // Contador de requests GET activos
  private _count = 0;

  // Signal pública que el componente loader observa
  readonly visible = signal(false);

  mostrar(): void {
    this._count++;
    this.visible.set(true);
  }

  ocultar(): void {
    this._count--;
    if (this._count <= 0) {
      this._count = 0;
      this.visible.set(false);
    }
  }
}
