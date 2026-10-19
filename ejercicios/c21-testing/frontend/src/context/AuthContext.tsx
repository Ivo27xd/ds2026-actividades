import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import type { Usuario, Credenciales, Rol, Sesion } from "../types/sesionType";
import { apiFetch } from "../services/api";
import { obtenerToken, guardarToken, borrarToken } from "../services/sesion";

interface AuthContextType {
  usuario: Usuario | null;
  cargando: boolean;
  estaAutenticado: boolean;
  tieneRol: (rol: Rol) => boolean;
  login: (credenciales: Credenciales) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [cargando, setCargando] = useState<boolean>(obtenerToken() !== null);

  const logout = () => {
    borrarToken();
    setUsuario(null);
  };

  useEffect(() => {
    if (!obtenerToken()) {
      setCargando(false);
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
  }, []);

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

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  }
  return context;
}