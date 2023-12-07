import React, { useState, useEffect } from 'react';
import '../estiloTabs/profile-style.css';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import TabsComponent from '../selectorTabs';
import CircularProgress from '@mui/material/CircularProgress';


import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import EmailIcon from '@mui/icons-material/Email';
import SmartphoneIcon from '@mui/icons-material/Smartphone';

import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import BadgeIcon from '@mui/icons-material/Badge';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import DoNotDisturbIcon from '@mui/icons-material/DoNotDisturb';
import Rating from '@mui/material/Rating';


const Profilesite = () => {
 

  const [perfil, setDatos] = useState(null);
  const [editMode, setEditMode] = useState(false);
  

  const [editedTitulo, setEditedTitulo] = useState('');
  const [editedExperiencia, setEditedExperiencia] = useState('');
  const [editedTelefono, setEditedTelefono] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      uploadImage(file);
      event.target.value = ''; // Reinicia el input para permitir la recarga del mismo archivo si es necesario
    }
  };


  const uploadImage = async (file) => {
    setLoading(true);
    const formData = new FormData();
    formData.append('imgProfile', file);
    //formData.append('imgProfile', image.data_url);


    try {
      const response = await fetch('http://localhost:4000/api/users/update_image', {
        method: 'PATCH',
        credentials: 'include',
        body: formData,
      });
        console.log("upload imagen?")
      if (!response.ok) {
        throw new Error('Error al actualizar la imagen del perfil');
      }
      
      const updatedProfile = await response.json();
      console.log("Nuevo imgProfile:", updatedProfile.user.imgProfile);
      setDatos(updatedProfile.user);
    } catch (error) {
      console.error('Error:', error);
    }finally {
      setLoading(false); 
    }
  };



  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/users/me', {
          method: 'GET',
          credentials: 'include', 
        });
  
        if (response.ok) {
          const userData = await response.json();
          console.log(userData);
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

  // if (!perfil) {
          
  //   return <div>Cargando datos del perfil...</div>;
  // }

  if (!perfil) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <CircularProgress />
      <p style={{ marginTop: '20px' }}>Cargando datos del perfil...</p>
    </div>
    );
  }

  return (
    <div className="inside-container"> 
    <div className="top-site_profile">
      
      <div className="info-container">
        <div className="avatar-container" onClick={() => document.getElementById('input-image').click()}>
        {loading 
      ? <CircularProgress /> 
      : <img src={`${perfil.imgProfile}?${new Date().getTime()}`} alt="Avatar" />}
          <input
        type="file"
        id="input-image"
        style={{ display: 'none' }}
        onChange={handleFileChange}
        accept="image/*" // Asegúrate de aceptar solo imágenes
      />
      
      </div>
        <div className="datos-docente">
          <div className="settings">
            {editMode ? (
              <div>

              {/* <div className="cancel">
                <DoNotDisturbIcon fontSize="large" onClick={() => setEditMode(false)}>
                  
                </DoNotDisturbIcon>
                </div> */}
                <SaveAsIcon  fontSize="large" onClick={() => handleSaveChanges()}>
                
                </SaveAsIcon>
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
              <p> <EmailIcon fontSize="large" sx={{ mr: 1 }} /> : {perfil.email}</p>
              <p> <SmartphoneIcon fontSize="large"/> : {editMode ? <input type="text" value={editedTelefono || ''} onChange={(e) => setEditedTelefono( e.target.value )} /> : perfil.telefono}</p>
              <p><BadgeIcon fontSize="large"/>: {editMode ? <input type="text" value={editedTitulo || ''} onChange={(e) => setEditedTitulo(e.target.value)} /> : perfil.titulo}</p>
              <p><AccountTreeIcon fontSize="large"/>: {editMode ? <input type="text" value={editedExperiencia || ''} onChange={(e) => setEditedExperiencia(e.target.value)} /> : perfil.experiencia}</p>
              {/* <p> {!editMode && <><ThumbUpIcon fontSize="large"/>: {perfil.calificacionPromedio}</>}</p>
            </div> */}
            {
              !editMode &&
              <div>
                <ThumbUpIcon fontSize="large"/>: <Rating name="read-only" value={perfil.calificacionPromedio} readOnly />
              </div>
            }
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
