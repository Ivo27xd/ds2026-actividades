import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

type Props = {
    agregarLibro: (libro: any) => void
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

        const nuevosErrores = {
            titulo: '',
            autor: '',
            precio: ''
        }

        if (formulario.titulo.trim() === '')
            nuevosErrores.titulo =
                'Ingrese un título'

        if (formulario.autor.trim() === '')
            nuevosErrores.autor =
                'Ingrese un autor'

        if (
            formulario.precio === '' ||
            Number(formulario.precio) <= 0
        )
            nuevosErrores.precio =
                'Ingrese un precio válido'

        setErrores(nuevosErrores)

        const hayErrores =
            Object.values(nuevosErrores)
                .some(error => error !== '')

        if (hayErrores) return

        agregarLibro({
            titulo: formulario.titulo,
            autor: formulario.autor,
            precio: Number(formulario.precio),
            disponible: formulario.disponible
        })

        navigate('/catalogo')
    }

    return (
        <form onSubmit={handleSubmit}>

            <input
                name="titulo"
                value={formulario.titulo}
                onChange={handleChange}
                placeholder="Título"
            />
            <p>{errores.titulo}</p>

            <input
                name="autor"
                value={formulario.autor}
                onChange={handleChange}
                placeholder="Autor"
            />
            <p>{errores.autor}</p>

            <input
                type="number"
                name="precio"
                value={formulario.precio}
                onChange={handleChange}
                placeholder="Precio"
            />
            <p>{errores.precio}</p>

            <label>
                Disponible
                <input
                    type="checkbox"
                    name="disponible"
                    checked={formulario.disponible}
                    onChange={handleChange}
                />
            </label>

            <button type="submit">
                Guardar
            </button>

        </form>
    )
}

export default LibroNuevo