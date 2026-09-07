import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Spinner from 'react-bootstrap/Spinner'
import Alert from 'react-bootstrap/Alert'

import Hero from '../components/hero'
import LibroCard from '../components/LibroCard'

import { useFetch } from '../hooks/useFetch'

import type { Libro } from '../types/Libro'

import '../styles/homee.css'

function Home() {

    const {
        data: libros,
        loading,
        error
    } = useFetch<Libro[]>('libros.json')

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
            <Hero />

            <Container className="py-5">

                <h2 className="text-center home-title">
                    Nuestra colección
                </h2>

                <Row className="g-4">

                    {libros?.map(libro => (

                        <Col
                            md={4}
                            key={libro.id}
                        >

                            <LibroCard
                                titulo={libro.titulo}
                                autor={libro.autor}
                                imagen={libro.imagen}
                                precio={libro.precio}
                                disponible={libro.disponible}
                            />

                        </Col>

                    ))}

                </Row>

            </Container>

        </>
    )
}

export default Home