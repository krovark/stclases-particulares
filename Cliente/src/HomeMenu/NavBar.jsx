import './estilos-menu/menu.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import PermIdentity from '@mui/icons-material/Person';
import Badge from '@mui/material/Badge';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Popover from '@mui/material/Popover';
import NotificationContent from './previewNotificaciones';
import { useSelector, useDispatch } from 'react-redux';
import { selectLoggedIn, logOut } from '../redux/authSlice';
import { persistor } from '../redux/store';

// import Button from 'react-bootstrap/Button';
// import Form from 'react-bootstrap/Form';
// import backgroundImage from '../Img/fondoLog.jpg'

const NavigationBar = () => {


  const isLoggedIn = useSelector(selectLoggedIn);
  const dispatch = useDispatch();

  const handleLogout = async  () => {
    
    dispatch(logOut());
    persistor.purge();

    try {
      const response = await fetch('http://localhost:4000/api/users/logout', {
        method: 'POST',
        credentials: 'include' 
      });
      if (response.ok) {
        
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }


  };

  const unreadCount = useSelector((state) => state.notifications.unreadCount);


      const [anchorEl, setAnchorEl] = React.useState(null);

    const handleOpenPopover = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClosePopover = () => {
      setAnchorEl(null);
    };


  return (
    <>
      {/* <head>
        <link rel="preload" as="image" href={backgroundImage} />
      </head> */}

    <Navbar expand="lg" bg="dark" variant="dark" data-bs-theme="dark" className="bg-body-tertiary navbar-dark">
      <Container fluid>
        {/* Marca del sitio (con enlace a Home) */}
        <Navbar.Brand as={Link} to="/home" style={{ color: 'white' }}>  <span id='tu'>tu</span><span id='claseYa'>ClaseYA</span></Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll" >
          {/* Menú de navegación centrado */}
          <Nav className="mx-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
            {/* Enlaces de inicio, perfil y historial */}

            {isLoggedIn && ( // mostrar estos enlaces solo si el usuario está autenticado
          <>
            <Nav.Link as={Link} to="/home" className="text-center" style={{ color: 'white' }}><span id='navbarSelect'>Home</span></Nav.Link>
            <Nav.Link as={Link} to="/perfil" className="text-center" style={{ color: 'white' }}><span id='navbarSelect'>Perfil</span></Nav.Link>

           
          </>
        )}

          </Nav>

          {isLoggedIn && (
            <>
            {/* <div className="d-flex ml-auto">
              <Badge badgeContent={unreadCount} color="error">
            <NotificationsIcon style={{ color: 'white', marginRight: '15px', cursor: 'pointer' }} onClick={handleOpenPopover} />
          </Badge>
          </div> */}

           <div className="d-flex ml-auto">
              <a href="/home" style={{ color: 'white', textDecoration: 'underline' }} onClick={handleLogout}><h5>Cerrar sesión</h5></a>
            </div>
            </>
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
          
        </Navbar.Collapse>
      </Container>
    </Navbar>

<Popover
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            onClose={handleClosePopover}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
        >
           <NotificationContent></NotificationContent>
        </Popover>
    </>

    
  );
}



export default NavigationBar;
