import { Component, OnInit } from '@angular/core';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CategoriasService } from '../../core/services/categorias.service';
import { Categoria } from '../../core/models/categoria.model';
import { ImgUrlPipe } from '../../pipes/img-url.pipe';

// La página de detalle también obtiene la información desde CategoriaTrabajo.
@Component({
  selector: 'app-categoria',
  standalone: true,
  imports: [RouterLink, CommonModule, ImgUrlPipe],
  templateUrl: './categoria.component.html',
  styleUrl: './categoria.component.css',
})
export class CategoriaComponent implements OnInit {
  categoria: Categoria | null = null;
  error: string | null = null;
  cargando = true;

  constructor(
    private route: ActivatedRoute,
    private categoriasService: CategoriasService,
  ) {}

  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('slug') ?? '';
    this.categoriasService.obtenerTodas().subscribe({
      next: (categorias) => {
        this.categoria = categorias.find((cat) => cat.slug === slug) ?? null;
        if (!this.categoria) this.error = 'No se encontró la categoría solicitada';
        this.cargando = false;
      },
      error: (err) => {
        this.error = err.error?.mensaje || 'No se pudo cargar la categoría';
        this.cargando = false;
      },
    });
  }
}
