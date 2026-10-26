import { Component, OnInit } from '@angular/core';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TrabajosService } from '../../core/services/trabajos.service';
import { Trabajo, MediaItem } from '../../core/models/trabajo.model';
import { BASE_URL } from '../../core/config/api.config';

// ─── Página Detalle de Trabajo ────────────────────────────────────────────────
@Component({
  selector: 'app-trabajo-detalle',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './trabajo-detalle.component.html',
  styleUrl: './trabajo-detalle.component.css',
})
export class TrabajoDetalleComponent implements OnInit {
  trabajo: Trabajo | null = null;
  error: string | null = null;
  // Índice del media seleccionado para mostrar en grande
  mediaSeleccionado = 0;

  constructor(
    private route: ActivatedRoute,
    private trabajosService: TrabajosService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.trabajosService.obtenerPorId(id).subscribe({
      next: (t) => {
        this.trabajo = t;
        // Seleccionar el media de portada por defecto
        const portadaIdx = t.media.findIndex((m) => m.esPortada);
        this.mediaSeleccionado = portadaIdx >= 0 ? portadaIdx : 0;
      },
      error: (err) => (this.error = err.error?.mensaje || 'Trabajo no encontrado'),
    });
  }

  // Construye la URL completa del media
  urlMedia(url: string): string {
    if (!url) return 'assets/placeholder.png';
    if (url.startsWith('http')) return url;
    if (url.startsWith('/')) return `${BASE_URL}${url}`;
    return url;
  }
}
