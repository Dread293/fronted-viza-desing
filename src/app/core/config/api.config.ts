// ─── Configuración central de la API ───────────────────────────────────────
// Cambia aquí si el backend cambia de puerto o host.
export const BASE_URL = 'http://localhost:5205';

// ─── Constantes de animaciones ──────────────────────────────────────────────
// Reemplaza los archivos en public/assets/ con los GIFs reales y listo.
export const LOADER_GIF = 'assets/loader.gif';         // Animación 1: carga de páginas
export const COTIZACION_GIF = 'assets/cotizacion.gif'; // Animación 2: botón cotización

// ─── Endpoints (referencia, no se usan directamente aquí) ───────────────────
export const API = {
  // Públicos
  categorias: `${BASE_URL}/api/categorias`,
  trabajos: `${BASE_URL}/api/trabajos`,
  categoriaTrabados: (slug: string) => `${BASE_URL}/api/categorias/${slug}/trabajos`,
  trabajoDetalle: (id: number) => `${BASE_URL}/api/trabajos/${id}`,

  // Auth
  login: `${BASE_URL}/api/auth/login`,
  registro: `${BASE_URL}/api/clientes`,
  yo: `${BASE_URL}/api/auth/yo`,
  cambiarPassword: `${BASE_URL}/api/auth/cambiar-password`,

  // Pedidos (privados)
  misPedidos: `${BASE_URL}/api/mis-pedidos`,
  miPedido: (id: number) => `${BASE_URL}/api/mis-pedidos/${id}`,
  estadoPedido: (id: number) => `${BASE_URL}/api/mis-pedidos/${id}/estado`,
  disenos: (pedidoId: number) => `${BASE_URL}/api/mis-pedidos/${pedidoId}/disenos`,
  aprobarDiseno: (pedidoId: number, disenoId: number) =>
    `${BASE_URL}/api/mis-pedidos/${pedidoId}/disenos/${disenoId}/aprobar`,
  rechazarDiseno: (pedidoId: number, disenoId: number) =>
    `${BASE_URL}/api/mis-pedidos/${pedidoId}/disenos/${disenoId}/rechazar`,

  // Crear pedido/cotización
  pedidos: `${BASE_URL}/api/pedidos`,
};
