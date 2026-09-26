import { useState } from "react";
import type { FormEvent } from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import { useNavigate } from "react-router-dom";
import { apiFetch } from "../services/api";

export default function LibroNuevo() {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    titulo: "",
    precio: 0,
    imagen: "",
    autorId: 1,
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await apiFetch("/libros", {
        method: "POST",
        body: JSON.stringify(formData),
      });
      navigate("/catalogo");
    } catch (err: any) {
      setError(err.message || "Error al crear el libro");
    }
  };

  return (
    <Container className="mt-4" style={{ maxWidth: "600px" }}>
      <h2>Nuevo Libro</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Título</Form.Label>
          <Form.Control
            type="text"
            required
            value={formData.titulo}
            onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Precio</Form.Label>
          <Form.Control
            type="number"
            required
            value={formData.precio}
            onChange={(e) => setFormData({ ...formData, precio: Number(e.target.value) })}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>URL Imagen</Form.Label>
          <Form.Control
            type="text"
            required
            value={formData.imagen}
            onChange={(e) => setFormData({ ...formData, imagen: e.target.value })}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Guardar Libro
        </Button>
      </Form>
    </Container>
  );
}