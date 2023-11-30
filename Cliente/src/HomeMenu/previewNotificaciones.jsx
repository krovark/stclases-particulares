import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useEffect } from 'react';
import './estilos-menu/menu.css';


const verComentariosModal = () => {
    const simulatedComments = [
        { username: "Usuario1", text: "Este es un comentario." },
        { username: "Usuario2", text: "Bien explicado." },
        { username: "Usuario3", text: "¡Me encanta este contenido!" },
        { username: "Usuario4", text: "Este es un comentario." },
        { username: "Usuario5", text: "Bien explicado." },
        { username: "Usuario3", text: "¡Me encanta este contenido!" },
        { username: "Usuario4", text: "Este es un comentario." },
        { username: "Usuario5", text: "Bien explicado." },
    ];

    return (
        <div className="custom-dialog-content" style={{ maxHeight: '650px', overflowY: 'auto' }}>
            {simulatedComments.map((comment, index) => (
                <div key={index} style={{ margin: '10px 0', borderBottom: '1px solid gray', padding: '10px' }}>
                    <strong>{comment.username}</strong>: {comment.text}
                </div>
            ))}
        </div>
    );
}

export default verComentariosModal;
