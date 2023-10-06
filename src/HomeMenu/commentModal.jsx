import React from 'react';
import Modal from 'react-bootstrap/Modal';
import { useEffect } from 'react';
import './menu.css';
import Rating from '@mui/material/Rating';



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
        { username: "Usuario13", text: "Este es un comentario.",calificacion: 5 },
        { username: "Usuario14", text: "Bien explicado." ,calificacion: 5 },
        { username: "Usuario1", text: "Este es un comentario.",calificacion: 5 },
        { username: "Usuario2", text: "Bien explicado.",calificacion: 2 },
        { username: "Usuario3", text: "¡Me encanta este contenido!",calificacion: 2 },
        { username: "Usuario4", text: "Este es un comentario.",calificacion: 3 },
        { username: "Usuario5", text: "Bien explicado.",calificacion: 3 },
        { username: "Usuario6", text: "¡Me encanta este contenido!",calificacion: 5 },
        { username: "Usuario7", text: "Este es un comentario." ,calificacion: 1 },
        { username: "Usuario8", text: "Bien explicado.",calificacion: 5 },
        { username: "Usuario9", text: "¡Me encanta este contenido!" },
        { username: "Usuario10", text: "Este es un comentario.",calificacion: 5 },
        { username: "Usuario11", text: "Bien explicado.",calificacion: 5 },
        { username: "Usuario12", text: "¡Me encanta este contenido!" },
        { username: "Usuario13", text: "Este es un comentario." ,calificacion: 3 },
        { username: "Usuario14", text: "Bien explicado." ,calificacion: 1 },
        { username: "Usuario11", text: "Bien explicado." ,calificacion: 1 },
        { username: "Usuario12", text: "¡Me encanta este contenido!" ,calificacion: 1 },
        { username: "Usuario13", text: "Este es un comentario.",calificacion: 3 },
        { username: "Usuario14", text: "Bien explicado." ,calificacion: 1 },
        { username: "Usuario11", text: "Bien explicado.",calificacion: 1 },
        { username: "Usuario12", text: "¡Me encanta este contenido!",calificacion: 3 },
        { username: "Usuario13", text: "Este es un comentario.",calificacion: 1 },
        { username: "Usuario14", text: "Bien explicado." ,calificacion: 3 },
        
    ];

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Comentarios: 
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="custom-dialog-content" style={{ maxHeight: '650px', overflowY: 'auto' }}>
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



