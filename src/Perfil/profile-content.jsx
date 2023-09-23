import React, { useState } from 'react';
import NavigationBar from '../HomeMenu/NavBar';
import './profile-style.css';
import avatarImage from '../Img/avatar.png';
import CommentBox from './Comment_Box/master-comments';

const Profilesite = () => {
  const [perfil, setDatos] = useState([
    { dcName: 'Gaston', dcApellido: 'Bortolin', calificacion: '4', ccreada: '04/8/2022', titulo: 'bueno bueno', id: 1 },
  ]);

  const [pub_commited, setPublicaciones] = useState([
    { categoria: 'Piano', precio: '50', titulo: 'bueno bueno', despcripcion: 'Vamos hacer esto y lo otro', id: 1, comentarios: [
        { id: 1, texto: 'Comentario 1 para Piano' },
        { id: 2, texto: 'Comentario 2 para Piano' },],},
        
    { categoria: 'Guitarra', precio: '50', titulo: 'bueno bueno', despcripcion: 'Vamos hacer esto y lo otro', id: 2, comentarios: [
        { id: 1, texto: 'Comentario 1 para Piano' },
        { id: 2, texto: 'Comentario 2 para Piano' },
      ], },
    { categoria: 'Cocina', precio: '50', titulo: 'bueno bueno', despcripcion: 'Vamos hacer esto y lo otro', id: 3, comentarios: [
        { id: 1, texto: 'Comentario 1 para Piano' },
        { id: 2, texto: 'Comentario 2 para Piano' },
      ], },
    { categoria: 'Manejo', precio: '50', titulo: 'bueno bueno', despcripcion: 'Vamos hacer esto y lo otro', id: 4, comentarios: [
        { id: 1, texto: 'Comentario 1 para Piano' },
        { id: 2, texto: 'Comentario 2 para Piano' },
      ], },
  ]);

  const groupedComments = pub_commited.reduce((result, comment) => {
    if (!result[comment.categoria]) {
      result[comment.categoria] = [];
    }
    result[comment.categoria].push(comment);
    return result;
  }, {});

  return (
    <div className="big-profile-container">
      <div className="inside-container">
        <div className="info-container">
          <div className="avatar-container">
            <img src={avatarImage} alt="Avatar del docente" />
          </div>
          <div className="datos-docente">
            {perfil.map((dcPersona) => (
              <div key={dcPersona.id}>
                <h2>{dcPersona.dcName} {dcPersona.dcApellido}</h2>
                <p id='time-stamp'>Cuenta creada: {dcPersona.ccreada}</p>
                <p>Calificación: {dcPersona.calificacion}</p>
                <p>Título: {dcPersona.titulo}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="publicaciones-container">
          <div className="perfil-list">
            {pub_commited.map((dcPost) => (
              <div className="perfil-preview" key={dcPost.id}>
                <h1 id='category'>{dcPost.categoria}</h1>
                <p>Clases: {dcPost.cclases}</p>
                <p>Calificación: {dcPost.calificacion}</p>
                <p>Descripcion: {dcPost.despcripcion} </p>
                <h3>Comentarios:</h3>
                  {dcPost.comentarios.map((comentario) => (
                    <p key={comentario.id}>{comentario.texto}</p>
                  ))}
              </div>
            ))}
          </div>
        </div>

        <div className="doc-courses">
          {/* Aquí puedes agregar contenido relacionado con los cursos del docente */}
        </div>
      </div>
    </div>
  );
};

export default Profilesite;
