import React, { useState } from 'react';
import './Tabs-styles.css';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Rating from '@mui/material/Rating';
import ProgressBar from 'react-bootstrap/ProgressBar'; // Importa ProgressBar desde react-bootstrap
import StarIcon from '@mui/icons-material/Star';

function CursosInscritos() {
  const [cursos, setCursos] = useState([
    {
      id: 1,
      nombreServicio: 'Piano',
      docente: 'Juan Pérez',
      telefono: '555-1234',
      email: 'sadsad@gmail.com',
      cantidadClases: 4,
      tipo: 'Individual',
      calificacion: '5',
      comentario: '',
      estadoServicio: 'Cancelado',
      progreso: 100,
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
      estadoServicio: 'Finalizado',
      progreso: 100,
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
      estadoServicio: 'Aceptado',
      progreso: 60,
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
      comentario: '',
      estadoServicio: 'Finalizado',
      progreso: 100,
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
      estadoServicio: 'Finalizado',
      progreso: 100,
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
      estadoServicio: 'Aceptado',
      progreso: 40,
    }

  ]);

  const [commentDialogOpen, setCommentDialogOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [newComment, setNewComment] = useState('');

  const openCommentDialog = (curso) => {
    setSelectedCourse(curso);
    setNewComment(curso.comentario);
    setCommentDialogOpen(true);
  };

  const closeCommentDialog = () => {
    setSelectedCourse(null);
    setNewComment('');
    setCommentDialogOpen(false);
  };

  const saveComment = () => {
    if (selectedCourse) {
      const updatedCourses = cursos.map((curso) =>
        curso.id === selectedCourse.id
          ? { ...curso, comentario: newComment }
          : curso
      );
      setCursos(updatedCourses);
      closeCommentDialog();
    }
  };

  const handleRatingChange = (newValue, curso) => {
    const updatedCourses = cursos.map((c) =>
      c.id === curso.id ? { ...c, calificacion: newValue } : c
    );
    setCursos(updatedCourses);
  };

  const getProgressBarVariant = (estado) => {
    if (estado === 'Aceptado') {
      return 'success';
    } else if (estado === 'Finalizado') {
      return 'info';
    } else if (estado === 'Cancelado') {
      return 'danger';
    } else {
      return 'info';
    }
  };

  const getProgressBarNow = (estado, progreso) => {
    if (estado === 'Aceptado') {
      return progreso;
    } else if (estado === 'Finalizado' || estado === 'Cancelado') {
      return 100;
    } else {
      return 0; // Valor por defecto
    }
  };

  const getProgressBarLabel = (estado) => {
    if (estado === 'Aceptado') {
      return `${getProgressBarNow(estado, 60)}%`;
    } else if (estado === 'Finalizado' || estado === 'Cancelado') {
      return ''; // No muestra el porcentaje para 'Finalizado' o 'Cancelado'
    } else {
      return `${getProgressBarNow(estado, 60)}%`;
    }
  };

  return (
    <div className="main-container">
      <div className="cursos-list">
        {cursos.map((curso) => (
          <div key={curso.id} className="cursos-preview">
            <div className="servicio-title">
              <h1>{curso.nombreServicio}</h1>
            </div>
            <div className="body-datos">
              <ol className="ul-datos">
                <li>
                  <strong>Docente:</strong> {curso.docente}
                </li>
                <li>
                  <strong>Teléfono:</strong> {curso.telefono}
                </li>
                <li>
                  <strong>Email:</strong> {curso.email}
                </li>
                <li>
                  <strong>Cantidad de clases:</strong> {curso.cantidadClases}
                </li>
                <li>
                  <strong>Tipo:</strong> {curso.tipo}
                </li>
                <li>
                  <strong>Estado:</strong> {curso.estadoServicio}
                </li>
                <br></br>
                <li>
                  <p>Progreso:</p>
                  <div className="progress-bar">
                    <ProgressBar
                      variant={getProgressBarVariant(curso.estadoServicio)}
                      now={getProgressBarNow(
                        curso.estadoServicio,
                        curso.progreso
                      )}
                      label={
                        curso.estadoServicio === 'Finalizado' || curso.estadoServicio === 'Cancelado'
                          ? curso.estadoServicio
                          : `${getProgressBarNow(
                              curso.estadoServicio,
                              curso.progreso
                            )}%`
                          }/>
                  </div>
                </li>
                <br></br>
                <li>
                  <p>Calificación:</p>
                  <div className="rating">
                    <Rating
                      name={`custom-rating-${curso.id}`}
                      value={curso.calificacion}
                      precision={0.5}
                      onChange={(event, newValue) =>
                        handleRatingChange(newValue, curso)
                      }
                      emptyIcon={<StarIcon className="star-empty" />}
                      icon={<StarIcon className="star-filled" />}
                    />
                  </div>
                </li>
              </ol>
            </div>
            <div className="comentario-section">
              {!curso.comentario ? (
                <Button variant="outlined" onClick={() => openCommentDialog(curso)} disabled={curso.estadoServicio === 'Cancelado'}>
                  Agregar Comentario
                </Button>
              ) : (
                <div>
                  <p>Comentario:</p>
                  <p>{curso.comentario}</p>
                  <Button variant="outlined" onClick={() => openCommentDialog(curso)}>
                    Editar Comentario
                  </Button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <Dialog open={commentDialogOpen} onClose={closeCommentDialog}>
        <DialogTitle>Agregar/Editar Comentario</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            multiline
            rows={4}
            label="Comentario"
            variant="outlined"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeCommentDialog} color="secondary">
            Cancelar
          </Button>
          <Button onClick={saveComment} color="primary">
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default CursosInscritos;