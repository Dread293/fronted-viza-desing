import { Pipe, PipeTransform } from '@angular/core';
import { BASE_URL } from '../core/config/api.config';

// ─── Pipe imgUrl ─────────────────────────────────────────────────────────────
// Convierte URLs relativas del backend (ej: "/uploads/foto.jpg")
// en URLs absolutas anteponiendo la BASE_URL.
// Si la URL es null o vacía, devuelve el placeholder.
@Pipe({ name: 'imgUrl', standalone: true })
export class ImgUrlPipe implements PipeTransform {
  transform(url: string | null | undefined): string {
    if (!url) return 'assets/placeholder.png';
    // Si ya es absoluta, devolverla tal cual
    if (url.startsWith('http')) return url;
    // Si empieza con "/" → anteponer la base del backend
    if (url.startsWith('/')) return `${BASE_URL}${url}`;
    return url;
  }
}
