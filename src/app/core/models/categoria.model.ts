// Modelo correspondiente a la entidad CategoriaTrabajo del backend.
export interface Categoria {
  id: number;
  nombre: string;
  slug: string;
  descripcion: string | null;
  imagenPortadaUrl: string | null;
  orden: number;
  activo?: boolean;
}
