import { useState } from "react";
import type { FormEvent } from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";
import { Link, useNavigate } from "react-router-dom";
import { LuPlus, LuX } from "react-icons/lu";
import { apiFetch } from "../services/api";
import { useFetch } from "../hooks/useFetch";
import type { Autor } from "../types/Autor";
import type { Categoria } from "../types/Categoria";

export default function LibroNuevo() {
  const navigate = useNavigate();
  const { data: autoresApi, loading: cargandoAutores, error: errorAutores } = useFetch<Autor[]>("/autores");
  const { data: categoriasApi } = useFetch<Categoria[]>("/categorias");

  const [autoresExtra, setAutoresExtra] = useState<Autor[]>([]);
  const [mostrarNuevoAutor, setMostrarNuevoAutor] = useState(false);
  const [nuevoAutorNombre, setNuevoAutorNombre] = useState("");
  const [nuevoAutorNacionalidad, setNuevoAutorNacionalidad] = useState("");
  const [creandoAutor, setCreandoAutor] = useState(false);
  const [errorAutor, setErrorAutor] = useState<string | null>(null);

  const [categoriasExtra, setCategoriasExtra] = useState<Categoria[]>([]);
  const [mostrarNuevaCategoria, setMostrarNuevaCategoria] = useState(false);
  const [nuevaCategoriaNombre, setNuevaCategoriaNombre] = useState("");
  const [creandoCategoria, setCreandoCategoria] = useState(false);
  const [errorCategoria, setErrorCategoria] = useState<string | null>(null);

  const [error, setError] = useState<string | null>(null);
  const [enviando, setEnviando] = useState(false);
  const [titulo, setTitulo] = useState("");
  const [precio, setPrecio] = useState("");
  const [imagen, setImagen] = useState("");
  const [autorId, setAutorId] = useState<string>("");
  const [disponible, setDisponible] = useState(true);
  const [categoriaIds, setCategoriaIds] = useState<number[]>([]);

  const autores = [...(autoresApi ?? []), ...autoresExtra];
  const categorias = [...(categoriasApi ?? []), ...categoriasExtra];
  const autorSeleccionado = autorId || (autores.length > 0 ? String(autores[0].id) : "");

  const toggleCategoria = (id: number) => {
    setCategoriaIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleCrearAutor = async () => {
    const nombre = nuevoAutorNombre.trim();
    const nacionalidad = nuevoAutorNacionalidad.trim();

    if (!nombre || !nacionalidad) {
      setErrorAutor("Completá nombre y nacionalidad del autor.");
      return;
    }

    setErrorAutor(null);
    setCreandoAutor(true);
    try {
      const creado = await apiFetch<Autor>("/autores", {
        method: "POST",
        body: JSON.stringify({ nombre, nacionalidad }),
      });
      setAutoresExtra((prev) => (prev.some((a) => a.id === creado.id) ? prev : [...prev, creado]));
      setAutorId(String(creado.id));
      setNuevoAutorNombre("");
      setNuevoAutorNacionalidad("");
      setMostrarNuevoAutor(false);
    } catch (err: unknown) {
      setErrorAutor(err instanceof Error ? err.message : "No se pudo crear el autor");
    } finally {
      setCreandoAutor(false);
    }
  };

  const handleCrearCategoria = async () => {
    const nombre = nuevaCategoriaNombre.trim();

    if (!nombre) {
      setErrorCategoria("Completá el nombre de la categoría.");
      return;
    }

    setErrorCategoria(null);
    setCreandoCategoria(true);
    try {
      const creada = await apiFetch<Categoria>("/categorias", {
        method: "POST",
        body: JSON.stringify({ nombre }),
      });
      setCategoriasExtra((prev) => (prev.some((c) => c.id === creada.id) ? prev : [...prev, creada]));
      setCategoriaIds((prev) => (prev.includes(creada.id) ? prev : [...prev, creada.id]));
      setNuevaCategoriaNombre("");
      setMostrarNuevaCategoria(false);
    } catch (err: unknown) {
      setErrorCategoria(err instanceof Error ? err.message : "No se pudo crear la categoría");
    } finally {
      setCreandoCategoria(false);
    }
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
      const imagenLimpia = imagen.trim();
      await apiFetch("/libros", {
        method: "POST",
        body: JSON.stringify({
          titulo,
          precio: Number(precio),
          ...(imagenLimpia ? { imagen: imagenLimpia } : {}),
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
    <Container className="py-5" style={{ maxWidth: "620px" }}>
      <div className="form-card">
        <h1 className="h2 mb-2">Nuevo Libro</h1>
        <p className="text-secondary small mb-4">
          Completá los datos para agregar un título al catálogo.
        </p>

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
            <div className="d-flex justify-content-between align-items-center mb-1">
              <Form.Label className="mb-0">Autor</Form.Label>
              <Button
                type="button"
                variant="outline-secondary"
                size="sm"
                className="d-inline-flex align-items-center gap-1"
                onClick={() => {
                  setMostrarNuevoAutor((prev) => !prev);
                  setErrorAutor(null);
                }}
              >
                {mostrarNuevoAutor ? <LuX size={14} /> : <LuPlus size={14} />}
                <span>{mostrarNuevoAutor ? "Cancelar" : "Nuevo autor"}</span>
              </Button>
            </div>

            <Form.Select
              required
              value={autorSeleccionado}
              onChange={(e) => setAutorId(e.target.value)}
            >
              {autores.map((autor) => (
                <option key={autor.id} value={autor.id}>
                  {autor.nombre}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          {mostrarNuevoAutor && (
            <div
              className="p-3 rounded-3 mb-3"
              style={{
                backgroundColor: "var(--bg-surface)",
                border: "1px solid var(--border-strong)",
              }}
            >
              <p className="small fw-semibold mb-2">Agregar nuevo autor</p>
              {errorAutor && <Alert variant="danger" className="py-2 small">{errorAutor}</Alert>}

              <div className="row g-2 mb-3">
                <div className="col-sm-6">
                  <Form.Label className="small">Nombre</Form.Label>
                  <Form.Control
                    type="text"
                    value={nuevoAutorNombre}
                    onChange={(e) => setNuevoAutorNombre(e.target.value)}
                  />
                </div>
                <div className="col-sm-6">
                  <Form.Label className="small">Nacionalidad</Form.Label>
                  <Form.Control
                    type="text"
                    value={nuevoAutorNacionalidad}
                    onChange={(e) => setNuevoAutorNacionalidad(e.target.value)}
                  />
                </div>
              </div>

              <Button
                type="button"
                className="btn-principal py-2 px-3"
                disabled={creandoAutor}
                onClick={handleCrearAutor}
              >
                {creandoAutor ? "Creando..." : "Crear y seleccionar"}
              </Button>
            </div>
          )}

          <Form.Group className="mb-3">
            <Form.Label>Precio (ARS)</Form.Label>
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
            <Form.Label>URL Imagen (opcional)</Form.Label>
            <Form.Control
              type="text"
              value={imagen}
              onChange={(e) => setImagen(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <Form.Label className="mb-0">Categorías</Form.Label>
              <Button
                type="button"
                variant="outline-secondary"
                size="sm"
                className="d-inline-flex align-items-center gap-1"
                onClick={() => {
                  setMostrarNuevaCategoria((prev) => !prev);
                  setErrorCategoria(null);
                }}
              >
                {mostrarNuevaCategoria ? <LuX size={14} /> : <LuPlus size={14} />}
                <span>{mostrarNuevaCategoria ? "Cancelar" : "Nueva categoría"}</span>
              </Button>
            </div>

            {categorias.length > 0 && (
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
            )}
          </Form.Group>

          {mostrarNuevaCategoria && (
            <div
              className="p-3 rounded-3 mb-3"
              style={{
                backgroundColor: "var(--bg-surface)",
                border: "1px solid var(--border-strong)",
              }}
            >
              <p className="small fw-semibold mb-2">Agregar nueva categoría</p>
              {errorCategoria && <Alert variant="danger" className="py-2 small">{errorCategoria}</Alert>}

              <div className="mb-3">
                <Form.Label className="small">Nombre</Form.Label>
                <Form.Control
                  type="text"
                  value={nuevaCategoriaNombre}
                  onChange={(e) => setNuevaCategoriaNombre(e.target.value)}
                />
              </div>

              <Button
                type="button"
                className="btn-principal py-2 px-3"
                disabled={creandoCategoria}
                onClick={handleCrearCategoria}
              >
                {creandoCategoria ? "Creando..." : "Crear y seleccionar"}
              </Button>
            </div>
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

          <div className="d-flex flex-wrap gap-3">
            <Button type="submit" className="btn-principal" disabled={enviando}>
              {enviando ? "Guardando..." : "Guardar Libro"}
            </Button>
            <Link to="/catalogo" className="btn-secundario">
              Cancelar
            </Link>
          </div>
        </Form>
      </div>
    </Container>
  );
}
