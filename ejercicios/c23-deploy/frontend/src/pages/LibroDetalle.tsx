import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Badge from 'react-bootstrap/Badge'
import Spinner from 'react-bootstrap/Spinner'
import Alert from 'react-bootstrap/Alert'
import { LuArrowLeft, LuRefreshCw, LuShoppingBag, LuTrash2 } from 'react-icons/lu'

import { useFetch } from '../hooks/useFetch'
import { useAuth } from '../context/useAuth'
import { apiFetch } from '../services/api'
import { obtenerDescripcionLibro } from '../data/descripcionesLibros'
import type { Libro } from '../types/Libro'

import '../styles/detalle.css'

function LibroDetalle() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { tieneRol } = useAuth()
  const [comprado, setComprado] = useState(false)
  const [errorAccion, setErrorAccion] = useState<string | null>(null)
  const [eliminando, setEliminando] = useState(false)
  const [actualizandoStock, setActualizandoStock] = useState(false)
  const [libroActualizado, setLibroActualizado] = useState<Libro | null>(null)

  const {
    data: libroApi,
    loading,
    error,
  } = useFetch<Libro>(`/libros/${id}`)

  const libro = libroActualizado?.id === libroApi?.id ? libroActualizado : libroApi

  const handleToggleDisponible = async () => {
    if (!libro) return

    setErrorAccion(null)
    setActualizandoStock(true)
    try {
      const actualizado = await apiFetch<Libro>(`/libros/${libro.id}`, {
        method: 'PUT',
        body: JSON.stringify({ disponible: !libro.disponible }),
      })
      setLibroActualizado(actualizado)
      if (!actualizado.disponible) {
        setComprado(false)
      }
    } catch (err: unknown) {
      setErrorAccion(err instanceof Error ? err.message : 'No se pudo actualizar la disponibilidad')
    } finally {
      setActualizandoStock(false)
    }
  }

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
          <Link to="/catalogo" className="btn-secundario">
            <LuArrowLeft size={16} />
            <span>Volver al catálogo</span>
          </Link>
        </Container>
      </section>
    )
  }

  return (
    <section id="detalle-libro" className="py-5">
      <Container>
        <div className="mb-4">
          <Link to="/catalogo" className="btn-secundario py-2 px-3">
            <LuArrowLeft size={16} />
            <span>Volver al catálogo</span>
          </Link>
        </div>

        <div className="detalle-card">
          <Row className="align-items-center g-4 g-lg-5">
            <Col md={5} className="text-center">
              <img
                src={libro.imagen}
                alt={libro.titulo}
                className="img-fluid portada-libro"
              />
            </Col>

            <Col md={7}>
              <div className="d-flex flex-wrap gap-2 mb-3">
                <Badge bg={libro.disponible ? 'success' : 'secondary'} className="px-3 py-2 rounded-pill">
                  {libro.disponible ? 'Disponible' : 'Sin stock'}
                </Badge>
                {libro.categorias?.map((cat) => (
                  <Badge
                    key={cat.id}
                    bg="dark"
                    className="border border-secondary px-3 py-2 rounded-pill fw-normal"
                  >
                    {cat.nombre}
                  </Badge>
                ))}
              </div>

              <h1 className="titulo-libro">
                {libro.titulo}
              </h1>

              <h2 className="autor-libro h4">
                {libro.autor.nombre} · {libro.autor.nacionalidad}
              </h2>

              <p className="descripcion-libro">
                {obtenerDescripcionLibro(libro)}
              </p>

              <p className="precio-libro mb-4">
                ${libro.precio.toLocaleString('es-AR')}
              </p>

              {comprado && (
                <Alert variant="success" onClose={() => setComprado(false)} dismissible>
                  Agregaste "{libro.titulo}" a tu pedido.
                </Alert>
              )}

              {errorAccion && (
                <Alert variant="danger">{errorAccion}</Alert>
              )}

              <div className="d-flex flex-wrap gap-3 mt-4">
                {!tieneRol('ADMIN') && (
                  <Button
                    className="btn-principal"
                    disabled={!libro.disponible}
                    onClick={() => setComprado(true)}
                  >
                    <LuShoppingBag size={17} />
                    <span>{libro.disponible ? 'Comprar ahora' : 'Sin stock'}</span>
                  </Button>
                )}

                {tieneRol('ADMIN') && (
                  <>
                    <Button
                      variant="outline-light"
                      className="d-inline-flex align-items-center gap-2 rounded-3 px-3"
                      onClick={handleToggleDisponible}
                      disabled={actualizandoStock}
                    >
                      <LuRefreshCw size={16} />
                      <span>
                        {actualizandoStock
                          ? 'Actualizando...'
                          : libro.disponible
                            ? 'Marcar sin stock'
                            : 'Marcar disponible'}
                      </span>
                    </Button>

                    <Button
                      variant="outline-danger"
                      className="d-inline-flex align-items-center gap-2 rounded-3 px-3"
                      onClick={handleEliminar}
                      disabled={eliminando}
                    >
                      <LuTrash2 size={16} />
                      <span>{eliminando ? 'Eliminando...' : 'Eliminar libro'}</span>
                    </Button>
                  </>
                )}
              </div>
            </Col>
          </Row>
        </div>
      </Container>
    </section>
  )
}

export default LibroDetalle
