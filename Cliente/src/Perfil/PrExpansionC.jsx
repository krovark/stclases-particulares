import React, { useState, useEffect } from 'react';
import './TabComponents/estiloTabs/profile-style.css';
//import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import Select from '@mui/material/Select';



export default function ProfileTest({ publicacion, postId, fetchPublicaciones ,onAcceptComment, onDeleteComment }) {
  //const [expanded, setExpanded] = React.useState(false);
  const [editMode, setEditMode] = useState(false); // Estado para controlar el modo de edición
  const [editedData, setEditedData] = useState({}); // Estado para rastrear los valores editados
  const [anchorEl, setAnchorEl] = useState(null); // Definir anchorEl
  const [isModalOpen, setIsModalOpen] = useState(false);
  

// ESCUCHA EL ICONO DE SETTINGS
//   
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

//  ESTADO PARA EL SETTING ICONS
//   
  const handleMenuClose = () => {
    setAnchorEl(null);
    
  };

  const handleEditClick = () => {
    
    setEditMode(true);
    handleMenuClose();
  };

//  CAMBIAR ESTADO A ACTIVO
//   
  const handleActivateClick = () => {
    
    if (!postId) {
      console.error('ID del posteo no definido');
      return;
      
    }
  
    const nuevoEstado = 'activo';
  
    fetch(`http://localhost:4000/api/servicios/cambiarestado/${postId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', 
      body: JSON.stringify({ estado: nuevoEstado }), // Cambiar el estado a "activo"
    })
      .then((response) => {
        if (response.ok) {
          
          
          // También puedes actualizar el estado local del posteo si lo deseas
          // setPublicacion({ ...publicacion, estado: nuevoEstado });
          fetchPublicaciones();
        } else {
          
          console.error('Error al cambiar el estado del posteo a "activo"');
        }
      })
      .catch((error) => {
        console.error('Error al cambiar el estado del posteo a "activo"', error);
      });
  
    handleMenuClose();
  };

//  DESACTIVAR PUBLICACION
//   
  const handleDisableClick = () => {
  
  if (!postId ) {
    console.error('ID del posteo no definido');
    return;
  }

  const nuevoEstado = 'desactivado';

    fetch(`http://localhost:4000/api/servicios/cambiarestado/${postId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include', 
    body: JSON.stringify({ estado: nuevoEstado }), // Aquí pasas el nuevo estado en el cuerpo de la solicitud
  })
    .then((response) => {
      if (response.ok) {
        
        
        // También puedes actualizar el estado local del posteo si lo deseas
        // setPublicacion({ ...publicacion, estado: nuevoEstado });
        fetchPublicaciones();
      } else {
        // Maneja errores aquí si la solicitud no es exitosa
        console.error('Error al cambiar el estado del posteo');
      }
    })
    .catch((error) => {
      console.error('Error al cambiar el estado del posteo', error);
    });
    
    handleMenuClose();
  };

//   ELIMINAR PUBLICACION 
// 

  const handleDeleteClick = () => {
    if (!postId) {
      console.error('ID del posteo no definido');
      return;
    }
  
    fetch(`http://localhost:4000/api/servicios/borrar/${postId}`, {
      method: 'DELETE',
      credentials: 'include', 
    })
      .then((response) => {
        if (response.ok) {
          
         
          fetchPublicaciones();
        } else {
          console.error('Error al eliminar la publicación');
        }
      })
      .catch((error) => {
        console.error('Error al eliminar la publicación', error);
      });
  
    handleMenuClose();
  };

  const handleSaveClick = () => {
    if (!postId) {
      console.error('ID del posteo no definido');
      return;
    }
  
    // Preparar los datos a enviar al servidor, puedes usar el objeto editedData
    const dataToUpdate = { ...editedData };
    console.log("data editada", editedData);
    fetch(`http://localhost:4000/api/servicios/editServicio/${postId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(dataToUpdate), // Enviar los datos editados al servidor
    })
      .then((response) => {
        if (response.ok) {
          // Datos editados con éxito en el servidor
          // Aquí puedes realizar cualquier actualización adicional necesaria en el cliente
          fetchPublicaciones();
        } else {
          console.error('Error al guardar los datos editados');
        }
      })
      .catch((error) => {
        console.error('Error al guardar los datos editados', error);
      });
  
    setEditMode(false); // Salir del modo de edición
  };

  const handleCancelClick = () => {
    // Cancela la edición y restaurar los valores originales
    setEditedData({});
    setEditMode(false);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedData({ ...editedData, [name]: value });
  };


  return (
    <div>
      <Card sx={{ maxWidth: 1000 }}>
        <CardHeader
          action={
            <React.Fragment>
              {editMode ? (
                <div>
                  <IconButton aria-label="save" onClick={handleSaveClick}>
                    <SaveIcon />
                  </IconButton>
                  <IconButton aria-label="cancel" onClick={handleCancelClick}>
                    <CancelIcon />
                  </IconButton>
                </div>
              ) : (
                <IconButton aria-label="settings" onClick={handleMenuOpen}>
                  <MoreVertIcon />
                </IconButton>
              )}
              <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                  >
                    {editMode ? (
                      <MenuItem onClick={handleCancelClick}>Cancelar</MenuItem>
                    ) : (
                      <MenuItem onClick={handleEditClick}>Modificar</MenuItem>
                    )}
                    {publicacion.estado.trim() === 'desactivado' && (
                      <MenuItem onClick={handleActivateClick}>Activar</MenuItem>
                      
                    )}
                    {publicacion.estado.trim() === 'activo' && (
                        <MenuItem onClick={handleDisableClick}>Desactivar</MenuItem>
                    )}
                    <MenuItem onClick={handleDeleteClick}>Eliminar</MenuItem>
                  </Menu>
            </React.Fragment>
          }
          title={editMode ? (
            <TextField
              name="nombre"
              label="nombre"
              value={editedData.nombre || publicacion.nombre}
              onChange={handleInputChange}
              placeholder='Curso'
            />
          ) : (
            publicacion.nombre
          )}
          subheader={publicacion.estado}
        />

        <CardContent id="card-body">
          {editMode ? (
            
            <Select
                  name="tipoClase"
                  
                  value={editedData.tipoClase || publicacion.tipoClase}
                  onChange={handleInputChange}
                  placeholder='Tipo de clase'
                  style={{ width: '250px' , marginTop: '10px' }}
                >
        <MenuItem value="Individual">Individual</MenuItem>
        <MenuItem value="Grupal">Grupal</MenuItem>        
      </Select>
          ) : (
            <h5>Clases: {publicacion.tipoClase}</h5>
          )}
          {editMode ? (
                  <Select
                  name="frecuencia"
                  
                  value={editedData.frecuencia || publicacion.frecuencia}
                  onChange={handleInputChange}
                  placeholder='Frecuencia'
                  style={{ width: '250px' , marginTop: '10px' }}
                >
                    <MenuItem value="Individual">Única</MenuItem>
                    <MenuItem value="Semanal">Semanal</MenuItem>
                    <MenuItem value="Mensual">Mensual</MenuItem>        
                  </Select>
          ) : (
            <h5>Frecuencia: {publicacion.frecuencia}</h5>
          )}
          {editMode ? (
            <TextField
              name="duracion"
              label="duracion"
              value={editedData.duracion || publicacion.duracion}
              onChange={handleInputChange}
              placeholder='Duracion en minutos'
              style={{ width: '250px' , marginTop: '10px' }}
            />
            
          ) : (
            <h5>Duración: {publicacion.duracion}</h5>
          )}
          {editMode ? (
            <TextField
              name="costo"
              label="costo"
              value={editedData.costo || publicacion.costo}
              onChange={handleInputChange}
              placeholder='Precio'
              style={{ width: '300px' , marginTop: '10px', marginBottom: '10px' }}
              
            />
            
          ) : (
            <h5>Precio hora: {publicacion.costo}</h5>
          )}
          <br></br>
          {editMode ? (
            <TextField
              name="descripcion"
              label="descripcion"
              value={editedData.descripcion || publicacion.descripcion}
              onChange={handleInputChange}
              placeholder='Frecuencia'
            />
          ) : (
            <h6>Descripcion: {publicacion.descripcion}</h6>
          )}
        </CardContent>

        
      </Card>
    </div>
  );
}
