import React, { useState } from 'react';
import NavigationBar from '../HomeMenu/NavBar';
import './profile-style.css'
import avatarImage from '../Img/avatar.png';

const Profilesite = () => {

    const [perfil, setDatos] = useState([
        { dcName: 'Gaston', dcApellido: 'Bortolin', calificacion: '4', ccreada: '04/8/2022', calificacion: '3', titulo: 'bueno bueno', id: 1 },
    ]);

    const [pub_commited, setPublicaciones] = useState([
        { categoria: 'Piano', precio: '50', titulo: 'bueno bueno', despcripcion: 'Vamos hacer esto y lo otro' ,id: 1 },
        { categoria: 'Guitarra', precio: '50', titulo: 'bueno bueno', despcripcion: 'Vamos hacer esto y lo otro' ,id: 2 },
        { categoria: 'Cocina', precio: '50', titulo: 'bueno bueno', despcripcion: 'Vamos hacer esto y lo otro' ,id: 3 },
        { categoria: 'Manejo', precio: '50', titulo: 'bueno bueno', despcripcion: 'Vamos hacer esto y lo otro' ,id: 4 },
    ]);

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
                                
                                {/* Mejorar el box de los datos del docente 
                                Agregar un box vacio gris con un signo más para agregar nuevas clases.
                                Que popee un formulario con los datos a llenar */}


                      <div className="publicaciones-container">
                        <div className="perfil-list">
                            {pub_commited.map((dcPost) => (
                                <div className="perfil-preview">
                                    <div key={dcPost.id}>
                                                                   
                                        <h1 id='category'>{dcPost.categoria}</h1>
                                        <p>Clases: {dcPost.cclases}</p>
                                        <p>Calificación: {dcPost.calificacion}</p>
                                        <p>Descripcion: {dcPost.despcripcion} </p>
                                        
                                        {/* Posibilidad de borrar, despublicar clase. Alguna animacion de tres puntitos que te de esas opciones */}
                                        <p id='comments'>Comentarios: {dcPost.comentario}</p>
                                        {/* Falta agregar el box de comentarios acumulados de los alumnos que contrataron el Servicio */}


                                    </div>
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
}
 
export default Profilesite;
