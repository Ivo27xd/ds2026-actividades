import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import LibroCard from '../components/LibroCard'

import '../styles/catalogo.css'

type CatalogoProps = {
    catalogo: any[]
}

function Catalogo({ catalogo }: CatalogoProps) {
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

                <div className="mt-5">

                    <Row className="g-4">

                        {catalogo.map(libro => (
                            <Col
                                key={libro.id}
                                md={4}
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

                </div>

            </Container>
        </section>
    )
}

export default Catalogo