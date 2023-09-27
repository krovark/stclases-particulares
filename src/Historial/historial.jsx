import React, { useState } from 'react';
import './historial-style.css';
import Pagination from 'react-bootstrap/Pagination';
import Rating from '@mui/material/Rating';

const PedidoStatusSelector = ({ selectedStatus, onStatusChange }) => {
  const [isDropdownDisabled, setIsDropdownDisabled] = useState(false);
  const [currentSelection, setCurrentSelection] = useState(selectedStatus);

  const handleStatusChange = (event) => {
      setCurrentSelection(event.target.value);
  };

  const handleConfirm = () => {
      onStatusChange(currentSelection);
      setIsDropdownDisabled(currentSelection === 'Finalizada' || currentSelection === 'Cancelada');
  };

  return (
      <div className="selector-value">
          <select value={currentSelection} onChange={handleStatusChange} disabled={isDropdownDisabled}>
              <option value="Pendiente">Pendiente</option>
              <option value="Aceptada">Aceptada</option>
              <option value="Finalizada">Finalizada</option>
              <option value="Cancelada">Cancelada</option>
          </select> 
          <br />
          <button id='confirm-state' onClick={handleConfirm}>Aceptar</button>
      </div>
  );
};

const HistorialItem = ({ item }) => (
    <li>
        <strong>{item.title}:</strong> {item.value}
    </li>
);

const HistorialPreview = ({ item, onStatusChange }) => {
    const studentDetails = [
        { title: 'Telefono', value: item.telefono },
        { title: 'Email', value: item.email },
        { title: 'Cantidad de clases', value: item.cclases },
        { title: 'Servicio', value: item.categoria },
        { title: 'Calificacion', value: <Rating name="read-only" value={item.calificacion} readOnly /> },
        { title: 'Comentario', value: item.comentario }
    ];

    return (
        <div className="historial-preview">
          <div className="hist-estudiante">         
                <h2>{item.studentName}</h2>     
          </div>
            <div className='body-alumno'>
                <ul className='ul-alumno'>
                    {studentDetails.map(detail => (
                        <HistorialItem key={detail.title} item={detail} />
                    ))}
                </ul>
            </div>
            <div className="status-class">
            <PedidoStatusSelector selectedStatus={item.estado || 'Pendiente'} onStatusChange={nuevoEstado => onStatusChange(item.id, nuevoEstado)} />
        </div>
        </div>
    );
};




const HistorialCursos = () => {
  const [historial, setHistorial] = useState([
    { studentName: 'Tiago Bartoli', telefono: 'Abogado', email: 'lorem ipsum...', categoria: 'Piano', precio: '50', cclases: '4', calificacion: '3', comentario: 'bueno bueno', id: 1 },
    { studentName: 'Lucila Manson', telefono: 'Matematicas', email: 'asdasd', categoria: "Pasteleria", precio: '70', cclases: '5', calificacion: '4' , comentario: 'bueno bueno'  , id: 2 },
    { studentName: 'Kevin Mcarty', telefono: 'Botanica', email: 'lorem ipsum...', categoria: 'Malabares', precio: '100', cclases: '3', calificacion: '5' , comentario: 'bueno bueno'  , id: 3 },
    { studentName: 'Maria Sol Corrado', telefono: 'Fisica', email: 'lorem ipsum...', categoria: 'Canto', precio: '60', cclases: '2', calificacion: '2' , comentario: 'bueno bueno'  , id: 4 },
    { studentName: 'Ezequiel Borrado', telefono: 'Artista', email: 'lorem ipsum...', categoria: 'Guitarra', precio: '50', cclases: '4', calificacion: '4' , comentario: 'bueno bueno'  , id: 5 },
    { studentName: 'Ester Esposito', telefono: 'Defensas Personales', email: 'lorem ipsum...', categoria: 'Cocina', precio: '40', cclases: '5', calificacion: '1' , comentario: 'bueno bueno'  , id: 6 },
  ]);

  const handleStatusChange = (id, nuevoEstado, isDropdownDisabled) => {
    const nuevoHistorial = historial.map((item) =>
      item.id === id ? { ...item, estado: nuevoEstado, isDropdownDisabled } : item
    );
    setHistorial(nuevoHistorial);
  };

  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const ITEMS_PER_PAGE = 5;
  
  const PaginationContainer = ({ currentPage, totalItems, onPageChange }) => {
    
    return (
        <div className="pagination-container">
            <Pagination className="mt-3 justify-content-center"> 
                {Array.from({ length: Math.ceil(totalItems / ITEMS_PER_PAGE) }).map((_, idx) => (
                    <Pagination.Item key={idx + 1} active={idx + 1 === currentPage} onClick={() => onPageChange(idx + 1)}>
                        {idx + 1}
                    </Pagination.Item>
                ))}
            </Pagination>
        </div>
    );
};
  const paginatedData = historial.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  return (
    <div className="main-container">
        <h1>Historial de Contrataciones</h1>
        <div className="historial-list">
            {paginatedData.map(historialItem => (
                <HistorialPreview key={historialItem.id} item={historialItem} onStatusChange={handleStatusChange} />
            ))}
        </div>
        <PaginationContainer currentPage={currentPage} totalItems={historial.length} onPageChange={handlePageChange} />
    </div>
);
};

export default HistorialCursos;