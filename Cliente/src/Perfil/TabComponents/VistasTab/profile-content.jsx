import React, { useState, useEffect } from 'react';
import '../estiloTabs/profile-style.css';
import avatarImage from '../../../Img/2.jpg';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import TabsComponent from '../mainTabsCompo';

const Profilesite = () => {
  const initialProfileData = [


    { "nombre": "Santiago",
    "apellido": "Gonzalez",
    "email": "santglez51@gmail.com",
    "telefono": "01149401031",
    "password": "...",
    "titulo": "",
    "experiencia": "111",
    "calificacionPromedio": null,},



  ];

  const [perfil, setDatos] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editedData, setEditedData] = useState(null);

  const [editedTitulo, setEditedTitulo] = useState('');
  const [editedExperiencia, setEditedExperiencia] = useState('');

 
  // useEffect(() => {
  //   if (editMode) {
  //     // Copia los datos actuales del perfil a editedData al entrar en modo de edición
  //     setEditedData(perfil[0]) ;
  //     setEditedTitulo(perfil[0].cclases);
  //     setEditedExperiencia(perfil[0].experiencia);
  //   }
  // }, [editMode, perfil]);

  // const handleSaveChanges = () => {
  //   // Aquí puedes enviar los datos editados al servidor o realizar otras acciones necesarias.
  //   // Actualiza el perfil con los datos de editedData.
  //   setDatos([{
  //     ...editedData,
  //     cclases: editedTitulo,
  //     experiencia: editedExperiencia,
  //   }]);
  //   setEditMode(false); // Desactiva el modo de edición.
  // };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('http://192.168.0.103:4000/api/users/profile', {
          method: 'GET',
          credentials: 'include', 
        });
  
        if (response.ok) {
          const userData = await response.json();
          
          setDatos(userData);
        }
        
        else {
          console.error('Error al obtener los datos del usuario');
        }
      } catch (error) {
        console.error('Error al conectar con el servidor:', error);
      }
    };
  
    fetchUserData();
  }, []);

  if (!perfil) {
          
    return <div>Cargando datos del perfil...</div>;
  }

  const handleSaveChanges = async () => {
    const updatedUserData = {
      _id: 'elIdDelUsuario', // Asegúrate de tener el ID del usuario
      nombre: editedData.nombre,
      apellido: editedData.apellido,
      // ... otros campos
    };
  
    try {
      const response = await fetch('http://192.168.0.103:4000/api/users/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Importante para enviar cookies
        body: JSON.stringify(updatedUserData),
      });
  
      if (response.ok) {
        const data = await response.json();
        // Actualizar el estado del perfil aquí
      } else {
        // Manejar errores aquí
      }
    } catch (error) {
      console.error('Error al actualizar el perfil:', error);
      // Manejar errores de red aquí
    }
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
         
            <div >
              <h1>{perfil.nombre} {perfil.apellido}</h1>
              {/* <p id='time-stamp'>Cuenta creada: {dcPersona.ccreada}</p> */}
              <br></br>
              <p>Email: {perfil.email}</p>
              <p>Telefono: {editMode ? <input type="text" value={editedData?.phonen || ''} onChange={(e) => setEditedData({ ...editedData, phonen: e.target.value })} /> : perfil.telefono}</p>
              <p>Título: {editMode ? <input type="text" value={editedTitulo || ''} onChange={(e) => setEditedTitulo(e.target.value)} /> : perfil.titulo}</p>
              <p>Experiencia: {editMode ? <input type="text" value={editedExperiencia || ''} onChange={(e) => setEditedExperiencia(e.target.value)} /> : perfil.experiencia}</p>
              {!editMode && <p>Calificación: {perfil.calificacionPromedio}</p>}
            </div>
         
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
