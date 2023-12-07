import React , { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { useEffect } from 'react';
import './estilos-menu/menu.css';
import Rating from '@mui/material/Rating';
import Button from 'react-bootstrap/Button';
import TextField from '@mui/material/TextField'
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';



function CommentModal({ show, onHide, servicioId }) {
  console.log('Servicio ID:', servicioId);
  useEffect(() => {
    if (!show) {
      handleCommentReset();
    }
      if(show) {
          document.body.classList.add('blur-background');
          fetchComentarios();
          
      } else {
          document.body.classList.remove('blur-background');
      }
      
      return () => { 
          document.body.classList.remove('blur-background'); 
      }; 
   
  }, [show]);

  const [userComment, setUserComment] = useState('');
  const [userRating, setUserRating] = useState(2);
  const [clienteNombre, setClienteNombre] = useState('');

  const handleCommentChange = (e) => {
      setUserComment(e.target.value);
  };

  const handleRatingChange = (newRating) => {
      setUserRating(newRating);
  };

  const handleCommentSubmit = async () => {
      if (userComment.trim() === '') {
          alert('Por favor escribe un comentario antes de calificar.');


          return;
      }


      try {
          const response = await fetch(`http://localhost:4000/api/comentarios/comentar/${servicioId}`, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                comentarioCliente: clienteNombre,
                  comentario: userComment, 
                  calificacion: userRating 
              })
          });

          if (!response.ok) {
              throw new Error('Error al enviar el comentario');
          }

          
          alert('Comentario enviado con éxito. Se encuentra en pendiente de moderación');
          
   
          setClienteNombre('');
          setUserComment('');
          setUserRating(2);  
      } catch (error) {

          alert('Hubo un problema para crear el comentarios. Aguarde unos minutos');
 
      }
  };

  const handleCommentReset = () => {
      setClienteNombre('');
      setUserComment('');
      setUserRating(2);  
  };

  // Simulated comments (you can replace this with real comments later)
  
  const [comentarios, setComentarios] = useState([]);

  const fetchComentarios = async () => {
    try {
      
      const url = `http://localhost:4000/api/comentarios/comentario/${servicioId}?estado=aprobado`;
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      if (!response.ok) {
        throw new Error('Error al cargar comentarios');
      }
      const data = await response.json();
      setComentarios(data.comentarios);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <Modal
    show={show} 
    onHide={onHide}
      size="md"
      
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Comentarios: 
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="custom-dialog-content" style={{ maxHeight: '650px', overflowY: 'auto' }}>

      <TextField autoFocus margin="dense" placeholder="Nombre" type="text"  variant="outlined" sx={{ width: '100%', mb: 1 }}
            value={clienteNombre} onChange={(e) => setClienteNombre(e.target.value)} autoComplete="off" />



        <TextField
          sx={{ width: '100%', mb: 1 }}
          
           
          value={userComment}
          onChange={handleCommentChange}
          placeholder="Escribe tu comentario aquí..."
          inputProps={{ maxLength: 100 }} 
          variant="outlined"
          
        />

                Califica: 
                <Rating
                     
                    name="simple-controlled"
                    value={userRating}
                    onChange={(event, newValue) => handleRatingChange(newValue)}
                    
                />
              
              <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'center' }}>
              <br></br>
              <br></br>
                  <Button onClick={handleCommentSubmit} style={{ marginRight: '10px' }}>Comentar</Button>
                  <Button variant="warning" onClick={handleCommentReset}>Reset</Button>
              </div>





   {comentarios.map((comentario, index) => (
  <div key={index} style={{ margin: '10px 0', borderBottom: '1px solid gray', padding: '10px' }}>
    <strong>{comentario.comentarioCliente}</strong>: {comentario.comentario} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
    <Rating name="read-only" value={comentario.calificacion} readOnly />

        </div>
    ))}
</Modal.Body>
      <Modal.Footer>
        {/* <Button onClick={props.onHide}>Close</Button> */}
      </Modal.Footer>
    </Modal>
  );
}

export default CommentModal;



