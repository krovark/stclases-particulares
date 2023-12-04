import React , { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { useEffect } from 'react';
import './estilos-menu/menu.css';
import Rating from '@mui/material/Rating';
import Button from 'react-bootstrap/Button';
import TextField from '@mui/material/TextField'


function CommentModal({ show, onHide, servicioId }) {
  useEffect(() => {
    if (!show) {
      handleCommentReset();
    }
      if(show) {
          document.body.classList.add('blur-background');
          
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
  const simulatedComments = [];


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

      <TextField autoFocus margin="dense" label="Nombre" type="text" fullWidth variant="outlined"
            value={clienteNombre} onChange={(e) => setClienteNombre(e.target.value)} autoComplete="off" />

        <textarea 
                    value={userComment} 
                    onChange={handleCommentChange} 
                    placeholder="Escribe tu comentario aquí..."
                    maxLength="150" 
                    style={{ width: '500px', marginBottom: '10px' }}
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
                  <Button variant="secondary" onClick={handleCommentReset}>Reset</Button>
              </div>





    {simulatedComments.map((comment, index) => (
        <div key={index} style={{ margin: '10px 0', borderBottom: '1px solid gray', padding: '10px' }}>
            <strong>{comment.username}</strong>: {comment.text} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
            <Rating name="read-only" value={comment.calificacion} readOnly />

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



