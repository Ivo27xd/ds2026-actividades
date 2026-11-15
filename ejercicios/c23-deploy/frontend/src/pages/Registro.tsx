import { useState } from "react";
import type { FormEvent } from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import { Link, useNavigate } from "react-router-dom";
import { apiFetch } from "../services/api";

export default function Registro() {
  const navigate = useNavigate();
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [enviando, setEnviando] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setEnviando(true);
    try {
      await apiFetch("/auth/registro", {
        method: "POST",
        body: JSON.stringify({ nombre, email, password }),
      });
      navigate("/login");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "No se pudo completar el registro");
    } finally {
      setEnviando(false);
    }
  };

  return (
    <Container className="py-5" style={{ maxWidth: "460px" }}>
      <div className="form-card">
        <h1 className="h2 mb-2 text-center">Crear Cuenta</h1>
        <p className="text-secondary text-center small mb-4">
          Registrate para acceder a tu cuenta
        </p>

        {error && <Alert variant="danger">{error}</Alert>}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              required
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-4">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              type="password"
              required
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Form.Text className="text-secondary">
              Mínimo 8 caracteres, una mayúscula y un número.
            </Form.Text>
          </Form.Group>
          <Button type="submit" className="btn-principal w-100" disabled={enviando}>
            {enviando ? "Registrando..." : "Registrarse"}
          </Button>
        </Form>

        <p className="text-center text-secondary small mt-4 mb-0">
          ¿Ya tenés cuenta? <Link to="/login">Iniciá sesión</Link>
        </p>
      </div>
    </Container>
  );
}
