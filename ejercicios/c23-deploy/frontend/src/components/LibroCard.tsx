import Card from 'react-bootstrap/Card'
import Badge from 'react-bootstrap/Badge'
import { Link } from 'react-router-dom'
import MeGusta from './BotonLike'
import type { Autor } from '../types/Autor'
import type { Categoria } from '../types/Categoria'
import '../styles/libroCard.css'

type LibroCardProps = {
    id: number
    titulo: string
    autor: Autor | string
    imagen: string
    precio: number
    disponible: boolean
    categorias?: Categoria[]
}

function LibroCard({ id, titulo, autor, imagen, precio, disponible, categorias }: LibroCardProps) {
    const nombreAutor = typeof autor === 'object' ? autor.nombre : autor;

    return (
        <Card className="libro-card h-100">
            <div className="libro-card-media">
                <Card.Img
                    variant="top"
                    src={imagen}
                    alt={titulo}
                    loading="lazy"
                    className="libro-card-img"
                />
                <Badge
                    bg={disponible ? "success" : "secondary"}
                    className="libro-card-badge"
                >
                    {disponible ? "Disponible" : "Sin stock"}
                </Badge>
            </div>

            <Card.Body className="d-flex flex-column">
                <Card.Title className="libro-card-title">{titulo}</Card.Title>

                <Card.Text className="libro-card-autor">
                    {nombreAutor}
                </Card.Text>

                {categorias && categorias.length > 0 && (
                    <div className="libro-card-categorias">
                        {categorias.map((cat) => (
                            <span key={cat.id} className="libro-card-cat">
                                {cat.nombre}
                            </span>
                        ))}
                    </div>
                )}

                <p className="libro-card-precio">
                    ${precio.toLocaleString("es-AR")}
                </p>

                <div className="libro-card-actions">
                    <Link to={`/libros/${id}`} className="btn-principal py-2 px-3">
                        Ver más
                    </Link>

                    <MeGusta />
                </div>
            </Card.Body>
        </Card>
    )
}

export default LibroCard
