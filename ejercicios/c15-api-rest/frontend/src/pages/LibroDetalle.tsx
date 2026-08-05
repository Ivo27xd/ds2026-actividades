import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'

import dragonBall from '../assets/dragon_ball.webp'

function LibroDetalle() {
  return (
    <section id="detalle-libro" className="py-5">
      <Container>
        <Row className="align-items-center g-5">

          <Col md={5} className="text-center">
            <img
              src={dragonBall}
              alt="Dragon Ball Piccolo 3"
              className="img-fluid portada-libro"
            />
          </Col>

          <Col md={7}>

            <h1 className="titulo-libro">
              Dragon Ball Piccolo 3
            </h1>

            <h4 className="autor-libro">
              Akira Toriyama
            </h4>

            <p className="descripcion-libro">
              La batalla contra Piccolo alcanza un nuevo nivel de intensidad
              mientras Goku enfrenta a uno de los enemigos más peligrosos
              que haya conocido. Entre combates explosivos, técnicas legendarias
              y el destino del mundo en juego, este volumen reúne algunos de los
              momentos más icónicos y decisivos de Dragon Ball.
            </p>

            <h3 className="precio-libro">
              $24.999
            </h3>

            <div className="d-flex gap-3 mt-4">

              <Button variant="danger">
                Comprar
              </Button>

              <Button
                variant="outline-light"
              >
                Volver al catálogo
              </Button>

            </div>

          </Col>

        </Row>
      </Container>
    </section>
  )
}

export default LibroDetalle