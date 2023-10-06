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
        cantidadClases: 4,
        tipo: 'Individual',
        calificacion: '5',
        comentario: 'Muy buen curso'
      },
      {
        id: 2,
        nombreServicio: 'Piano',
        docente: 'Juan Pérez',
        telefono: '555-1234',
        cantidadClases: 7,
        tipo: 'Grupal',
        calificacion: '1',
        comentario: 'Muy buen curso'
      },
      {
        id: 3,
        nombreServicio: 'Piano',
        docente: 'Juan Pérez',
        telefono: '555-1234',
        cantidadClases: 8,
        tipo: 'Individual',
        calificacion: '4.5',
        comentario: 'Muy buen curso'
      },
      {
        id: 4,
        nombreServicio: 'Piano',
        docente: 'Juan Pérez',
        telefono: '555-1234',
        cantidadClases: 2,
        tipo: 'Grupal',
        calificacion: '4.5',
        comentario: 'Muy buen curso'
      },
      {
        id: 5,
        nombreServicio: 'Piano',
        docente: 'Juan Pérez',
        telefono: '555-1234',
        cantidadClases: 10,
        tipo: 'Individual',
        calificacion: '2',
        comentario: 'Muy buen curso'
      },
      {
        id: 6,
        nombreServicio: 'Piano',
        docente: 'Juan Pérez',
        telefono: '555-1234',
        cantidadClases: 10,
        tipo: 'Grupal',
        calificacion: '3',
        comentario: 'Muy buen curso'
      },

      
    ];
  
    return (
      <div className="cursosContainer">
        {cursos.map(curso => (
          <div key={curso.id} className="cursoBox">
            <h2 className="header">{curso.nombreServicio}</h2>
            <ol className="list">
            <li><strong>Docente:</strong> {curso.docente}</li>
            <li><strong>Teléfono:</strong> {curso.telefono}</li>
            <li><strong>Cantidad de clases:</strong> {curso.cantidadClases}</li>
            <li><strong>Tipo:</strong> {curso.tipo}</li>
              <Rating name="read-only" value={curso.calificacion} readOnly />
            </ol>
            <textarea value={curso.comentario} disabled className="textArea" />
          </div>
        ))}
      </div>
    );
  }
  
  export default CursosInscritos;