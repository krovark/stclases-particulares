import React, { useState } from 'react';
import './historial-style.css';
import Pagination from 'react-bootstrap/Pagination';

const PedidoStatusSelector = ({ selectedStatus, onStatusChange }) => {
  const [isDropdownDisabled, setIsDropdownDisabled] = useState(false);

  const handleStatusChange = (event) => {
    const nuevoEstado = event.target.value;
    onStatusChange(nuevoEstado, isDropdownDisabled);
  };

  const handleAceptarClick = () => {
    onStatusChange(selectedStatus, selectedStatus === 'Finalizada' || selectedStatus === 'Cancelada');
    setIsDropdownDisabled(selectedStatus === 'Finalizada' || selectedStatus === 'Cancelada');
  };

  return (
    <div className="status-class">
      <p>Estado del pedido</p>
      <br></br>
      <select id='select-value' value={selectedStatus} onChange={handleStatusChange} disabled={isDropdownDisabled}>
        <option value="Pendiente">Pendiente</option>
        <option value="Aceptada">Aceptada</option>
        <option value="Finalizada">Finalizada</option>
        <option value="Cancelada">Cancelada</option>
      </select>
      <br></br>
      <button id='confirm-state' onClick={handleAceptarClick}>Aceptar</button>
    </div>
  );
};

const ITEMS_PER_PAGE = 5;

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

  const [currentPage, setCurrentPage] = useState(0);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const paginatedData = historial.slice(currentPage * ITEMS_PER_PAGE, (currentPage + 1) * ITEMS_PER_PAGE);

  return (
    <div className="main-container">
      <h1>Historial de Cursos</h1>
      <div className="historial-list">
        {paginatedData.map((historialItem) => (
          <div className="post-preview" key={historialItem.id}>
            <div className="class-category">
              <h2>{historialItem.studentName}</h2>
            </div>
            <div className='body-alumno'>
            <ul className='ul-alumno' >
                <li>Telefono: {historialItem.telefono}</li>
                <li>Email: {historialItem.email}</li>
                <li>Cantidad de clases: {historialItem.cclases}</li>
                <li>Servicio: {historialItem.categoria}</li>
                <li>Calificacion : {historialItem.calificacion}</li>
                <li>Comentario: {historialItem.comentario}</li>
              </ul>
            </div>
            <PedidoStatusSelector
              selectedStatus={historialItem.estado || 'Pendiente'}
              onStatusChange={(nuevoEstado, isDropdownDisabled) => handleStatusChange(historialItem.id, nuevoEstado, isDropdownDisabled)}
            />
          </div>
        ))}
      </div>
      <div className="pagination-container">
        <Pagination>
          <Pagination.First onClick={() => handlePageChange(0)} />
          <Pagination.Prev
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 0}
          />
          {[...Array(Math.ceil(historial.length / ITEMS_PER_PAGE))].map((_, index) => (
            <Pagination.Item
              key={index}
              active={index === currentPage}
              onClick={() => handlePageChange(index)}
            >
              {index + 1}
            </Pagination.Item>
          ))}
          <Pagination.Next
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === Math.ceil(historial.length / ITEMS_PER_PAGE) - 1}
          />
          <Pagination.Last
            onClick={() => handlePageChange(Math.ceil(historial.length / ITEMS_PER_PAGE) - 1)}
          />
        </Pagination>
      </div>
    </div>
  );
};

export default HistorialCursos;
