import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import { Link } from "react-router-dom";

export default function SinPermiso() {
  return (
    <Container className="mt-5">
      <Alert variant="warning">
        <Alert.Heading>Acceso Restringido</Alert.Heading>
        <p>No tenés los permisos necesarios para acceder a esta sección.</p>
        <hr />
        <div className="d-flex justify-content-end">
          <Link to="/catalogo" className="btn btn-outline-warning">
            Volver al Catálogo
          </Link>
        </div>
      </Alert>
    </Container>
  );
}