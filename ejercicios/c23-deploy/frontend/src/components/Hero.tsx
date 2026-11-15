import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import { Link } from "react-router-dom";
import { LuChevronLeft, LuChevronRight, LuShoppingBag } from "react-icons/lu";
import type { Libro } from "../types/Libro";
import { obtenerDescripcionLibro } from "../data/descripcionesLibros";
import "../styles/hero.css";

const AUTOPLAY_MS = 12000;

interface HeroProps {
  libros: Libro[];
}

function Hero({ libros }: HeroProps) {
  const disponibles = libros.filter((l) => l.disponible);
  const otros = libros.filter((l) => !l.disponible);
  const destacados = [...disponibles, ...otros].slice(0, 3);

  const [indice, setIndice] = useState(0);
  const [compradoId, setCompradoId] = useState<number | null>(null);

  const indiceSeguro = destacados.length > 0 ? indice % destacados.length : 0;

  useEffect(() => {
    if (destacados.length <= 1) return;

    const timer = window.setTimeout(() => {
      setIndice((prev) => (prev + 1) % destacados.length);
      setCompradoId(null);
    }, AUTOPLAY_MS);

    return () => window.clearTimeout(timer);
  }, [indiceSeguro, destacados.length]);

  if (destacados.length === 0) {
    return null;
  }

  const irAnterior = () => {
    setIndice((prev) => (prev - 1 + destacados.length) % destacados.length);
    setCompradoId(null);
  };

  const irSiguiente = () => {
    setIndice((prev) => (prev + 1) % destacados.length);
    setCompradoId(null);
  };

  const irA = (nuevoIndice: number) => {
    setIndice(nuevoIndice);
    setCompradoId(null);
  };

  return (
    <section
      className="hero-destacados"
      aria-label="Libros destacados"
    >
      {destacados.map((item, idx) => (
        <div
          key={`bg-${item.id}`}
          className={`hero-backdrop ${idx === indiceSeguro ? "active" : ""}`}
          style={{ backgroundImage: `url(${item.imagen})` }}
          aria-hidden="true"
        />
      ))}
      <div className="hero-overlay" aria-hidden="true" />

      {destacados.length > 1 && (
        <>
          <button
            type="button"
            className="hero-arrow hero-arrow-prev"
            onClick={irAnterior}
            aria-label="Libro destacado anterior"
          >
            <LuChevronLeft size={24} />
          </button>

          <button
            type="button"
            className="hero-arrow hero-arrow-next"
            onClick={irSiguiente}
            aria-label="Siguiente libro destacado"
          >
            <LuChevronRight size={24} />
          </button>
        </>
      )}

      <div className="hero-content">
        <div
          className="hero-track"
          style={{ transform: `translate3d(-${indiceSeguro * 100}%, 0, 0)` }}
        >
          {destacados.map((libro, idx) => {
            const esActivo = idx === indiceSeguro;
            return (
              <div
                key={libro.id}
                className={`hero-slide ${esActivo ? "active" : ""}`}
                aria-hidden={!esActivo}
              >
                <Container className="px-4 px-md-5">
                  <Row className="align-items-center g-4 g-lg-5 hero-slide-row">
                    <Col lg={7} className="order-2 order-lg-1">
                      <div className="d-flex flex-wrap align-items-center gap-2 mb-3">
                        <Badge
                          bg={libro.disponible ? "success" : "secondary"}
                          className="px-3 py-2 rounded-pill"
                        >
                          {libro.disponible ? "Disponible" : "Sin stock"}
                        </Badge>

                        {libro.categorias?.map((cat) => (
                          <Badge
                            key={cat.id}
                            bg="dark"
                            className="border border-secondary px-3 py-2 rounded-pill fw-normal"
                          >
                            {cat.nombre}
                          </Badge>
                        ))}
                      </div>

                      <h1 className="hero-titulo">{libro.titulo}</h1>

                      <p className="hero-autor">
                        {libro.autor.nombre}
                      </p>

                      <p className="hero-descripcion">
                        {obtenerDescripcionLibro(libro)}
                      </p>

                      <p className="hero-precio">
                        ${libro.precio.toLocaleString("es-AR")}
                      </p>

                      {compradoId === libro.id && (
                        <Alert
                          variant="success"
                          dismissible
                          onClose={() => setCompradoId(null)}
                          className="mb-3"
                          style={{ maxWidth: "480px" }}
                        >
                          Agregaste "{libro.titulo}" a tu pedido.
                        </Alert>
                      )}

                      <div className="d-flex flex-wrap gap-3">
                        <Button
                          type="button"
                          className="btn-principal d-inline-flex align-items-center gap-2"
                          disabled={!libro.disponible}
                          tabIndex={esActivo ? undefined : -1}
                          onClick={() => setCompradoId(libro.id)}
                        >
                          <LuShoppingBag size={18} />
                          <span>{libro.disponible ? "Comprar" : "Sin stock"}</span>
                        </Button>

                        <Link
                          to={`/libros/${libro.id}`}
                          className="btn-secundario"
                          tabIndex={esActivo ? undefined : -1}
                        >
                          Ver detalle
                        </Link>
                      </div>
                    </Col>

                    <Col lg={5} className="order-1 order-lg-2 hero-cover-wrap">
                      <Link
                        to={`/libros/${libro.id}`}
                        className="hero-cover-link"
                        tabIndex={esActivo ? undefined : -1}
                      >
                        <img
                          src={libro.imagen}
                          alt={libro.titulo}
                          className="hero-cover-img"
                        />
                      </Link>
                    </Col>
                  </Row>
                </Container>
              </div>
            );
          })}
        </div>

        {destacados.length > 1 && (
          <Container className="px-4 px-md-5">
            <div className="hero-dots" role="tablist" aria-label="Seleccionar libro destacado">
              {destacados.map((item, idx) => (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={idx === indiceSeguro}
                  aria-label={`Ver destacado ${idx + 1}: ${item.titulo}`}
                  className={`hero-dot ${idx === indiceSeguro ? "active" : ""}`}
                  onClick={() => irA(idx)}
                />
              ))}
            </div>
          </Container>
        )}
      </div>
    </section>
  );
}

export default Hero;
