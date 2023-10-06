import React, { useState } from 'react';
import './profile-style.css';
import avatarImage from '../Img/avatar.png';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import MenuItem from '@mui/material/MenuItem';
import ProfileTest from './PrExpansionC';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import TabsComponent from './TabComponents/mainTabsCompo'



const Profilesite = () => {
  const [perfil, setDatos] = useState([
    { dcName: 'Gaston', dcApellido: 'Bortolin', calificacion: '4', ccreada: '04/8/2022',email:'sapopepe@gmail.com', phonen:'1150591132' ,cclases: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vitae, repudiandae sit', id: 1 },
  ]);

  const [pub_commited, setPublicaciones] = useState([
    { categoria: 'Piano', precio: '50', calificacion: 4 ,cclases: 'Individuales', despcripcion: 'Vamos hacer esto y lo otro', id: 1, freq: 'Semanal', estado:'Activa' ,comentarios: [
        { id: 1, texto: 'Usuario 20: Comentario 1 para Piano' },
        { id: 2, texto: 'Usuario 10: Comentario 2 para Piano' },],},
        
    { categoria: 'Guitarra', precio: '50', calificacion: 5 ,cclases: 'Individual', despcripcion: 'Vamos hacer esto y lo otro', id: 2, freq: 'Unica', estado:'Deshabilitada' ,comentarios: [
        { id: 1, texto:  'Usuario 8: Comentario 1 para Guitarra' },
        { id: 2, texto: 'Usuario 3: Comentario 2 para Guitarra' },
      ], },
    { categoria: 'Cocina', precio: '50', calificacion: 1 ,cclases: 'Grupales', despcripcion: 'Vamos hacer esto y lo otro', id: 3,freq: 'Mensual' ,estado:'Deshabilitada' ,comentarios: [
        { id: 1, texto: 'Usuario 22:  Comentario 1 para Cocina' },
        { id: 2, texto: 'Usuario 12: Comentario 2 para Cocina' },
      ], },
    { categoria: 'Manejo', precio: '50', calificacion: 3 ,cclases: 'Individual', despcripcion: 'Vamos hacer esto y lo otro', id: 4,freq: 'Unica' ,estado:'Activa' ,comentarios: [
        { id: 1, texto: 'Usuario 50: Comentario 1 para Manejo' },
        { id: 2, texto: 'Usuario 40: Comentario 2 para Manejo' },
      ], },
  ]);


  const calcularPromedio = (publicaciones) => {
    let suma = publicaciones.reduce((acumulador, publicacion) => {
        return acumulador + publicacion.calificacion;
    }, 0);

    return suma / publicaciones.length;
  }

const promedio = calcularPromedio(pub_commited);


  return (
    // Contiene toda la pagina de perfil
      <div className="inside-container">
      
        {/* Contiene toda la data del usuario docente */}
        <div className="info-container">
          
          <div className="avatar-container">
            <img src="/2.jpg" alt="Avatar del docente" />
          </div>
          <div className="datos-docente">
            <div className="settings">
          <IconButton>
            <EditIcon />
          </IconButton>
          </div>
            {perfil.map((dcPersona) => (
              <div key={dcPersona.id}>
                <h1>{dcPersona.dcName} {dcPersona.dcApellido}</h1>
               
                <p id='time-stamp'>Cuenta creada: {dcPersona.ccreada}</p>
                <br></br>
                <p>Email: {dcPersona.email} </p>
                <p>Telefono: {dcPersona.phonen} </p>
                <p>Título: {dcPersona.cclases}</p>
                <p>Experiencia: {dcPersona.cclases}</p>
                <p>Promedio: {promedio}</p>
              </div>
            ))}
          </div>
        </div>
        <br></br>
        <br></br>
            <div className="publicaciones-container">
            
            <div className="box-container-historial">
              <TabsComponent/>
              </div>
              
        </div>
        </div>
       
    
       
    
    
  );
};

export default Profilesite;
