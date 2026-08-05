import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

function Contacto() {
  return (
    <section id="contacto" className="py-5">

      <Container>

        <div className="text-center mb-5">

          <h1 className="titulo-contacto">
            Contactanos
          </h1>

          <p className="subtitulo-contacto">
            ¿Tenés alguna consulta, sugerencia o reclamo?
          </p>

        </div>

        <div className="form-container mx-auto">

          <Form>

            <Form.Group className="mb-4">

              <Form.Label>
                Nombre
              </Form.Label>

              <Form.Control
                type="text"
                required
              />

            </Form.Group>

            <Form.Group className="mb-4">

              <Form.Label>
                Email
              </Form.Label>

              <Form.Control
                type="email"
                required
              />

            </Form.Group>

            <Form.Group className="mb-4">

              <Form.Label>
                Asunto
              </Form.Label>

              <Form.Select required>

                <option value="">
                  Seleccioná una opción
                </option>

                <option value="consulta">
                  Consulta
                </option>

                <option value="reclamo">
                  Reclamo
                </option>

                <option value="sugerencia">
                  Sugerencia
                </option>

              </Form.Select>

            </Form.Group>

            <Form.Group className="mb-4">

              <Form.Label>
                Mensaje
              </Form.Label>

              <Form.Control
                as="textarea"
                rows={6}
                required
              />

            </Form.Group>

            <div className="text-center">

              <Button
                type="submit"
                className="btn-principal"
              >
                Enviar mensaje
              </Button>

            </div>

          </Form>

        </div>

      </Container>

    </section>
  )
}

export default Contacto