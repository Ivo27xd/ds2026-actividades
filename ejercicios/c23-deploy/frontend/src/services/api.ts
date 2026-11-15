import { obtenerToken } from "./sesion";

const BASE = import.meta.env.VITE_API_URL ?? "http://localhost:3000/api";

interface DetalleError {
  campo: string;
  mensaje: string;
}

export class ApiError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    this.name = "ApiError";
  }
}

export async function apiFetch<T>(
  ruta: string,
  opciones: RequestInit = {}
): Promise<T> {
  const token = obtenerToken();

  const res = await fetch(`${BASE}${ruta}`, {
    ...opciones,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...opciones.headers,
    },
  });

  const cuerpo = await res.json().catch(() => null);

  if (res.status === 401 && token) {
    window.dispatchEvent(new Event("sesion-expirada"));
  }

  if (!res.ok) {
    const detalles: DetalleError[] | undefined = cuerpo?.detalles;
    const mensajeDetalles = Array.isArray(detalles) && detalles.length > 0
      ? detalles.map((d) => d.mensaje).join(". ")
      : null;
    throw new ApiError(res.status, mensajeDetalles || cuerpo?.error || `Error ${res.status}`);
  }

  return cuerpo as T;
}