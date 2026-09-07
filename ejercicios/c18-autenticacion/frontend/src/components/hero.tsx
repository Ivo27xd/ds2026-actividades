import librosBg from '../assets/libros.jpg'

import '../styles/hero.css'

function Hero() {
    return (
        <section
            className="hero"
            style={{
                backgroundImage: `
                    linear-gradient(
                        to bottom,
                        rgba(0,0,0,0.45),
                        rgba(0,0,0,0.75)
                    ),
                    url(${librosBg})
                `
            }}
        >
            <div className="hero-content text-center">
                <h1>Mi Librería</h1>

                <p className="hero-text">
                    Descubrí clásicos, ciencia ficción, fantasía
                    y mucho más en nuestra colección.
                </p>

                <button className="btn btn-danger btn-lg">
    Ver catálogo
</button>
            </div>
        </section>
    )
}

export default Hero