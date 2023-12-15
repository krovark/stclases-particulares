import React, { useState, useEffect } from 'react';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import 'bootstrap/dist/css/bootstrap.min.css';
import './estilos-menu/menu.css';
import Pagination from 'react-bootstrap/Pagination';
import Spinner from 'react-bootstrap/Spinner';
import CardTesting from '../Perfil/TabComponents/VistasTab/CardTesting'

const Postlist = ({ posts, filtroTipo, filtroFrecuencia, filtroCalificacion, filtroCategoria, currentPage, postsPerPage }) => {

  const [modalShow, setModalShow] = useState(false);
  const [hireServiceOpen, setHireServiceOpen] = useState(false);
  

if (!posts || posts.length === 0) {

  return (
    
    <div className="text-center-spinner">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Cargando...</span>
          </Spinner>
        </div>
    
    );
   
}


  const filteredPosts = posts.filter((servicio) => {
    console.log("Filtrando servicio:", servicio);
    const calificacionPromedioRedondeada = Math.round(servicio.proveedorId.calificacionPromedio);
    return (
      (!filtroTipo || servicio.tipoClase === filtroTipo) &&
      (!filtroFrecuencia || servicio.frecuencia === filtroFrecuencia) &&
      // (!filtroCalificacion || servicio.calificacion >= filtroCalificacion) && 
      (filtroCalificacion === null || calificacionPromedioRedondeada === filtroCalificacion) &&
      // (!filtroCalificacion || servicio.proveedorId.calificacionPromedio >= filtroCalificacion) && 
      (!filtroCategoria || servicio.nombre === filtroCategoria)  
    );   
  });
  
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);


  
  const handleHireServiceOpen = () => {
    setHireServiceOpen(true);
  };
  const handleHireServiceClose = () => {
    setHireServiceOpen(false);
  };

 
 
  return (

    currentPosts.map((servicio) => (
      <CardTesting
        key={servicio.id}
        servicioId={servicio._id}
        course={{
          instructorName: `${servicio.proveedorId.nombre} ${servicio.proveedorId.apellido}`,
          title: servicio.nombre,
          experience: servicio.experiencia,
          description: servicio.descripcion,
          calificacionPromedio: servicio.proveedorId.calificacionPromedio,
          titulo: servicio.titulo,
          frequency: servicio.frecuencia,
          tipoClase: servicio.tipoClase,
          price: servicio.costo
        }}
        avatarUrl={servicio.proveedorId.imgProfile}
        titulo={servicio.titulo}
      />
    ))
    
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
      <div className="filter-container" aria-hidden="false">
        <div className="filter">
          <InputLabel className="custom-label">Tipo de clase</InputLabel>
          <Select
            className="custom-select"
            label="Tipo de clase"
            onChange={(e) => {
              setFiltroTipo(e.target.value);
              setFiltroCalificacion(null);
            }}
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
            onChange={(e) => {setFiltroFrecuencia(e.target.value);
              setFiltroCalificacion(null);
            }}
          >
            <MenuItem value="">Todos</MenuItem>
            <MenuItem value="Única">Única</MenuItem>
            <MenuItem value="Semanal">Semanal</MenuItem>
            <MenuItem value="Mensual">Mensual</MenuItem>
          </Select>
        </div>

        <div className="filter">
          <Typography id="calificacion-slider" gutterBottom style={{ textAlign: 'center', display: 'block' }}>
              Calificación
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
  const [filtroCalificacion, setFiltroCalificacion] = useState('');
  const [filtroCategoria, setFiltroCategoria] = useState('');

  const [categorias, setCategorias] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;


  
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
        setServicios(data.servicios); 
        if (data.data && data.data.docs) {
          setServicios(data.data.docs);
        } else {
          console.error("La respuesta no contiene 'servicios'");
        }
      } catch (error) {
        console.error('Error:', error);
      }
     
    };

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
      setCategorias(data.data); 
    } catch (error) {
      console.error('Error al obtener las categorías:', error);
    }
  };



  useEffect(() => {
    fetchServicios();
    fetchCategorias();
    setFiltroCalificacion(null);
  }, []);


  const filteredPosts = servicios.filter(servicio => {
    const calificacionPromedioRedondeada = Math.round(servicio.proveedorId.calificacionPromedio);
    return (!filtroTipo || servicio.tipoClase === filtroTipo) &&
           (!filtroFrecuencia || servicio.frecuencia === filtroFrecuencia) &&
           (filtroCalificacion === null || calificacionPromedioRedondeada === filtroCalificacion) &&
           (!filtroCategoria || servicio.nombre === filtroCategoria);
  });

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  currentPosts.forEach(servicio => {
    console.log(servicio.proveedorId.imgProfile);
  });
  
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
            
            
            <div className="feed-post">
              <Postlist
                posts={currentPosts}
                filtroTipo={filtroTipo}
                filtroFrecuencia={filtroFrecuencia}
                filtroCalificacion={filtroCalificacion}
                filtroCategoria={filtroCategoria}
                currentPage={currentPage}
                postsPerPage={postsPerPage}
              />
            </div>
            <footer>
            <Pagination className="mt-3 justify-content-center">
      {Array.from({ length: Math.ceil(filteredPosts.length / postsPerPage) }, (_, i) => (
        <Pagination.Item key={i + 1} active={i + 1 === currentPage} onClick={() => paginate(i + 1)}>
          {i + 1}
        </Pagination.Item>
      ))}
    </Pagination>
        </footer>
      </div>
  );
};

export default HomeMenu;



