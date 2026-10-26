import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CategoriasService } from '../../core/services/categorias.service';
import { Categoria } from '../../core/models/categoria.model';
import { ImgUrlPipe } from '../../pipes/img-url.pipe';

// La galería pública muestra categorías de CategoriaTrabajo, no registros de TrabajoGaleria.
@Component({
  selector: 'app-galeria',
  standalone: true,
  imports: [RouterLink, CommonModule, ImgUrlPipe],
  templateUrl: './galeria.component.html',
  styleUrl: './galeria.component.css',
})
export class GaleriaComponent implements OnInit {
  categorias: Categoria[] = [];
  error: string | null = null;
  cargando = true;

  constructor(private categoriasService: CategoriasService) {}

  ngOnInit(): void {
    this.categoriasService.obtenerTodas().subscribe({
      next: (categorias) => {
        this.categorias = categorias;
        this.cargando = false;
      },
      error: (err) => {
        this.error = err.error?.mensaje || 'Error al cargar las categorías';
        this.cargando = false;
      },
    });
  }
}
