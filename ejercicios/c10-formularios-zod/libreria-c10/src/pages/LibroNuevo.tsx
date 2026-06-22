import { useNavigate } from 'react-router-dom'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import type { LibroValidado } from '../schemas/libroSchema'
import { libroSchema } from '../schemas/libroSchema'

import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

type Props = {
    agregarLibro: (
        libro: LibroValidado
    ) => void
}

function LibroNuevo({ agregarLibro }: Props) {
    const navigate = useNavigate()

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<LibroValidado>({
        resolver: zodResolver(libroSchema)
    })

    const onSubmit = (
        data: LibroValidado
    ) => {
        agregarLibro(data)

        navigate('/catalogo')
    }

    return (
        <Container className="py-5">
            <h1 className="mb-4">
                Nuevo Libro
            </h1>

            <Form onSubmit={handleSubmit(onSubmit)}>

                <Form.Group className="mb-3">
                    <Form.Label>
                        Título
                    </Form.Label>

                    <Form.Control
                        {...register('titulo')}
                        isInvalid={!!errors.titulo}
                    />

                    <Form.Control.Feedback type="invalid">
                        {errors.titulo?.message}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>
                        Autor
                    </Form.Label>

                    <Form.Control
                        {...register('autor')}
                        isInvalid={!!errors.autor}
                    />

                    <Form.Control.Feedback type="invalid">
                        {errors.autor?.message}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>
                        Precio
                    </Form.Label>

                    <Form.Control
                        type="number"
                        {...register('precio', {
                            valueAsNumber: true
                        })}
                        isInvalid={!!errors.precio}
                    />

                    <Form.Control.Feedback type="invalid">
                        {errors.precio?.message}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Check
                    className="mb-4"
                    type="checkbox"
                    label="Disponible"
                    {...register('disponible')}
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