import './menu.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import PermIdentity from '@mui/icons-material/Person';

import { useSelector, useDispatch } from 'react-redux';
import { selectLoggedIn, logOut } from '../redux/authSlice';


const NavigationBar = () => {


  const isLoggedIn = useSelector(selectLoggedIn);
  const dispatch = useDispatch();

  const handleLogout = () => {
    
    dispatch(logOut());

  };

  return (
    // Barra de navegación utilizando React Bootstrap
    <Navbar expand="lg" bg="dark" variant="dark" data-bs-theme="dark" className="bg-body-tertiary navbar-dark">
      <Container fluid>
        {/* Marca del sitio (con enlace a Home) */}
        <Navbar.Brand as={Link} to="/home" style={{ color: 'white' }}>ClaseYA</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll" >
          {/* Menú de navegación centrado */}
          <Nav className="mx-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
            {/* Enlaces de inicio, perfil y historial */}

            {isLoggedIn && ( // mostrar estos enlaces solo si el usuario está autenticado
          <>
            <Nav.Link as={Link} to="/home" className="text-center" style={{ color: 'white' }}>Home</Nav.Link>
            <Nav.Link as={Link} to="/perfil" className="text-center" style={{ color: 'white' }}>Perfil</Nav.Link>
            <Nav.Link as={Link} to="/historial" className="text-center" style={{ color: 'white' }}>Historial</Nav.Link>

           
          </>
        )}

          </Nav>

          {isLoggedIn && (
            <div className="d-flex ml-auto">
              {/* <Button variant="outline-light" onClick={handleLogout}>Cerrar sesión</Button> */}
              <a href="#" style={{ color: 'white', textDecoration: 'underline' }} onClick={handleLogout}>Cerrar sesión</a>
            </div>
          )}


          {!isLoggedIn && ( // mostrar el botón de inicio de sesión si el usuario no está autenticado
          <div className="d-flex align-items-center">
                    <Link to="/iniciarsesion" className="btn btn-dark" style={{ color: 'white' }}>
                      <PermIdentity>
                        Iniciar sesión
                      </PermIdentity>
                    </Link>
          </div>
        )}
          
          {/* Grupo de elementos a la derecha */}
        </Navbar.Collapse>
      </Container>
    </Navbar>
    
  );
}



export default NavigationBar;
