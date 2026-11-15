import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { LuBookOpen, LuLogIn, LuLogOut, LuPlus, LuUser } from "react-icons/lu";
import { useAuth } from "../context/useAuth";
import "../styles/navbar.css";

function CustomNavbar() {
  const { usuario, logout, tieneRol } = useAuth();
  const navigate = useNavigate();

  const manejarSesion = () => {
    if (usuario) {
      logout();
      navigate("/");
    } else {
      navigate("/login");
    }
  };

  return (
    <Navbar bg="dark" data-bs-theme="dark" expand="lg" sticky="top" className="navbar-libreria">
      <Container fluid className="px-3 px-md-4">
        <Navbar.Brand as={Link} to="/">
          <span className="navbar-brand-icon" aria-hidden="true">
            <LuBookOpen size={18} />
          </span>
          <span>Mi Librería</span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-lg-center gap-1 gap-lg-2 pt-3 pt-lg-0">
            <Nav.Link as={NavLink} to="/" end>
              Inicio
            </Nav.Link>

            <Nav.Link as={NavLink} to="/catalogo">
              Catálogo
            </Nav.Link>

            {tieneRol("ADMIN") && (
              <Nav.Link as={NavLink} to="/libros/nuevo" className="d-inline-flex align-items-center gap-1">
                <LuPlus size={15} />
                <span>Nuevo libro</span>
              </Nav.Link>
            )}

            {!tieneRol("ADMIN") && (
              <Nav.Link as={NavLink} to="/contacto">
                Contacto
              </Nav.Link>
            )}

            <div className="d-flex align-items-center gap-2 ms-lg-3 mt-2 mt-lg-0">
              {usuario && (
                <span className="navbar-user-chip">
                  <LuUser size={14} />
                  <span>Hola, {usuario.nombre}</span>
                </span>
              )}

              <Button
                variant={usuario ? "outline-danger" : "outline-light"}
                size="sm"
                onClick={manejarSesion}
                className="navbar-auth-btn d-inline-flex align-items-center gap-2"
              >
                {usuario ? <LuLogOut size={14} /> : <LuLogIn size={14} />}
                <span>{usuario ? "Salir" : "Ingresar"}</span>
              </Button>
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default CustomNavbar;
