import React , { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { useEffect } from 'react';
import './estilos-menu/menu.css';
import Rating from '@mui/material/Rating';
import Button from 'react-bootstrap/Button';


function CommentModal(props) {


    useEffect(() => {
        if(props.show) {
          document.body.classList.add('blur-background');
        } else {
          document.body.classList.remove('blur-background');
        }
        
        return () => { 
          document.body.classList.remove('blur-background'); 
        }; 
      }, [props.show]);

      const simulatedComments = [
        { username: "Usuario1", text: "Este es un comentario.", calificacion: 4 },
        { username: "Usuario2", text: "Bien explicado.", calificacion: 4 },
        { username: "Usuario3", text: "¡Me encanta este contenido!" , calificacion: 2 },
        { username: "Usuario4", text: "Este es un comentario." , calificacion: 5 },
        { username: "Usuario5", text: "Bien explicado." , calificacion: 2 }, 
        { username: "Usuario6", text: "¡Me encanta este contenido!" , calificacion: 1 },
        { username: "Usuario7", text: "Este es un comentario.", calificacion: 3 },
        { username: "Usuario8", text: "Bien explicado." , calificacion: 3 },
        { username: "Usuario9", text: "¡Me encanta este contenido!", calificacion: 2 },
        { username: "Usuario10", text: "Este es un comentario.",  calificacion: 4 },
        { username: "Usuario11", text: "Bien explicado.", calificacion: 4 },
        { username: "Usuario12", text: "¡Me encanta este contenido!", calificacion: 4 },
        { username: "Usuario13", text: "Este es un comentario.", calificacion: 4 },
        { username: "Usuario14", text: "Bien explicado.", calificacion: 3 },
        { username: "Usuario11", text: "Bien explicado." ,calificacion: 2 },
        { username: "Usuario12", text: "¡Me encanta este contenido!" ,calificacion: 2},
        { username: "Usuario13", text: "Este es un comentario." ,calificacion: 2 },
        { username: "Usuario14", text: "Bien explicado.",calificacion: 3 },
        { username: "Usuario11", text: "Bien explicado." ,calificacion: 2},
        { username: "Usuario12", text: "¡Me encanta este contenido!",calificacion: 3 },
 
        
    ];

    const [userComment, setUserComment] = useState('');
    const [userRating, setUserRating] = useState(2);  

    const handleCommentChange = (e) => {
        setUserComment(e.target.value);
    };

    const handleRatingChange = (newRating) => {
        setUserRating(newRating);
    };

    const handleCommentSubmit = () => {
      if (userComment.trim() === '') {
        alert('Por favor escribe un comentario antes de calificar.');
        return;
    }
    };

    const handleCommentReset = () => {
        setUserComment('');
        setUserRating(2);  
    };

  return (
    <Modal
      {...props}
      size="md"
      // size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Comentarios: 
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="custom-dialog-content" style={{ maxHeight: '650px', overflowY: 'auto' }}>


      <textarea 
                    value={userComment} 
                    onChange={handleCommentChange} 
                    placeholder="Escribe tu comentario aquí..."
                    maxLength="150" 
                    style={{ width: '100%', marginBottom: '10px' }}
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



