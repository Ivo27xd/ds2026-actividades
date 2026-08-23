import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

import { Link } from 'react-router-dom'

import MeGusta from './BotonLike'

import '../styles/libroCard.css'

/* no pude resolver el error en el botón (en "as"), pero lo dejo así porque es la única forma en la que me anduvo */

type LibroCardProps = {
    titulo: string
    autor: string
    imagen: string
    precio: number
    disponible: boolean
}

function LibroCard({ titulo, autor, imagen }: LibroCardProps) {
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
                    {autor}
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