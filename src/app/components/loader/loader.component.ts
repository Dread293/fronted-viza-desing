import { Component } from '@angular/core';
import { LoaderService } from '../../core/services/loader.service';
import { LOADER_GIF } from '../../core/config/api.config';

// ─── Componente Loader ────────────────────────────────────────────────────────
// Overlay de pantalla completa que se muestra durante GETs lentos.
// Va UNA sola vez en app.html.
@Component({
  selector: 'app-loader',
  standalone: true,
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.css',
})
export class LoaderComponent {
  // Constante del GIF (se puede cambiar el archivo sin tocar código)
  readonly loaderGif = LOADER_GIF;

  constructor(public loaderService: LoaderService) {}

  // Fallback CSS si el GIF falla: el template usa (error) para mostrar el spinner
  gifFallo = false;

  onImgError(): void {
    this.gifFallo = true;
  }
}
