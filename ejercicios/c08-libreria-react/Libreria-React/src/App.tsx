import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import { libros } from './data/libros'

import LibroCard from './componentes/LibroCard'
import CustomNavbar from './componentes/CustomNavbar'
import Footer from './componentes/Footer'

function App() {
  return (
    <>
      <CustomNavbar />

      <Container className="py-5">
        <h1 className="text-center mb-5">Nuestra colección</h1>

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

      <Footer />
    </>
  )
}

export default App