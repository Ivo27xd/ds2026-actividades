import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Header from "./CustomNavbar";
import { useAuth } from "../context/AuthContext";
import type { Usuario, Rol } from "../types/sesionType";

vi.mock("../context/AuthContext", () => ({
  useAuth: vi.fn(),
}));

function mockAuth(usuario: Usuario | null) {
  vi.mocked(useAuth).mockReturnValue({
    usuario,
    cargando: false,
    estaAutenticado: usuario !== null,
    tieneRol: (rol: Rol) => usuario?.rol === rol,
    login: vi.fn(),
    logout: vi.fn(),
  });
}

describe("CustomNavbar (Testing Library)", () => {
  it("muestra la opción Ingresar y oculta 'Nuevo libro' para usuario no autenticado", () => {
    mockAuth(null);

    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    expect(screen.getByText("Ingresar")).toBeInTheDocument();
    expect(screen.queryByText("Nuevo libro")).not.toBeInTheDocument();
  });

  it("muestra 'Hola, Cliente' y oculta 'Nuevo libro' para un CLIENTE", () => {
    mockAuth({ id: 2, email: "cliente@libreria.test", nombre: "Cliente", rol: "CLIENTE" });

    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    expect(screen.getByText("Hola, Cliente")).toBeInTheDocument();
    expect(screen.getByText("Salir")).toBeInTheDocument();
    expect(screen.queryByText("Nuevo libro")).not.toBeInTheDocument();
  });

  it("muestra el enlace 'Nuevo libro' cuando el usuario es ADMIN", () => {
    mockAuth({ id: 1, email: "admin@libreria.test", nombre: "Admin", rol: "ADMIN" });

    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    expect(screen.getByRole("link", { name: "Nuevo libro" })).toBeInTheDocument();
  });
});