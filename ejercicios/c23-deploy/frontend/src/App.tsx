import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Catalogo from "./pages/Catalogo";
import LibroDetalle from "./pages/LibroDetalle";
import Contacto from "./pages/Contacto";
import Login from "./pages/Login";
import Registro from "./pages/Registro";
import SinPermiso from "./pages/SinPermiso";
import LibroNuevo from "./pages/LibroNuevo";
import { PrivateRoute } from "./components/PrivateRoute";
import { AuthProvider } from "./context/AuthContext";

function PaginaNoEncontrada() {
  return (
    <Container className="py-5 text-center">
      <h1>404</h1>
      <p className="text-secondary">La página que buscás no existe.</p>
      <Link to="/" className="btn btn-outline-light">
        Volver al inicio
      </Link>
    </Container>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Layout>
          <Routes>
            {/* Rutas Públicas */}
            <Route path="/" element={<Home />} />
            <Route path="/catalogo" element={<Catalogo />} />
            <Route path="/libros/:id" element={<LibroDetalle />} />
            <Route path="/libro" element={<Navigate to="/catalogo" replace />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registro" element={<Registro />} />
            <Route path="/sin-permiso" element={<SinPermiso />} />

            {/* Rutas Protegidas solo para ADMIN */}
            <Route element={<PrivateRoute rol="ADMIN" />}>
              <Route path="/libros/nuevo" element={<LibroNuevo />} />
            </Route>

            <Route path="*" element={<PaginaNoEncontrada />} />
          </Routes>
        </Layout>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
