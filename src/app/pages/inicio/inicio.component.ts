import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CategoriasService } from '../../core/services/categorias.service';
import { Categoria } from '../../core/models/categoria.model';
import { ImgUrlPipe } from '../../pipes/img-url.pipe';

// ─── Página Inicio ────────────────────────────────────────────────────────────
@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [RouterLink, CommonModule, ImgUrlPipe],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css',
})
export class InicioComponent implements OnInit {
  categorias: Categoria[] = [];
  error: string | null = null;

  constructor(
    private categoriasService: CategoriasService
  ) {}

  ngOnInit(): void {
    // Cargar categorías
    this.categoriasService.obtenerTodas().subscribe({
      next: (cats) => (this.categorias = cats),
      error: (err) => (this.error = err.error?.mensaje || 'Error al cargar categorías'),
    });

  }

}
