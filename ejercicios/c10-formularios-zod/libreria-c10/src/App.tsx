import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useState } from 'react'

import Layout from './components/Layout'
import Home from './pages/Home'
import Catalogo from './pages/Catalogo'
import LibroDetalle from './pages/LibroDetalle'
import Contacto from './pages/Contacto'
import LibroNuevo from './pages/LibroNuevo'

import { libros } from './data/libros'
import type { Libro } from './types/Libro'


function App() {
    const [catalogo, setCatalogo] = useState<Libro[]>(libros)

    const agregarLibro = (
        nuevoLibro: Omit<Libro, 'id'>
    ) => {
        const libroCompleto: Libro = {
            id: catalogo.length + 1,
            ...nuevoLibro
        }

        setCatalogo([
            ...catalogo,
            libroCompleto
        ])
    }

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route
            path="/catalogo"
            element={<Catalogo catalogo={catalogo} />}
          />

          <Route
            path="/libros/nuevo"
            element={
              <LibroNuevo
                agregarLibro={agregarLibro}
              />
            }
          />

          <Route path="/libro" element={<LibroDetalle />} />
          <Route path="/contacto" element={<Contacto />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default App