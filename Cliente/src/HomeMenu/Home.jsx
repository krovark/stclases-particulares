import React, { useState, useEffect } from 'react';
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

import ComentarioModal from './verComentariosModal'
import HireService from './contratarServicioModal'

import { BrowserRouter as Router, Route, Switch, useLocation  } from 'react-router-dom';
import Profilesite from '../Perfil/TabComponents/VistasTab/profile-content';
import userLogin from '../Login/LoginForm';

import Rating from '@mui/material/Rating';
import Pagination from 'react-bootstrap/Pagination';

// const generateRandomCalificacion = () => {
//   return Math.floor(Math.random() * 5) + 1; // Genera una calificación aleatoria de 1 a 5
// };


// const generateRandomFrecuencia = () => {
//   const frecuencias = ['Unica', 'Semanal', 'Mensual'];
//   const randomIndex = Math.floor(Math.random() * frecuencias.length);
//   return frecuencias[randomIndex];
// };

// const generateRandomDuracion = () => {
//   const frecuencias = ['60', '30'];
//   const randomIndex = Math.floor(Math.random() * frecuencias.length);
//   return frecuencias[randomIndex];
// };

// const generateRandomTipoClase = () => {
//   const tipos = ['Individual', 'Grupal'];
//   const randomIndex = Math.floor(Math.random() * tipos.length);
//   return tipos[randomIndex];
// };

// const generateRandomCategoria = () => {
//   const categorias = ['Piano', 'Cocina', 'Manejo', 'Matematicas', 'Circo', 'Natación'];
//   const randomIndex = Math.floor(Math.random() * categorias.length);
//   return categorias[randomIndex];
// };

// const generateRandomExperiencia = () => {
//   const experiencias = [
//     // 'Experiencia en la enseñanza de esta materia por más de 5 años.',
//     // 'Amplia experiencia en el campo y excelentes resultados con mis estudiantes.',
//     'Soy un experto en esta área y he ayudado a muchos estudiantes a tener éxito.',
//     // 'He trabajado con estudiantes de todas las edades y niveles de habilidad.',
//   ];
//   const randomIndex = Math.floor(Math.random() * experiencias.length);
//   return experiencias[randomIndex];
// };

// const generateRandomPrecio = () => {
//   return Math.floor(Math.random() * 100) + 20; // Genera un precio aleatorio entre 20 y 120
// };

const getRandomAvatarNumber = () => {
  return Math.floor(Math.random() * 4) + 1; 
};

// const generateRandomPosts = (count) => {
//   const posts = [];
//   for (let i = 1; i <= count; i++) {
//     const author = `Autor ${i}`;
//     const titulo = `Título ${i}`;
//     const experiencia = generateRandomExperiencia();
//     const categoria = generateRandomCategoria();
//     const precio = generateRandomPrecio();
//     const calificacion = generateRandomCalificacion();
//     const tipoClase = generateRandomTipoClase();
//     const frecuencia = generateRandomFrecuencia();
//     const duracion = generateRandomDuracion();

//     const post = {
//       author,
//       titulo,
//       experiencia,
//       categoria,
//       precio,
//       calificacion,
//       id: i,
//       tipoClase,
//       frecuencia,
//       duracion,
//     };

//     posts.push(post);
//   }
//   return posts;
// };

const Postlist = ({ posts, filtroTipo, filtroFrecuencia, filtroCalificacion, filtroCategoria }) => {

  const [modalShow, setModalShow] = useState(false);
  const [hireServiceOpen, setHireServiceOpen] = useState(false);
  console.log("Posts en Postlist:", posts);
  console.log("Posts en Postlist:", posts);
if (!posts || posts.length === 0) {
  return <div>Cargando servicios...</div>;
}


  const filteredPosts = posts.filter((servicio) => {
    return (
      (!filtroTipo || servicio.tipoClase === filtroTipo) &&
      (!filtroFrecuencia || servicio.frecuencia === filtroFrecuencia) &&
      (!filtroCalificacion || servicio.calificacion >= filtroCalificacion) && 
      (!filtroCategoria || servicio.categoria === filtroCategoria)
    );
  });
  
  

  

  const handleHireServiceOpen = () => {
    setHireServiceOpen(true);
  };
  const handleHireServiceClose = () => {
    setHireServiceOpen(false);
  };

 
 
  return (
    <div className="post-container">
      <div className="post-grid">
        {filteredPosts.map((servicio) => (
          <div className="post-preview" key={servicio.id}>
            <div className="head-post">
            <div className="avatar">
              <Stack direction="row" spacing={1}>
                {/* <Avatar alt="Remy Sharp" src={`/${getRandomAvatarNumber()}.jpg`} sx={{ width: 80, height: 80 }}>   
                </Avatar> */}
              </Stack>
              
            </div>
            </div>
            
            <div className="class-category">
                <h2>{servicio.nombre}</h2>
              </div>        
            <ul id="ul-data-cards">
              <li>Nombre: {servicio.author}</li>
              <li>Titulo: {servicio.titulo}</li>
              <li>Experiencia: {servicio.experiencia}</li>
              <li>Tipo: {servicio.tipoClase}</li>
              <div className="description-container">
              <li>Descripcion: {servicio.descripcion}</li>
              </div>
              <li>Frecuencia: {servicio.frecuencia} </li>
              <li>Duración: {servicio.duracion} minutos </li>
              <br></br>
              <li> 
              <Rating name="read-only" value={servicio.calificacion} readOnly />
              </li>
              <div className="comentarios">
              <QuestionAnswerIcon className="PlusIcon" sx={{ fontSize: 30 }} onClick={() => setModalShow(true)}/>
                  <ComentarioModal
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                    
                  />
                  </div>
            </ul>
 
            <div className="precio-clase">     
            <HireService precio={servicio.costo} open={hireServiceOpen} onClose={handleHireServiceClose} > </HireService>     
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

  
  // const [currentPage, setCurrentPage] = useState(1); // Nuevo estado
  // const postsPerPage = 10; // Nueva constante
  // const publicaciones = generateRandomPosts(30);
  //const location = useLocation();
  const [servicios, setServicios] = useState([]);


  useEffect(() => {
    const fetchServicios = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/servicios/estado/activo', {
          method: 'GET',
          // credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            
          },
        });

        if (!response.ok) {
          throw new Error('Error al obtener los servicios');
        }

        const data = await response.json();
        console.log("Datos recibidos:", data);
        setServicios(data.servicios); // Asume que la respuesta tiene un campo `servicios`
        if (data.data && data.data.docs) {
          setServicios(data.data.docs);
        } else {
          console.error("La respuesta no contiene 'servicios'");
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchServicios();
  }, []);




  return (
    
    
      
      <div className="mainMenu">
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
                posts={servicios}
                filtroTipo={filtroTipo}
                filtroFrecuencia={filtroFrecuencia}
                filtroCalificacion={filtroCalificacion}
                filtroCategoria={filtroCategoria}
              />
            </div>
            <footer>
            {/* <Pagination className="mt-3 justify-content-center"> 
            {Array.from({ length: Math.ceil(servicios.length / postsPerPage) }).map((_, idx) => (
            <Pagination.Item key={idx + 1} active={idx + 1 === currentPage} onClick={() => setCurrentPage(idx + 1)}>
              {idx + 1}
            </Pagination.Item>
          ))}
        </Pagination> */}
        </footer>
      </div>
  );
};

export default HomeMenu;



