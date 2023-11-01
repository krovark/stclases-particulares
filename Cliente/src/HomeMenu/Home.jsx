import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import LandingPage from './LandingPage'

import 'bootstrap/dist/css/bootstrap.min.css';
import './estilos-menu/menu.css';
import NavigationBar from './NavBar';
import Home from './Home'

import CommentM from './commentModal'
import HireService from './getService'

import { BrowserRouter as Router, Route, Switch, useLocation  } from 'react-router-dom';
import Profilesite from '../Perfil/TabComponents/VistasTab/profile-content';
import userLogin from '../Login/LoginForm';

import Rating from '@mui/material/Rating';
import Pagination from 'react-bootstrap/Pagination';

const generateRandomCalificacion = () => {
  return Math.floor(Math.random() * 5) + 1; // Genera una calificación aleatoria de 1 a 5
};


const generateRandomFrecuencia = () => {
  const frecuencias = ['Unica', 'Semanal', 'Mensual'];
  const randomIndex = Math.floor(Math.random() * frecuencias.length);
  return frecuencias[randomIndex];
};

const generateRandomDuracion = () => {
  const frecuencias = ['60', '30'];
  const randomIndex = Math.floor(Math.random() * frecuencias.length);
  return frecuencias[randomIndex];
};

const generateRandomTipoClase = () => {
  const tipos = ['Individual', 'Grupal'];
  const randomIndex = Math.floor(Math.random() * tipos.length);
  return tipos[randomIndex];
};

const generateRandomCategoria = () => {
  const categorias = ['Piano', 'Cocina', 'Manejo', 'Matematicas', 'Circo', 'Natación'];
  const randomIndex = Math.floor(Math.random() * categorias.length);
  return categorias[randomIndex];
};

const generateRandomExperiencia = () => {
  const experiencias = [
    // 'Experiencia en la enseñanza de esta materia por más de 5 años.',
    // 'Amplia experiencia en el campo y excelentes resultados con mis estudiantes.',
    'Soy un experto en esta área y he ayudado a muchos estudiantes a tener éxito.',
    // 'He trabajado con estudiantes de todas las edades y niveles de habilidad.',
  ];
  const randomIndex = Math.floor(Math.random() * experiencias.length);
  return experiencias[randomIndex];
};

const generateRandomPrecio = () => {
  return Math.floor(Math.random() * 100) + 20; // Genera un precio aleatorio entre 20 y 120
};

const getRandomAvatarNumber = () => {
  return Math.floor(Math.random() * 4) + 1; 
};

const generateRandomPosts = (count) => {
  const posts = [];
  for (let i = 1; i <= count; i++) {
    const author = `Autor ${i}`;
    const titulo = `Título ${i}`;
    const experiencia = generateRandomExperiencia();
    const categoria = generateRandomCategoria();
    const precio = generateRandomPrecio();
    const calificacion = generateRandomCalificacion();
    const tipoClase = generateRandomTipoClase();
    const frecuencia = generateRandomFrecuencia();
    const duracion = generateRandomDuracion();

    const post = {
      author,
      titulo,
      experiencia,
      categoria,
      precio,
      calificacion,
      id: i,
      tipoClase,
      frecuencia,
      duracion,
    };

    posts.push(post);
  }
  return posts;
};

const Postlist = ({ posts, filtroTipo, filtroFrecuencia, filtroCalificacion, filtroCategoria }) => {
  const filteredPosts = posts.filter((post) => {
    return (
      (!filtroTipo || post.tipoClase === filtroTipo) &&
      (!filtroFrecuencia || post.frecuencia === filtroFrecuencia) &&
      (!filtroCalificacion || post.calificacion >= filtroCalificacion) && 
      (!filtroCategoria || post.categoria === filtroCategoria)
    );
  });
  
  

  const [modalShow, setModalShow] = useState(false);
  const [hireServiceOpen, setHireServiceOpen] = useState(false);

  const handleHireServiceOpen = () => {
    setHireServiceOpen(true);
  };
  const handleHireServiceClose = () => {
    setHireServiceOpen(false);
  };

 
 
  return (
    <div className="post-container">
      <div className="post-grid">
        {filteredPosts.map((post) => (
          <div className="post-preview" key={post.id}>
            <div className="head-post">
            <div className="avatar">
              <Stack direction="row" spacing={1}>
                <Avatar alt="Remy Sharp" src={`/${getRandomAvatarNumber()}.jpg`} sx={{ width: 80, height: 80 }}>   
                </Avatar>
              </Stack>
              
            </div>
            </div>
            
            <div className="class-category">
                <h2>{post.categoria}</h2>
              </div>        
            <ul id="ul-data-cards">
              <li>Nombre: {post.author}</li>
              <li>Titulo: {post.titulo}</li>
              <li>Experiencia: {post.experiencia}</li>
              <li>Tipo: {post.tipoClase}</li>
              <li>Frecuencia: {post.frecuencia} </li>
              <li>Duración: {post.duracion} minutos </li>
              <br></br>
              <li> 
              <Rating name="read-only" value={post.calificacion} readOnly />
              </li>
              <div className="comentarios">
              <QuestionAnswerIcon className="PlusIcon" sx={{ fontSize: 30 }} onClick={() => setModalShow(true)}/>
                  <CommentM
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                    
                  />
                  </div>
            </ul>
 
            <div className="precio-clase">     
            <HireService precio={post.precio} open={hireServiceOpen} onClose={handleHireServiceClose} > </HireService>     
            </div>

            

          </div>
        ))}



      </div>
    </div>
  );
};

const Sidebar = ({ setFiltroTipo, setFiltroFrecuencia, setFiltroCalificacion, setFiltroCategoria }) => {
  const marks = [
    { value: 1, label: '1' },
    { value: 2, label: '2' },
    { value: 3, label: '3' },
    { value: 4, label: '4' },
    { value: 5, label: '5' },
  ];

  return (
    <div className="sidebar">
      <header>
        <h3>Filtros</h3>
      </header>

      <div className="filter-container" aria-hidden="false">
        <div className="filter">
          <InputLabel className="custom-label">Tipo de clase</InputLabel>
          <Select
            className="custom-select"
            label="Tipo de clase"
            onChange={(e) => setFiltroTipo(e.target.value)}
          >
            <MenuItem value="">Todos</MenuItem>
            <MenuItem value="Individual">Individual</MenuItem>
            <MenuItem value="Grupal">Grupal</MenuItem>
          </Select>
        </div>

        <div className="filter">
          <InputLabel className="custom-label">Frecuencia</InputLabel>
          <Select
            className="custom-select"
            label="Frecuencia"
            onChange={(e) => setFiltroFrecuencia(e.target.value)}
          >
            <MenuItem value="">Todos</MenuItem>
            <MenuItem value="Unica">Única</MenuItem>
            <MenuItem value="Semanal">Semanal</MenuItem>
            <MenuItem value="Mensual">Mensual</MenuItem>
          </Select>
        </div>

        <div className="filter">
          <Typography id="calificacion-slider" gutterBottom>
            <strong style={{ textAlign: 'center', display: 'block' }}>Calificación</strong>
          </Typography>
          <Slider
            defaultValue={3}
            step={1}
            min={1}
            max={5}
            valueLabelDisplay="auto"
            aria-labelledby="calificacion-slider"
            marks={marks}
            labelPlacement="top"
            onChange={(e, value) => setFiltroCalificacion(value)}
          />
        </div>

        <div className="filter">
          <InputLabel className="custom-label">Categoría</InputLabel>
          <Select
            className="custom-select"
            label="Categoría"
            onChange={(e) => setFiltroCategoria(e.target.value)}
          >
            <MenuItem value="">Todos</MenuItem>
            <MenuItem value="Piano">Piano</MenuItem>
            <MenuItem value="Cocina">Cocina</MenuItem>
            <MenuItem value="Manejo">Manejo</MenuItem>
            <MenuItem value="Matematicas">Matematicas</MenuItem>
            <MenuItem value="Circo">Circo</MenuItem>
            <MenuItem value="Natación">Natación</MenuItem>
          </Select>
        </div>
      </div>
    </div>
  );
};

const HomeMenu = () => {
  const [filtroTipo, setFiltroTipo] = useState('');
  const [filtroFrecuencia, setFiltroFrecuencia] = useState('');
  const [filtroCalificacion, setFiltroCalificacion] = useState(null);
  const [filtroCategoria, setFiltroCategoria] = useState('');

  
  const [currentPage, setCurrentPage] = useState(1); // Nuevo estado
  const postsPerPage = 10; // Nueva constante
  const publicaciones = generateRandomPosts(30);
  


  // Generar 50 publicaciones aleatorias que cumplen con los filtros
  // const indexOfLastPost = currentPage * postsPerPage; // Nueva constante
  // const indexOfFirstPost = indexOfLastPost - postsPerPage; // Nueva constante
  // const currentPosts = publicaciones.slice(indexOfFirstPost, indexOfLastPost); // Nueva constante
  

  return (
    
    <Router>
      <NavigationBar />
      
      <div className="mainMenu">
        
        <Switch>
          <Route path='/' exact component={LandingPage}/>
          <Route path="/perfil" component={Profilesite} />
          <Route path="/iniciarsesion" component={userLogin} />
          <Route path="/home" >
            <div className="aside-container">
              <Sidebar
                setFiltroTipo={setFiltroTipo}
                setFiltroFrecuencia={setFiltroFrecuencia}
                setFiltroCalificacion={setFiltroCalificacion}
                setFiltroCategoria={setFiltroCategoria}
              />
            </div>
            <div className="feed-container"></div>
            <div className="feed-post">
              <Postlist
                posts={publicaciones}
                filtroTipo={filtroTipo}
                filtroFrecuencia={filtroFrecuencia}
                filtroCalificacion={filtroCalificacion}
                filtroCategoria={filtroCategoria}
              />
            </div>
            <footer>
            <Pagination className="mt-3 justify-content-center"> 
            {Array.from({ length: Math.ceil(publicaciones.length / postsPerPage) }).map((_, idx) => (
            <Pagination.Item key={idx + 1} active={idx + 1 === currentPage} onClick={() => setCurrentPage(idx + 1)}>
              {idx + 1}
            </Pagination.Item>
          ))}
        </Pagination>
        </footer>
          </Route>
        </Switch>
        
      </div>
    </Router>
  );
};

export default HomeMenu;