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

    const {
        data: libros,
        loading,
        error
    } = useFetch<Libro[]>('/libros.json')

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

                <div className="buscador-container">

                    <Form.Control
                        type="text"
                        placeholder="Buscar libros..."
                        className="input-catalogo"
                    />

                    <Button variant="danger">
                        Buscar
                    </Button>

                </div>

                <Row className="g-4 mt-4">

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

        </section>
    )
}

export default Catalogo