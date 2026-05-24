import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'

function CustomNavbar() {
    return (
        <Navbar bg='dark' data-bs-theme="dark" expand="lg">
            <Container>
                <Navbar.Brand>Mi Librería</Navbar.Brand>
                
                <Navbar.Toggle aria-controls="basic-navbar-nav" />

                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <Nav.Link>Inicio</Nav.Link>
                        <Nav.Link>Catálogo</Nav.Link>
                        <Nav.Link>Contacto</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default CustomNavbar