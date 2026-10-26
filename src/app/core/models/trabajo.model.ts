// ─── Modelos de Trabajo y Media ─────────────────────────────────────────────
export interface MediaItem {
  id: number;
  tipo: 'imagen' | 'video';
  url: string;
  miniaturaUrl: string | null;
  esPortada: boolean;
  orden: number;
}

export interface Trabajo {
  id: number;
  categoriaId: number;
  categoriaNombre: string;
  titulo: string;
  descripcion: string;
  ciudad: string;
  fechaTrabajo: string | null;    // "2026-05-10" o null (DateOnly)
  destacado: boolean;
  publicado: boolean;
  orden: number;
  fechaCreacion: string;          // DateTime ISO
  media: MediaItem[];
}
