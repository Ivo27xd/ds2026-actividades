import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import { libros } from '../types/libros'
import LibroCard from '../components/LibroCard'
import Hero from '../components/hero'

import '../styles/homee.css'

function Home() {
  return (
    <>
    <Hero />

    <Container className="py-5">
      <h2 className="text-center home-title">
        Nuestra colección
      </h2>

      <Row className="g-4">
        {libros.map(libro => (
          <Col key={libro.id} md={4}>
            <LibroCard
              titulo={libro.titulo}
              autor={libro.autor}
              imagen={libro.imagen}
            />
          </Col>
        ))}
      </Row>
    </Container>
    </>
  )
}

export default Home