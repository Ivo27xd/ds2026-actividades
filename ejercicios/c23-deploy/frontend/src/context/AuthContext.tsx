import { useState, useEffect, useCallback } from "react";
import type { ReactNode } from "react";
import type { Usuario, Credenciales, Rol, Sesion } from "../types/sesionType";
import { apiFetch } from "../services/api";
import { obtenerToken, guardarToken, borrarToken } from "../services/sesion";
import { AuthContext } from "./useAuth";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [cargando, setCargando] = useState<boolean>(obtenerToken() !== null);

  const logout = useCallback(() => {
    borrarToken();
    setUsuario(null);
  }, []);

  useEffect(() => {
    if (!obtenerToken()) {
      return;
    }

    apiFetch<Usuario>("/auth/yo")
      .then(setUsuario)
      .catch(() => borrarToken())
      .finally(() => setCargando(false));
  }, []);

  useEffect(() => {
    const handleSesionExpirada = () => logout();
    window.addEventListener("sesion-expirada", handleSesionExpirada);
    return () => window.removeEventListener("sesion-expirada", handleSesionExpirada);
  }, [logout]);

  const login = async (credenciales: Credenciales) => {
    const res = await apiFetch<Sesion>("/auth/login", {
      method: "POST",
      body: JSON.stringify(credenciales),
    });
    guardarToken(res.token);
    setUsuario(res.usuario);
  };

  const tieneRol = (rol: Rol) => usuario?.rol === rol;

  return (
    <AuthContext.Provider
      value={{
        usuario,
        cargando,
        estaAutenticado: usuario !== null,
        tieneRol,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
