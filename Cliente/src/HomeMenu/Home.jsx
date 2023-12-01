import React, { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import 'bootstrap/dist/css/bootstrap.min.css';
import './estilos-menu/menu.css';
import ComentarioModal from './verComentariosModal'
import HireService from './contratarServicioModal'
import Rating from '@mui/material/Rating';
import Pagination from 'react-bootstrap/Pagination';
import Spinner from 'react-bootstrap/Spinner';


const Postlist = ({ posts, filtroTipo, filtroFrecuencia, filtroCalificacion, filtroCategoria }) => {

  const [modalShow, setModalShow] = useState(false);
  const [hireServiceOpen, setHireServiceOpen] = useState(false);
  console.log("Posts en Postlist:", posts);
  console.log("Posts en Postlist:", posts);
if (!posts || posts.length === 0) {

  return (
    
    <div className="text-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Cargando...</span>
          </Spinner>
        </div>
    
    );
   
}


  const filteredPosts = posts.filter((servicio) => {
    console.log("Filtrando servicio:", servicio);
    return (
      (!filtroTipo || servicio.tipoClase === filtroTipo) &&
      (!filtroFrecuencia || servicio.frecuencia === filtroFrecuencia) &&
      (!filtroCalificacion || servicio.calificacion >= filtroCalificacion) && 
      (!filtroCategoria || servicio.nombre === filtroCategoria)  
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
              <Avatar src={servicio.proveedorId.imgProfile} sx={{ width: 80, height: 80 }} />
              </Stack>
              
            </div>
            </div>
            
            <div className="class-category">
                <h2>{servicio.nombre}</h2>
              </div>        
            <ul id="ul-data-cards">
              <li>Nombre: {servicio.proveedorId && `${servicio.proveedorId.nombre} ${servicio.proveedorId.apellido}`} </li>
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

const Sidebar = ({ setFiltroTipo, setFiltroFrecuencia, setFiltroCalificacion, setFiltroCategoria, categorias }) => {
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
          onChange={(e) => {
            console.log("Categoría seleccionada:", e.target.value);
            setFiltroCategoria(e.target.value);
          }}
        >
          <MenuItem value="">Todos</MenuItem>
          {categorias.map((categoria, index) => (
            <MenuItem key={index} value={categoria.nombre}>{categoria.nombre}</MenuItem>
          ))}
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
  const [categorias, setCategorias] = useState([]);
  
  // const [currentPage, setCurrentPage] = useState(1); // Nuevo estado
  // const postsPerPage = 10; // Nueva constante
  // const publicaciones = generateRandomPosts(30);
  //const location = useLocation();
  const [servicios, setServicios] = useState([]);
  

  
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

    // fetchServicios();
 


  const fetchCategorias = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/servicios/nombres', {
          method: 'GET',
          // credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            
          },
        });

        if (!response.ok) {
          throw new Error('Error al obtener las categorias');
        }

      
      const data = await response.json();
      console.log(data);
      setCategorias(data.data); // Actualiza el estado con las categorías
    } catch (error) {
      console.error('Error al obtener las categorías:', error);
    }
  };



  useEffect(() => {
    fetchServicios();
    fetchCategorias();
    
  }, []);




  return (
    
    
      
      <div className="mainMenu">
            <div className="aside-container">
              <Sidebar
                setFiltroTipo={setFiltroTipo}
                setFiltroFrecuencia={setFiltroFrecuencia}
                setFiltroCalificacion={setFiltroCalificacion}
                setFiltroCategoria={setFiltroCategoria}
                categorias={categorias}
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



