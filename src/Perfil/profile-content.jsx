import React, { useState, useEffect } from 'react';
import './profile-style.css';
import avatarImage from '../Img/2.jpg';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import TabsComponent from './TabComponents/mainTabsCompo';

const Profilesite = () => {
  const initialProfileData = [
    { dcName: 'Gaston', dcApellido: 'Bortolin', calificacion: '4', ccreada: '04/8/2022', email: 'sapopepe@gmail.com', phonen: '1150591132', cclases: 'Ingeniero de Alimentos', experiencia: 'Estudié en UADE', id: 1 },
  ];

  const [perfil, setDatos] = useState(initialProfileData);
  const [editMode, setEditMode] = useState(false);
  const [editedData, setEditedData] = useState(null);

  const [editedTitulo, setEditedTitulo] = useState('');
  const [editedExperiencia, setEditedExperiencia] = useState('');

  const [pub_commited, setPublicaciones] = useState([
    {
      categoria: 'Piano',
      precio: '50',
      calificacion: 4,
      cclases: 'Individuales',
      descripcion: 'Vamos a hacer esto y lo otro',
      id: 1,
      freq: 'Semanal',
      estado: 'Activa',
      comentarios: [
        { id: 1, texto: 'Usuario 20: Comentario 1 para Piano' },
        { id: 2, texto: 'Usuario 10: Comentario 2 para Piano' },
      ],
    },
   
  ]);

  const calcularPromedio = (publicaciones) => {
    let suma = publicaciones.reduce((acumulador, publicacion) => {
      return acumulador + publicacion.calificacion;
    }, 0);

    return suma / publicaciones.length;
  }

  const promedio = calcularPromedio(pub_commited);

  useEffect(() => {
    if (editMode) {
      // Copia los datos actuales del perfil a editedData al entrar en modo de edición
      setEditedData(perfil[0]) ;
      setEditedTitulo(perfil[0].cclases);
      setEditedExperiencia(perfil[0].experiencia);
    }
  }, [editMode, perfil]);

  const handleSaveChanges = () => {
    // Aquí puedes enviar los datos editados al servidor o realizar otras acciones necesarias.
    // Actualiza el perfil con los datos de editedData.
    setDatos([{
      ...editedData,
      cclases: editedTitulo,
      experiencia: editedExperiencia,
    }]);
    setEditMode(false); // Desactiva el modo de edición.
  };

  return (
    <div className="inside-container"> 
    <div className="top-site_profile">
      <div className="info-container">
        <div className="avatar-container">
          <img src={avatarImage} alt="Avatar del docente" />
        </div>
        <div className="datos-docente">
          <div className="settings">
            {editMode ? (
              <div>
                <IconButton onClick={() => setEditMode(false)}>
                  Cancelar
                </IconButton>
                <IconButton onClick={() => handleSaveChanges()}>
                  Guardar
                </IconButton>
              </div>
            ) : (
              <IconButton onClick={() => setEditMode(true)}>
                <EditIcon />
              </IconButton>
            )}
          </div>
          {perfil.map((dcPersona) => (
            <div key={dcPersona.id}>
              <h1>{dcPersona.dcName} {dcPersona.dcApellido}</h1>
              <p id='time-stamp'>Cuenta creada: {dcPersona.ccreada}</p>
              <br></br>
              <p>Email: {editMode ? <input type="text" value={editedData?.email || ''} onChange={(e) => setEditedData({ ...editedData, email: e.target.value })} /> : dcPersona.email}</p>
              <p>Telefono: {editMode ? <input type="text" value={editedData?.phonen || ''} onChange={(e) => setEditedData({ ...editedData, phonen: e.target.value })} /> : dcPersona.phonen}</p>
              <p>Título: {editMode ? <input type="text" value={editedTitulo || ''} onChange={(e) => setEditedTitulo(e.target.value)} /> : dcPersona.cclases}</p>
              <p>Experiencia: {editMode ? <input type="text" value={editedExperiencia || ''} onChange={(e) => setEditedExperiencia(e.target.value)} /> : dcPersona.experiencia}</p>
              {!editMode && <p>Calificación: {dcPersona.calificacion}</p>}
            </div>
          ))}
        </div>
      </div>
      <br></br>
      <br></br>
      </div>
      <div className="publicaciones-container">
        <div className="box-container-historial">
          <TabsComponent />
        </div>
      </div>
    </div>
  );
};

export default Profilesite;
