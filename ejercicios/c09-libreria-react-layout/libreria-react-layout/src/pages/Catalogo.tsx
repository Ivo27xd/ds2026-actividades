import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import '../styles/catalogo.css'

function Catalogo() {
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

                    <Button
                        variant="danger"
                    >
                        Buscar
                    </Button>

                </div>

                <div className="mt-5">
                    {/* resultados */}
                </div>

            </Container>
        </section>
    )
}

export default Catalogo