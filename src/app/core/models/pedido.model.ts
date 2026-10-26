// ─── Modelos de Pedidos ─────────────────────────────────────────────────────
export type EstadoPedido = 'pendiente' | 'en_proceso' | 'terminado' | 'entregado';
export type EstadoDiseno = 'pendiente' | 'aprobada' | 'rechazada';

export interface MiPedidoResumen {
  id: number;
  descripcion: string;
  categoria: string;
  estado: EstadoPedido;
  fechaEntregaEstimada: string | null;  // DateOnly "2026-11-01" o null
  fechaRegistro: string;                // DateTime ISO
}

export interface MiPedidoDetalle {
  id: number;
  descripcion: string;
  categoria: string;
  estado: EstadoPedido;
  fechaRegistro: string;
  fechaEntregaEstimada: string | null;
  fechaEntregaReal: string | null;
}

export interface LineaTiempo {
  estado: EstadoPedido;
  etiqueta: string;
  nota: string;
  fecha: string;  // DateTime ISO
}

export interface EstadoPedidoInfo {
  pedidoId: number;
  estado: EstadoPedido;
  etiqueta: string;
  progreso: number;                 // 10 | 50 | 90 | 100
  fechaEntregaEstimada: string | null;
  fechaEntregaReal: string | null;
  lineaTiempo: LineaTiempo[];
}

export interface Diseno {
  id: number;
  etiqueta: string;
  imagenUrl: string;
  estado: EstadoDiseno;
  comentarioCliente: string | null;
  fechaSubida: string;
  fechaRespuesta: string | null;
}

// Body para crear pedido/cotización
export interface PedidoCrear {
  clienteId: number;
  categoriaId: number | null;
  descripcion: string;
  fechaEntregaEstimada: string | null;  // "yyyy-MM-dd" o null
}

// Respuesta al crear pedido
export interface PedidoCreado {
  id: number;
  clienteId: number;
  categoriaId: number | null;
  descripcion: string;
  estado: EstadoPedido;
  fechaRegistro: string;
  fechaEntregaEstimada: string | null;
}
