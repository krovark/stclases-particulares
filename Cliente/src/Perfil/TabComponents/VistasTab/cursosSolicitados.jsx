import React, { useState, useEffect } from 'react';
import '../estiloTabs/coursesDictated-style.css';
import Pagination from 'react-bootstrap/Pagination';
import Rating from '@mui/material/Rating';

const PedidoStatusSelector = ({ selectedStatus, onStatusChange, contratacionId }) => {
  const [isDropdownDisabled, setIsDropdownDisabled] = useState(false);
  const [currentSelection, setCurrentSelection] = useState(selectedStatus);

//   const handleStatusChange = (event) => {
//       setCurrentSelection(event.target.value);
//   };


  const handleConfirm = async () => {

    try {
        const response = await fetch(`http://localhost:4000/api/contratar/editarcontratacion/${contratacionId}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include', // Si es necesario para la autenticación
          body: JSON.stringify({ estado: currentSelection }),
        });
  
        if (!response.ok) {
          throw new Error('Error al actualizar la contratación');
        }
  
        const responseData = await response.json();
        console.log('Contratación actualizada:', responseData);
  
        onStatusChange(currentSelection); // Actualiza el estado local después de una actualización exitosa
        setIsDropdownDisabled(currentSelection === 'Finalizada' || currentSelection === 'Cancelada');
      } catch (error) {
        console.error('Error:', error);
      }
    };

    useEffect(() => {
        // Establecer isDropdownDisabled basado en el estado inicial seleccionado
        setIsDropdownDisabled(selectedStatus === 'Finalizada' || selectedStatus === 'Cancelada');
      }, [selectedStatus]); // Dependencia: selectedStatus
    
      const handleStatusChange = (event) => {
          setCurrentSelection(event.target.value);
      };
    




  const shouldDisplayPendiente = !(["Aceptada", "Finalizada", "Cancelada"].includes(currentSelection));

  return (
      <div className="selector-value">
          <select value={currentSelection} onChange={handleStatusChange} disabled={isDropdownDisabled}>
              {/* <option value="Pendiente">Pendiente</option> */}
              { shouldDisplayPendiente && <option value="Pendiente">Pendiente</option> }
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
      { title: 'Servicio', value: item.servicioId?.nombre },
        { title: 'Teléfono', value: item.cliente?.telefono },
        { title: 'Email', value: item.cliente?.email },
        { title: 'Tipo', value: item.servicioId?.tipoClase },
        { title: 'Frecuencia', value: item.servicioId?.frecuencia },  
        { title: 'Cantidad de Clases', value: item.cantclases },
        
    ];

    
    return (
        <div className="historial-preview">
            <div className="hist-estudiante">         
                <h2>{`${item.cliente.nombre} ${item.cliente.apellido}`}</h2>     
            </div>
            <div className='body-alumno'>
                <ul className='ul-alumno'>
                    {studentDetails.map(detail => (
                        <HistorialItem key={detail.title} item={detail} />
                    ))}
                </ul>
            </div>
            <div className="status-class">
                <PedidoStatusSelector selectedStatus={item.estado || 'Pendiente'} onStatusChange={nuevoEstado => onStatusChange(item._id, nuevoEstado)} contratacionId={item._id} />
            </div>
        </div>
    );
};




const HistorialCursos = () => {


  const [historial, setHistorial] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);


  useEffect(() => {
    const fetchHistorial = async () => {
      try {
        
       
        const response = await fetch('http://localhost:4000/api/contratar/contrataciones/me', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include', // Importante para enviar cookies
            
        });


        if (!response.ok) {
          throw new Error('Error al obtener las contrataciones');
        }

        const data = await response.json();
        console.log("Datos recibidos del servidor:", data);
        
        // setHistorial(data.data.docs); 

        if (data && Array.isArray(data.docs)) {
            setHistorial(data.docs); // Asegúrate de que 'docs' es un arreglo
          } else {
            setHistorial(data.data);
          }


      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchHistorial();
  }, []);




  const handleStatusChange = (id, nuevoEstado, isDropdownDisabled) => {
    const nuevoHistorial = historial.map((item) =>
      item.id === id ? { ...item, estado: nuevoEstado, isDropdownDisabled } : item
    );
    setHistorial(nuevoHistorial);
  };

  
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