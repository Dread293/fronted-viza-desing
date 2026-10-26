import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/inicio/inicio.component').then(m => m.InicioComponent),
    title: 'VIZA Design - Taller de Letreros e Inox'
  },
  {
    path: 'galeria',
    loadComponent: () => import('./pages/galeria/galeria.component').then(m => m.GaleriaComponent),
    title: 'Galería de Trabajos - VIZA Design'
  },
  {
    path: 'categoria/:slug',
    loadComponent: () => import('./pages/categoria/categoria.component').then(m => m.CategoriaComponent),
    title: 'Categoría - VIZA Design'
  },
  {
    path: 'trabajos/:id',
    loadComponent: () => import('./pages/trabajo-detalle/trabajo-detalle.component').then(m => m.TrabajoDetalleComponent),
    title: 'Detalle del Trabajo - VIZA Design'
  },
  {
    path: 'cotizacion',
    loadComponent: () => import('./pages/cotizacion/cotizacion.component').then(m => m.CotizacionComponent),
    title: 'Solicitar Cotización - VIZA Design'
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent),
    title: 'Iniciar Sesión - VIZA Design'
  },
  {
    path: 'registro',
    loadComponent: () => import('./pages/registro/registro.component').then(m => m.RegistroComponent),
    title: 'Crear Cuenta - VIZA Design'
  },
  {
    path: 'mis-pedidos',
    loadComponent: () => import('./pages/mis-pedidos/mis-pedidos.component').then(m => m.MisPedidosComponent),
    canActivate: [authGuard],
    title: 'Mis Pedidos - VIZA Design'
  },
  {
    path: 'mis-pedidos/:id',
    loadComponent: () => import('./pages/pedido-detalle/pedido-detalle.component').then(m => m.PedidoDetalleComponent),
    canActivate: [authGuard],
    title: 'Seguimiento de Pedido - VIZA Design'
  },
  {
    path: 'perfil',
    loadComponent: () => import('./pages/perfil/perfil.component').then(m => m.PerfilComponent),
    canActivate: [authGuard],
    title: 'Mi Perfil - VIZA Design'
  },
  {
    path: '**',
    redirectTo: ''
  }
];
