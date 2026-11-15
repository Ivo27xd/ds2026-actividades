import Container from 'react-bootstrap/Container'
import { LuBookOpen } from 'react-icons/lu'
import '../styles/footer.css'

function Footer() {
  return (
    <footer className="footer-libreria py-4 mt-auto">
      <Container fluid className="px-3 px-md-4 d-flex flex-column flex-sm-row justify-content-between align-items-center gap-2">
        <div className="d-flex align-items-center gap-2 text-light fw-medium">
          <LuBookOpen size={17} />
          <span>Mi Librería</span>
        </div>

        <p className="m-0 small">
          © 2026 Mi Librería
        </p>
      </Container>
    </footer>
  )
}

export default Footer
