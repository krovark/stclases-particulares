import './menu.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';

import { PersonCircle } from 'bootstrap-icons-react'; // Importa el icono de usuario

const NavigationBar = () => {
  return (
    // Barra de navegación utilizando React Bootstrap
    <Navbar expand="lg" bg="dark" variant="dark" className="bg-body-tertiary navbar-dark">
      <Container fluid>
        {/* Marca del sitio (con enlace a Home) */}
        <Navbar.Brand as={Link} to="/" style={{ color: 'black' }}>ClaseYA</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          {/* Menú de navegación centrado */}
          <Nav className="mx-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
            {/* Enlaces de inicio, perfil y historial */}
            <Nav.Link as={Link} to="/" className="text-center" style={{ color: 'black' }}>Home</Nav.Link>
            <Nav.Link as={Link} to="/perfil" className="text-center" style={{ color: 'black' }}>Perfil</Nav.Link>
            <Nav.Link as={Link} to="/historial" className="text-center" style={{ color: 'black' }}>Historial</Nav.Link>
          </Nav>
          {/* Grupo de elementos a la derecha */}
          <div className="d-flex align-items-center">
            {/* Formulario de búsqueda */}
            <Form className="me-2">
              <Form.Control
                type="search"
                placeholder="Buscar por categoría"
                aria-label="Buscar"
              />
            </Form>
            {/* Botón de buscar con Dropdown */}
            <Button variant="light" className="me-2">
              Buscar
            </Button>
            {/* Botón de iniciar sesión con icono de usuario */}
            <Link to="/iniciarsesion" className="btn btn-light">
              <PersonCircle /> Iniciar sesión
            </Link>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;
