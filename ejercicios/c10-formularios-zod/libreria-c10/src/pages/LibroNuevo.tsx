import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import { libroSchema } from '../schemas/libroSchema'

import type { LibroValidado } from '../schemas/libroSchema'

type Props = {
    agregarLibro: (
        libro: LibroValidado
    ) => void
}

function LibroNuevo({ agregarLibro }: Props) {
    const navigate = useNavigate()

    const [formulario, setFormulario] = useState({
        titulo: '',
        autor: '',
        precio: '',
        disponible: false
    })

    const [errores, setErrores] = useState({
        titulo: '',
        autor: '',
        precio: ''
    })

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const { name, value, checked, type } = e.target

        setFormulario({
            ...formulario,
            [name]:
                type === 'checkbox'
                    ? checked
                    : value
        })
    }

    const handleSubmit = (
        e: React.FormEvent
    ) => {
        e.preventDefault()

        const resultado = libroSchema.safeParse({
            ...formulario,
            precio: Number(formulario.precio)
        })

        if (!resultado.success) {
            const nuevosErrores = {
                titulo: '',
                autor: '',
                precio: ''
            }

            resultado.error.issues.forEach(issue => {
                const campo =
                    issue.path[0] as keyof typeof nuevosErrores

                nuevosErrores[campo] = issue.message
            })

            setErrores(nuevosErrores)
            return
        }

        setErrores({
            titulo: '',
            autor: '',
            precio: ''
        })

        agregarLibro(resultado.data)

        navigate('/catalogo')
    }

    return (
        <Container className="py-5">
            <h1 className="mb-4">
                Nuevo Libro
            </h1>

            <Form onSubmit={handleSubmit}>

                <Form.Group className="mb-3">
                    <Form.Label>
                        Título
                    </Form.Label>

                    <Form.Control
                        type="text"
                        name="titulo"
                        value={formulario.titulo}
                        onChange={handleChange}
                        isInvalid={!!errores.titulo}
                    />

                    <Form.Control.Feedback
                        type="invalid"
                    >
                        {errores.titulo}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>
                        Autor
                    </Form.Label>

                    <Form.Control
                        type="text"
                        name="autor"
                        value={formulario.autor}
                        onChange={handleChange}
                        isInvalid={!!errores.autor}
                    />

                    <Form.Control.Feedback
                        type="invalid"
                    >
                        {errores.autor}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>
                        Precio
                    </Form.Label>

                    <Form.Control
                        type="number"
                        name="precio"
                        value={formulario.precio}
                        onChange={handleChange}
                        isInvalid={!!errores.precio}
                    />

                    <Form.Control.Feedback
                        type="invalid"
                    >
                        {errores.precio}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Check
                    className="mb-4"
                    type="checkbox"
                    label="Disponible"
                    name="disponible"
                    checked={formulario.disponible}
                    onChange={handleChange}
                />

                <Button
                    type="submit"
                    variant="success"
                >
                    Guardar
                </Button>

            </Form>
        </Container>
    )
}

export default LibroNuevo