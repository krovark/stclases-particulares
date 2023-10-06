import React from 'react'
import './Tabs-styles.css'
import Rating from '@mui/material/Rating';

function CursosInscritos() {
    const cursos = [
      {
        id: 1,
        nombreServicio: 'Piano',
        docente: 'Juan Pérez',
        telefono: '555-1234',
        email: 'sadsad@gmail.com',
        cantidadClases: 4,
        tipo: 'Individual',
        calificacion: '5',
        comentario: 'Muy buen curso',
        estadoServicio: 'Cancelado'
      },
      {
        id: 2,
        nombreServicio: 'Piano',
        docente: 'Juan Pérez',
        telefono: '555-1234',
        email: 'sadsad@gmail.com',
        cantidadClases: 7,
        tipo: 'Grupal',
        calificacion: '1',
        comentario: 'Muy buen curso',
        estadoServicio: 'Finalizado'
      },
      {
        id: 3,
        nombreServicio: 'Piano',
        docente: 'Juan Pérez',
        telefono: '555-1234',
        email: 'sadsad@gmail.com',
        cantidadClases: 8,
        tipo: 'Individual',
        calificacion: '4.5',
        comentario: 'Muy buen curso',
        estadoServicio: 'Aceptado'
      },
      {
        id: 4,
        nombreServicio: 'Piano',
        docente: 'Juan Pérez',
        telefono: '555-1234',
        email: 'sadsad@gmail.com',
        cantidadClases: 2,
        tipo: 'Grupal',
        calificacion: '4.5',
        comentario: 'Muy buen curso',
        estadoServicio: 'Finalizado'
      },
      {
        id: 5,
        nombreServicio: 'Piano',
        docente: 'Juan Pérez',
        telefono: '555-1234',
        email: 'sadsad@gmail.com',
        cantidadClases: 10,
        tipo: 'Individual',
        calificacion: '2',
        comentario: 'Muy buen curso',
        estadoServicio: 'Finalizado'
      },
      {
        id: 6,
        nombreServicio: 'Piano',
        docente: 'Juan Pérez',
        telefono: '555-1234',
        email: 'sadsad@gmail.com',
        cantidadClases: 10,
        tipo: 'Grupal',
        calificacion: '3',
        comentario: 'Muy buen curso',
        estadoServicio: 'Aceptada'

      },

      
    ];
  
    return (
        <div className="main-container">
        <div className="cursos-list">
          {cursos.map(curso => (
            <div key={curso.id} className="cursos-preview">
              <div className="servicio-title">
                <h1>{curso.nombreServicio}</h1>
              </div>
              <div className="estado-curso">
                <h5>{curso.estadoServicio}</h5>
              </div>
              <div className="body-datos">
                <ol className="ul-datos">
                    
                  <li><strong>Docente:</strong> {curso.docente}</li>
                  <li><strong>Teléfono:</strong> {curso.telefono}</li>
                  <li><strong>Email:</strong> {curso.email}</li>
                  <li><strong>Cantidad de clases:</strong> {curso.cantidadClases}</li>
                  <li><strong>Tipo:</strong> {curso.tipo}</li>
                  <br></br>
                  <li><Rating name="read-only" value={curso.calificacion} readOnly /></li>
                 
                </ol>
              </div>
              <div className="comentario-section">
                <textarea value={curso.comentario} disabled className="textArea" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  
  export default CursosInscritos;