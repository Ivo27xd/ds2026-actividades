import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Catalogo from "./pages/Catalogo";
import LibroDetalle from "./pages/LibroDetalle";
import Contacto from "./pages/Contacto";
import Login from "./pages/Login";
import SinPermiso from "./pages/SinPermiso";
import LibroNuevo from "./pages/LibroNuevo";
import { PrivateRoute } from "./components/PrivateRoute";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Layout>
          <Routes>
            {/* Rutas Públicas */}
            <Route path="/" element={<Home />} />
            <Route path="/catalogo" element={<Catalogo />} />
            <Route path="/libro" element={<LibroDetalle />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="/login" element={<Login />} />
            <Route path="/sin-permiso" element={<SinPermiso />} />

            {/* Rutas Protegidas solo para ADMIN */}
            <Route element={<PrivateRoute rol="ADMIN" />}>
              <Route path="/libros/nuevo" element={<LibroNuevo />} />
            </Route>
          </Routes>
        </Layout>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;