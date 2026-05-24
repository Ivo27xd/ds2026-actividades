import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

import MeGusta from './BotonLike'

type LibroCardProps = {
    titulo: string
    autor: string
    imagen: string
}

function LibroCard({ titulo, autor, imagen }: LibroCardProps) {
    return (
        <Card className="h-100 shadow-sm">
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
                    <Button variant="dark">Ver más</Button>
                
                    <MeGusta />
                </div>
            </Card.Body>
        </Card>
    )
}

export default LibroCard