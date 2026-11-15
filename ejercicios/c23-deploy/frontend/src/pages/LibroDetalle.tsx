import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Badge from 'react-bootstrap/Badge'
import Spinner from 'react-bootstrap/Spinner'
import Alert from 'react-bootstrap/Alert'

import { useFetch } from '../hooks/useFetch'
import { useAuth } from '../context/useAuth'
import { apiFetch } from '../services/api'
import type { Libro } from '../types/Libro'

import '../styles/detalle.css'

function LibroDetalle() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { tieneRol } = useAuth()
  const [comprado, setComprado] = useState(false)
  const [errorAccion, setErrorAccion] = useState<string | null>(null)
  const [eliminando, setEliminando] = useState(false)

  const {
    data: libro,
    loading,
    error,
  } = useFetch<Libro>(`/libros/${id}`)

  const handleEliminar = async () => {
    if (!libro || !window.confirm(`¿Eliminar "${libro.titulo}" del catálogo?`)) return

    setErrorAccion(null)
    setEliminando(true)
    try {
      await apiFetch(`/libros/${libro.id}`, { method: 'DELETE' })
      navigate('/catalogo')
    } catch (err: unknown) {
      setErrorAccion(err instanceof Error ? err.message : 'No se pudo eliminar el libro')
    } finally {
      setEliminando(false)
    }
  }

  if (loading) {
    return (
      <section id="detalle-libro" className="py-5">
        <Container className="py-5 text-center">
          <Spinner animation="border" />
        </Container>
      </section>
    )
  }

  if (error || !libro) {
    return (
      <section id="detalle-libro" className="py-5">
        <Container className="py-5">
          <Alert variant="danger">
            {error ?? 'Libro no encontrado'}
          </Alert>
          <Link to="/catalogo" className="btn btn-outline-light">
            Volver al catálogo
          </Link>
        </Container>
      </section>
    )
  }

  return (
    <section id="detalle-libro" className="py-5">
      <Container>
        <Row className="align-items-center g-5">
          <Col md={5} className="text-center">
            <img
              src={libro.imagen}
              alt={libro.titulo}
              className="img-fluid portada-libro rounded"
            />
          </Col>

          <Col md={7}>
            <div className="d-flex flex-wrap gap-2 mb-3">
              <Badge bg={libro.disponible ? 'success' : 'secondary'}>
                {libro.disponible ? 'Disponible' : 'Sin stock'}
              </Badge>
              {libro.categorias?.map((cat) => (
                <Badge key={cat.id} bg="dark" className="border border-secondary">
                  {cat.nombre}
                </Badge>
              ))}
            </div>

            <h1 className="titulo-libro">
              {libro.titulo}
            </h1>

            <h4 className="autor-libro">
              {libro.autor.nombre} ({libro.autor.nacionalidad})
            </h4>

            <h3 className="precio-libro mb-4">
              ${libro.precio.toLocaleString('es-AR')}
            </h3>

            {comprado && (
              <Alert variant="success" onClose={() => setComprado(false)} dismissible>
                Agregaste "{libro.titulo}" a tu pedido.
              </Alert>
            )}

            {errorAccion && (
              <Alert variant="danger">{errorAccion}</Alert>
            )}

            <div className="d-flex flex-wrap gap-3 mt-4">
              <Button
                variant="danger"
                disabled={!libro.disponible}
                onClick={() => setComprado(true)}
              >
                {libro.disponible ? 'Comprar' : 'Sin stock'}
              </Button>

              <Link to="/catalogo" className="btn btn-outline-light">
                Volver al catálogo
              </Link>

              {tieneRol('ADMIN') && (
                <Button
                  variant="outline-danger"
                  onClick={handleEliminar}
                  disabled={eliminando}
                >
                  {eliminando ? 'Eliminando...' : 'Eliminar libro'}
                </Button>
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default LibroDetalle
