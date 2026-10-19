import { Navigate, Outlet } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import Container from "react-bootstrap/Container";
import { useAuth } from "../context/AuthContext";
import type { Rol } from "../types/sesionType";

export function PrivateRoute({ rol }: { rol?: Rol }) {
  const { usuario, cargando } = useAuth();

  if (cargando) {
    return (
      <Container className="d-flex justify-content-center my-5">
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }

  if (!usuario) {
    return <Navigate to="/login" replace />;
  }

  if (rol && usuario.rol !== rol) {
    return <Navigate to="/sin-permiso" replace />;
  }

  return <Outlet />;
}