import Card from 'react-bootstrap/Card'
import Badge from 'react-bootstrap/Badge'
import { Link } from 'react-router-dom'
import MeGusta from './BotonLike'
import type { Autor } from '../types/Autor'
import '../styles/libroCard.css'

type LibroCardProps = {
    id: number
    titulo: string
    autor: Autor | string
    imagen: string
    precio: number
    disponible: boolean
}

function LibroCard({ id, titulo, autor, imagen, precio, disponible }: LibroCardProps) {
    const nombreAutor = typeof autor === 'object' ? autor.nombre : autor;

    return (
        <Card className="libro-card h-100">
            <Card.Img
                variant="top"
                src={imagen}
                alt={titulo}
                loading="lazy"
                style={{
                    height: '420px',
                    objectFit: 'cover'
                }}
            />

            <Card.Body className="d-flex flex-column">
                <div className="d-flex justify-content-between align-items-start gap-2 mb-1">
                    <Card.Title className="mb-0">{titulo}</Card.Title>
                    <Badge bg={disponible ? "success" : "secondary"}>
                        {disponible ? "Disponible" : "Sin stock"}
                    </Badge>
                </div>

                <Card.Text className="text-muted mb-2">
                    {nombreAutor}
                </Card.Text>

                <p className="fw-bold fs-5 mb-3">
                    ${precio.toLocaleString("es-AR")}
                </p>

                <div className="mt-auto d-flex justify-content-between align-items-center">
                    <Link to={`/libros/${id}`} className="btn btn-dark">
                        Ver más
                    </Link>

                    <MeGusta />
                </div>
            </Card.Body>
        </Card>
    )
}

export default LibroCard
