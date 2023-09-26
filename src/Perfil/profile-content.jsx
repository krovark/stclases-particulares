import React, { useState } from 'react';
import NavigationBar from '../HomeMenu/NavBar';
import './profile-style.css';
import avatarImage from '../Img/avatar.png';
import CommentBox from'./Comment_Box/master-comments';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Rating from '@mui/material/Rating';
import ProfileTest from './profile-test'

const Profilesite = () => {
  const [perfil, setDatos] = useState([
    { dcName: 'Gaston', dcApellido: 'Bortolin', calificacion: '4', ccreada: '04/8/2022', cclases: '3', id: 1 },
  ]);

  const [pub_commited, setPublicaciones] = useState([
    { categoria: 'Piano', precio: '50', cclases: 'Individuales', despcripcion: 'Vamos hacer esto y lo otro', id: 1, calificacion:'4', estado:'Activa' ,comentarios: [
        { id: 1, texto: 'Usuario 20: Comentario 1 para Piano' },
        { id: 2, texto: 'Usuario 10: Comentario 2 para Piano' },],},
        
    { categoria: 'Guitarra', precio: '50', cclases: 'Individual', despcripcion: 'Vamos hacer esto y lo otro', id: 2, calificacion:'5', estado:'Deshabilitada' ,comentarios: [
        { id: 1, texto:  'Usuario 8: Comentario 1 para Guitarra' },
        { id: 2, texto: 'Usuario 3: Comentario 2 para Guitarra' },
      ], },
    { categoria: 'Cocina', precio: '50', cclases: 'Grupales', despcripcion: 'Vamos hacer esto y lo otro', id: 3,calificacion:'3',estado:'Deshabilitada' ,comentarios: [
        { id: 1, texto: 'Usuario 22:  Comentario 1 para Cocina' },
        { id: 2, texto: 'Usuario 12: Comentario 2 para Cocina' },
      ], },
    { categoria: 'Manejo', precio: '50', cclases: 'Individual', despcripcion: 'Vamos hacer esto y lo otro', id: 4,calificacion:'2',estado:'Activa' ,comentarios: [
        { id: 1, texto: 'Usuario 50: Comentario 1 para Manejo' },
        { id: 2, texto: 'Usuario 40: Comentario 2 para Manejo' },
      ], },
  ]);

  return (
    // Contiene toda la pagina de perfil
    <div className="big-profile-container"> 
      <div className="inside-container">
        {/* Contiene toda la data del usuario docente */}
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
                <p>Título: {dcPersona.cclases}</p>
              </div>
            ))}
          </div>
        </div>
            {/* Hasta aca */}
            
            {/* Aca este es el container de todas las publicaciones del docente */}
            <div className="publicaciones-container">
    {pub_commited.map((dcPost) => (
        <div className="perfil-preview" key={dcPost.id}>
            <ProfileTest publicacion={dcPost}></ProfileTest>
            {/* <h1 id='category'>{dcPost.categoria}</h1>
            <p>Clases: {dcPost.cclases}</p>
            <p>Calificación: {dcPost.calificacion}</p>
            <p>Descripcion: {dcPost.despcripcion}</p> */}
        </div>
    ))}
        </div>
        </div>
       </div>
    
       
    
    
  );
};

export default Profilesite;
