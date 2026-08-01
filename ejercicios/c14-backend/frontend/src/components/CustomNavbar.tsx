import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import '../styles/navbar.css'

import { Link } from 'react-router-dom'

function Header() {
    return (
        <Navbar bg="dark" data-bs-theme="dark" expand="lg">
            <Container>
                <Navbar.Brand>
                    Mi Librería
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="basic-navbar-nav" />

                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">

                        <Nav.Link
                            as={Link}
                            to="/"
                        >
                            Inicio
                        </Nav.Link>

                        <Nav.Link
                            as={Link}
                            to="/catalogo"
                        >
                            Catálogo
                        </Nav.Link>

                        <Nav.Link
                            as={Link}
                            to="/contacto"
                        >
                            Contacto
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Header