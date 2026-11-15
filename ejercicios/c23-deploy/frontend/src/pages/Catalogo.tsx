import { useState } from 'react'
import type { FormEvent } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'
import Alert from 'react-bootstrap/Alert'

import LibroCard from '../components/LibroCard'
import { useFetch } from '../hooks/useFetch'
import type { Libro } from '../types/Libro'

import '../styles/catalogo.css'

function Catalogo() {
    const [busqueda, setBusqueda] = useState('')
    const [soloDisponibles, setSoloDisponibles] = useState(false)

    const {
        data: libros,
        loading,
        error
    } = useFetch<Libro[]>('/libros')

    if (loading) {
        return (
            <Container className="py-5 text-center">
                <Spinner animation="border" />
            </Container>
        )
    }

    if (error) {
        return (
            <Container className="py-5">
                <Alert variant="danger">
                    {error}
                </Alert>
            </Container>
        )
    }

    const termino = busqueda.trim().toLowerCase()
    const librosFiltrados = (libros ?? []).filter((libro) => {
        if (soloDisponibles && !libro.disponible) return false
        if (!termino) return true

        const coincideTitulo = libro.titulo.toLowerCase().includes(termino)
        const coincideAutor = libro.autor.nombre.toLowerCase().includes(termino)
        return coincideTitulo || coincideAutor
    })

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
    }

    return (
        <section className="catalogo py-5">
            <Container>
                <div className="text-center mb-5">
                    <h1 className="titulo-catalogo">
                        Explorá el catálogo
                    </h1>

                    <p className="subtitulo-catalogo">
                        Descubrí historias, autores y mundos nuevos.
                    </p>
                </div>

                <Form onSubmit={handleSubmit} className="buscador-container align-items-center">
                    <Form.Control
                        type="text"
                        placeholder="Buscar por título o autor..."
                        className="input-catalogo"
                        value={busqueda}
                        onChange={(e) => setBusqueda(e.target.value)}
                    />

                    <Button type="submit" variant="danger">
                        Buscar
                    </Button>

                    {busqueda && (
                        <Button
                            type="button"
                            variant="outline-light"
                            onClick={() => setBusqueda('')}
                        >
                            Limpiar
                        </Button>
                    )}

                    <Form.Check
                        type="switch"
                        id="filtro-disponibles"
                        label="Solo disponibles"
                        checked={soloDisponibles}
                        onChange={(e) => setSoloDisponibles(e.target.checked)}
                    />
                </Form>

                {librosFiltrados.length === 0 ? (
                    <Alert variant="secondary" className="mt-5 text-center">
                        No se encontraron libros que coincidan con tu búsqueda.
                    </Alert>
                ) : (
                    <Row className="g-4 mt-4">
                        {librosFiltrados.map(libro => (
                            <Col md={4} key={libro.id}>
                                <LibroCard
                                    id={libro.id}
                                    titulo={libro.titulo}
                                    autor={libro.autor}
                                    imagen={libro.imagen}
                                    precio={libro.precio}
                                    disponible={libro.disponible}
                                />
                            </Col>
                        ))}
                    </Row>
                )}
            </Container>
        </section>
    )
}

export default Catalogo
