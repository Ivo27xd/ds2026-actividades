import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'
import MeGusta from './BotonLike'
import type { Autor } from '../types/Autor'
import '../styles/libroCard.css'

type LibroCardProps = {
    titulo: string
    autor: Autor | string  // Acepta el objeto Autor completo de la API
    imagen: string
    precio: number
    disponible: boolean
}

function LibroCard({ titulo, autor, imagen }: LibroCardProps) {
    // Si autor es un objeto, mostramos autor.nombre; si es string, lo muestra directo
    const nombreAutor = typeof autor === 'object' ? autor.nombre : autor;

    return (
        <Card className="libro-card h-100">
            <Card.Img variant="top" src={imagen}
                style={{
                    height: '420px',
                    objectFit: 'cover'
                }}
            />

            <Card.Body className="d-flex flex-column">
                <Card.Title>{titulo}</Card.Title>

                <Card.Text className="text-muted mb-3">
                    {nombreAutor}
                </Card.Text>

                <div className="mt-auto d-flex justify-content-between align-items-center">
                    <Button
                        as={Link}
                        to="/libro"
                        variant="dark"
                    >
                        Ver más
                    </Button>
                
                    <MeGusta />
                </div>
            </Card.Body>
        </Card>
    )
}

export default LibroCard