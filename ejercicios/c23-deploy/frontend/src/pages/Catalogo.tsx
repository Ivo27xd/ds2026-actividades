import { useState } from 'react'
import type { FormEvent } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'
import Alert from 'react-bootstrap/Alert'
import { LuSearch, LuX } from 'react-icons/lu'

import LibroCard from '../components/LibroCard'
import { useFetch } from '../hooks/useFetch'
import type { Libro } from '../types/Libro'

import '../styles/catalogo.css'

function Catalogo() {
    const [busqueda, setBusqueda] = useState('')

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
                <div className="text-center mb-4">
                    <h1 className="titulo-catalogo">
                        Explorá el catálogo
                    </h1>

                    <p className="subtitulo-catalogo">
                        Descubrí historias, autores y mundos nuevos.
                    </p>
                </div>

                <Form onSubmit={handleSubmit} className="buscador-container mb-5">
                    <div className="buscador-input-wrap">
                        <LuSearch size={17} className="buscador-icono" />
                        <Form.Control
                            type="text"
                            placeholder="Buscar por título o autor..."
                            className="input-catalogo"
                            value={busqueda}
                            onChange={(e) => setBusqueda(e.target.value)}
                        />
                    </div>

                    <Button type="submit" className="btn-principal py-2 px-4">
                        Buscar
                    </Button>

                    {busqueda && (
                        <Button
                            type="button"
                            variant="outline-secondary"
                            className="d-inline-flex align-items-center gap-1"
                            onClick={() => setBusqueda('')}
                        >
                            <LuX size={14} />
                            <span>Limpiar</span>
                        </Button>
                    )}
                </Form>

                {librosFiltrados.length === 0 ? (
                    <Alert variant="secondary" className="mt-4 text-center">
                        No se encontraron libros que coincidan con tu búsqueda.
                    </Alert>
                ) : (
                    <Row xs={1} sm={2} lg={3} className="g-4">
                        {librosFiltrados.map(libro => (
                            <Col key={libro.id}>
                                <LibroCard
                                    id={libro.id}
                                    titulo={libro.titulo}
                                    autor={libro.autor}
                                    imagen={libro.imagen}
                                    precio={libro.precio}
                                    disponible={libro.disponible}
                                    categorias={libro.categorias}
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
