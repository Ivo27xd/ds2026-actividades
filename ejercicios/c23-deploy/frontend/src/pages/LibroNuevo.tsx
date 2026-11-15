import { useState } from "react";
import type { FormEvent } from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";
import { Link, useNavigate } from "react-router-dom";
import { apiFetch } from "../services/api";
import { useFetch } from "../hooks/useFetch";
import type { Autor } from "../types/Autor";
import type { Categoria } from "../types/Categoria";

export default function LibroNuevo() {
  const navigate = useNavigate();
  const { data: autores, loading: cargandoAutores, error: errorAutores } = useFetch<Autor[]>("/autores");
  const { data: categorias } = useFetch<Categoria[]>("/categorias");

  const [error, setError] = useState<string | null>(null);
  const [enviando, setEnviando] = useState(false);
  const [titulo, setTitulo] = useState("");
  const [precio, setPrecio] = useState("");
  const [imagen, setImagen] = useState("");
  const [autorId, setAutorId] = useState<string>("");
  const [disponible, setDisponible] = useState(true);
  const [categoriaIds, setCategoriaIds] = useState<number[]>([]);

  const autorSeleccionado = autorId || (autores && autores.length > 0 ? String(autores[0].id) : "");

  const toggleCategoria = (id: number) => {
    setCategoriaIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!autorSeleccionado) {
      setError("Seleccioná un autor");
      return;
    }

    setEnviando(true);
    try {
      await apiFetch("/libros", {
        method: "POST",
        body: JSON.stringify({
          titulo,
          precio: Number(precio),
          imagen,
          disponible,
          autorId: Number(autorSeleccionado),
          ...(categoriaIds.length > 0 ? { categoriaIds } : {}),
        }),
      });
      navigate("/catalogo");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Error al crear el libro");
    } finally {
      setEnviando(false);
    }
  };

  if (cargandoAutores) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" />
      </Container>
    );
  }

  return (
    <Container className="mt-4 mb-5" style={{ maxWidth: "600px" }}>
      <h2 className="mb-4">Nuevo Libro</h2>
      {errorAutores && <Alert variant="danger">{errorAutores}</Alert>}
      {error && <Alert variant="danger">{error}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Título</Form.Label>
          <Form.Control
            type="text"
            required
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Autor</Form.Label>
          <Form.Select
            required
            value={autorSeleccionado}
            onChange={(e) => setAutorId(e.target.value)}
          >
            {autores?.map((autor) => (
              <option key={autor.id} value={autor.id}>
                {autor.nombre} ({autor.nacionalidad})
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Precio</Form.Label>
          <Form.Control
            type="number"
            min={1}
            step={1}
            required
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>URL Imagen</Form.Label>
          <Form.Control
            type="text"
            placeholder="/imagenes/ejemplo.webp"
            required
            value={imagen}
            onChange={(e) => setImagen(e.target.value)}
          />
        </Form.Group>

        {categorias && categorias.length > 0 && (
          <Form.Group className="mb-3">
            <Form.Label>Categorías</Form.Label>
            <div className="d-flex flex-wrap gap-3">
              {categorias.map((cat) => (
                <Form.Check
                  key={cat.id}
                  type="checkbox"
                  id={`cat-${cat.id}`}
                  label={cat.nombre}
                  checked={categoriaIds.includes(cat.id)}
                  onChange={() => toggleCategoria(cat.id)}
                />
              ))}
            </div>
          </Form.Group>
        )}

        <Form.Group className="mb-4">
          <Form.Check
            type="switch"
            id="libro-disponible"
            label="Disponible para la venta"
            checked={disponible}
            onChange={(e) => setDisponible(e.target.checked)}
          />
        </Form.Group>

        <div className="d-flex gap-3">
          <Button variant="primary" type="submit" disabled={enviando}>
            {enviando ? "Guardando..." : "Guardar Libro"}
          </Button>
          <Link to="/catalogo" className="btn btn-outline-light">
            Cancelar
          </Link>
        </div>
      </Form>
    </Container>
  );
}
