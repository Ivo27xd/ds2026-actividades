import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import { Link, NavLink, useNavigate } from "react-router-dom";
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
    <Navbar bg="dark" data-bs-theme="dark" expand="lg" className="navbar-libreria">
      <Container>
        <Navbar.Brand as={Link} to="/">Mi Librería</Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center">
            <Nav.Link as={NavLink} to="/" end>
              Inicio
            </Nav.Link>

            <Nav.Link as={NavLink} to="/catalogo">
              Catálogo
            </Nav.Link>

            {tieneRol("ADMIN") && (
              <Nav.Link as={NavLink} to="/libros/nuevo">
                Nuevo libro
              </Nav.Link>
            )}

            <Nav.Link as={NavLink} to="/contacto">
              Contacto
            </Nav.Link>

            {usuario && (
              <Navbar.Text className="ms-lg-3 me-2 text-light">
                Hola, {usuario.nombre}
              </Navbar.Text>
            )}

            <Button
              variant={usuario ? "outline-danger" : "outline-info"}
              size="sm"
              onClick={manejarSesion}
              className="ms-2"
            >
              {usuario ? "Salir" : "Ingresar"}
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default CustomNavbar;