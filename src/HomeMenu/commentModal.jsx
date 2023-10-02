import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useEffect } from 'react';
import './menu.css';

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
        { username: "Usuario1", text: "Este es un comentario." },
        { username: "Usuario2", text: "Bien explicado." },
        { username: "Usuario3", text: "¡Me encanta este contenido!" },
        { username: "Usuario4", text: "Este es un comentario." },
        { username: "Usuario5", text: "Bien explicado." },
        { username: "Usuario6", text: "¡Me encanta este contenido!" },
        { username: "Usuario7", text: "Este es un comentario." },
        { username: "Usuario8", text: "Bien explicado." },
        { username: "Usuario9", text: "¡Me encanta este contenido!" },
        { username: "Usuario10", text: "Este es un comentario." },
        { username: "Usuario11", text: "Bien explicado." },
        { username: "Usuario12", text: "¡Me encanta este contenido!" },
        { username: "Usuario13", text: "Este es un comentario." },
        { username: "Usuario14", text: "Bien explicado." },
        { username: "Usuario11", text: "Bien explicado." },
        { username: "Usuario12", text: "¡Me encanta este contenido!" },
        { username: "Usuario13", text: "Este es un comentario." },
        { username: "Usuario14", text: "Bien explicado." },
        { username: "Usuario11", text: "Bien explicado." },
        { username: "Usuario12", text: "¡Me encanta este contenido!" },
        { username: "Usuario13", text: "Este es un comentario." },
        { username: "Usuario14", text: "Bien explicado." },
        { username: "Usuario1", text: "Este es un comentario." },
        { username: "Usuario2", text: "Bien explicado." },
        { username: "Usuario3", text: "¡Me encanta este contenido!" },
        { username: "Usuario4", text: "Este es un comentario." },
        { username: "Usuario5", text: "Bien explicado." },
        { username: "Usuario6", text: "¡Me encanta este contenido!" },
        { username: "Usuario7", text: "Este es un comentario." },
        { username: "Usuario8", text: "Bien explicado." },
        { username: "Usuario9", text: "¡Me encanta este contenido!" },
        { username: "Usuario10", text: "Este es un comentario." },
        { username: "Usuario11", text: "Bien explicado." },
        { username: "Usuario12", text: "¡Me encanta este contenido!" },
        { username: "Usuario13", text: "Este es un comentario." },
        { username: "Usuario14", text: "Bien explicado." },
        { username: "Usuario11", text: "Bien explicado." },
        { username: "Usuario12", text: "¡Me encanta este contenido!" },
        { username: "Usuario13", text: "Este es un comentario." },
        { username: "Usuario14", text: "Bien explicado." },
        { username: "Usuario11", text: "Bien explicado." },
        { username: "Usuario12", text: "¡Me encanta este contenido!" },
        { username: "Usuario13", text: "Este es un comentario." },
        { username: "Usuario14", text: "Bien explicado." },
        
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
      <Modal.Body className="custom-dialog-content" style={{ maxHeight: '700px', overflowY: 'auto' }}>
    {simulatedComments.map((comment, index) => (
        <div key={index} style={{ margin: '10px 0', borderBottom: '1px solid gray', padding: '10px' }}>
            <strong>{comment.username}</strong>: {comment.text}
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