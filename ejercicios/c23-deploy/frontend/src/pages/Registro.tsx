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
    <Container className="mt-5" style={{ maxWidth: "420px" }}>
      <h2 className="mb-4">Crear Cuenta</h2>
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
        <Form.Group className="mb-3">
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
        <Button variant="primary" type="submit" className="w-100" disabled={enviando}>
          {enviando ? "Registrando..." : "Registrarse"}
        </Button>
      </Form>
      <p className="text-center mt-3 mb-0">
        ¿Ya tenés cuenta? <Link to="/login">Iniciá sesión</Link>
      </p>
    </Container>
  );
}
