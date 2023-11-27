import React, { useState, useEffect } from 'react';
import '../estiloTabs/profile-style.css';
import avatarImage from '../../../Img/2.jpg';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import TabsComponent from '../mainTabsCompo';

const Profilesite = () => {
 

  const [perfil, setDatos] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editedData, setEditedData] = useState(null);

  const [editedTitulo, setEditedTitulo] = useState('');
  const [editedExperiencia, setEditedExperiencia] = useState('');
  const [editedTelefono, setEditedTelefono] = useState('');
 


  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/users/me', {
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

  

  useEffect(() => {
    if (editMode && perfil) {
    setEditedTelefono(perfil.telefono);
    setEditedTitulo(perfil.titulo);
    setEditedExperiencia(perfil.experiencia);
    }
  }, [editMode, perfil]);




  const handleSaveChanges = async () => {
    const updatedUserData = {
      telefono: editedTelefono,
      titulo: editedTitulo,
      experiencia: editedExperiencia,
    };
  
    try {
      const response = await fetch('http://localhost:4000/api/users/update', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Importante para enviar cookies
        body: JSON.stringify(updatedUserData),
      });
  
      if (!response.ok) {
        throw new Error('Error al actualizar el perfil');
      }
      const updatedProfile = await response.json();
      setDatos(updatedProfile.data); 
      setEditMode(false); 
    } catch (error) {
      console.error('Error:', error);
      
    }
  };

  if (!perfil) {
          
    return <div>Cargando datos del perfil...</div>;
  }

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
