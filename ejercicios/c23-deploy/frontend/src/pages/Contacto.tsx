import { useState } from 'react'
import type { FormEvent } from 'react'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'
import '../styles/contacto.css'

function Contacto() {
  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [asunto, setAsunto] = useState('')
  const [mensaje, setMensaje] = useState('')
  const [enviado, setEnviado] = useState(false)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setEnviado(true)
    setNombre('')
    setEmail('')
    setAsunto('')
    setMensaje('')
  }

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

        <div className="form-container form-card mx-auto">
          {enviado && (
            <Alert variant="success" dismissible onClose={() => setEnviado(false)}>
              ¡Gracias por tu mensaje! Te responderemos a la brevedad.
            </Alert>
          )}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-4">
              <Form.Label>
                Nombre
              </Form.Label>

              <Form.Control
                type="text"
                required
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>
                Email
              </Form.Label>

              <Form.Control
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>
                Asunto
              </Form.Label>

              <Form.Select
                required
                value={asunto}
                onChange={(e) => setAsunto(e.target.value)}
              >
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
                rows={5}
                required
                value={mensaje}
                onChange={(e) => setMensaje(e.target.value)}
              />
            </Form.Group>

            <div className="text-center">
              <Button
                type="submit"
                className="btn-principal w-100"
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
