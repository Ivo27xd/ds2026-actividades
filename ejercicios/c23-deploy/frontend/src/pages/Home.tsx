import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Spinner from 'react-bootstrap/Spinner'
import Alert from 'react-bootstrap/Alert'
import { Link } from 'react-router-dom'

import Hero from '../components/Hero'
import LibroCard from '../components/LibroCard'
import { useFetch } from '../hooks/useFetch'
import type { Libro } from '../types/Libro'

import '../styles/home.css'

function Home() {
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

    return (
        <>
            <Hero libros={libros ?? []} />

            <Container className="home-collection">
                <div className="text-center mb-5">
                    <h2 className="home-title">
                        Nuestra colección
                    </h2>
                </div>

                <Row xs={1} sm={2} lg={3} className="g-4">
                    {libros?.map(libro => (
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

                <div className="text-center mt-5">
                    <Link to="/catalogo" className="btn-secundario">
                        Explorar catálogo completo
                    </Link>
                </div>
            </Container>
        </>
    )
}

export default Home
