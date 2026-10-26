// ─── Modelos de Autenticación y Cliente ─────────────────────────────────────
export interface ClientePerfil {
  id: number;
  nombre: string;
  email: string;
  telefono: string;
  fechaRegistro: string;  // DateTime ISO
}

export interface LoginRespuesta {
  token: string;
  cliente: ClientePerfil;
}

export interface RegistroBody {
  nombre: string;
  telefono: string;
  email: string;
  password: string;
}

export interface RegistroRespuesta {
  id: number;
  nombre: string;
  telefono: string;
  email: string;
  fechaRegistro: string;
  tieneCuenta: boolean;
}

export interface CambiarPasswordBody {
  passwordActual: string;
  passwordNueva: string;
}
