import React, { useState } from 'react';
import '../estiloTabs/profile-style.css';
import MenuItem from '@mui/material/MenuItem';
import ProfileTest from '../../PrExpansionC';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

export function FormDialog() {
    const [open, setOpen] = React.useState(false);
    const [tipo, setTipo] = useState(''); // Estado para rastrear el valor del tipo
    const [frecuencia, setFrecuencia] = useState(''); // Estado para rastrear el valor de la frecuencia
    const [descripcion, setDescripcion] = useState('');
    const [categoria, setCategoria] = useState('');
    const [costo, setCosto] = useState('');
    const [duracion, setDuracion] = useState('');

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  
    const handleTipoChange = (event) => {
      setTipo(event.target.value); // Actualiza el valor del tipo cuando cambia
    };
  
    const handleFrecuenciaChange = (event) => {
      setFrecuencia(event.target.value); // Actualiza el valor de la frecuencia cuando cambia
    };
  
    const handleDescripcionChange = (event) => {
      setDescripcion(event.target.value);
    };

    const handleCategoriaChange = (event) => {
      setCategoria(event.target.value);
  };
  
  const handleCostoChange = (event) => {
      setCosto(event.target.value);
  };

  const handleDuracionChange = (event) => {
    setDuracion(event.target.value);
};

    const handleAccept = async () => {
      
      if (!categoria || !tipo || !frecuencia || !costo || !descripcion || !duracion) {
        alert("Por favor, completa todos los campos."); 
        return;
      }

      const data = {
        nombre: categoria, 
        tipoClase: tipo,
        frecuencia: frecuencia,
        costo: costo,
        descripcion: descripcion,
        duracion: duracion,
        estado: 'activo' // Siempre se establece como 'activo' por defecto
        
    };
    

      try {
        const response = await fetch('http://localhost:4000/api/servicios/crearsv', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include', // Importante para enviar cookies
          body: JSON.stringify(data),
        });
    
        if (response.ok) {
          const responseData = await response.json();
          console.log("Servicio creado exitosamente", responseData);
          setCategoria('');
          setTipo('');
          setFrecuencia('');
          setCosto('');
          setDescripcion('');
          setDuracion(''); 
      } else {
          console.error('Error en la respuesta:', response);
          const errorData = await response.json();
          console.error('Detalle del error:', errorData);
      }
      } catch (error) {
        console.error('Error crear el curso', error);
        // Manejar errores de red aquí
      }
    };
  
    
    const handleFormSubmit = async (event) => {
      console.log("Hola?")
      event.preventDefault(); // Prevenir la recarga de la página
      await handleAccept(); // Llamar a handleAccept para manejar el envío de datos
  };


  return (
      <div>
        <Button variant="contained" onClick={handleClickOpen} sx={{fontSize: "large",}} >
          Crear curso  
        </Button>
        <Dialog open={open} onClose={handleClose}>
        <form onSubmit={handleFormSubmit}>
          <DialogContent>
            <DialogContentText>
              
            </DialogContentText>
            <TextField
        autoFocus
        margin="dense"
        id="nombre"
        label="Categoría"
        type="text"
        value={categoria}
        fullWidth
        variant="outlined"
        onChange={handleCategoriaChange}
      />
      <TextField
        margin="dense"
        id="tipoClase"
        label="Tipo"
        select
        fullWidth
        value={tipo}
        onChange={handleTipoChange}
        variant="outlined"
        InputProps={{
          
        }}
      >
        <MenuItem value="Individual">Individual</MenuItem>
        <MenuItem value="Grupal">Grupal</MenuItem>
      </TextField>
      <TextField
              margin="dense"
              id="frecuencia"
              label="Frecuencia"
              select
              fullWidth
              variant="outlined"
              value={frecuencia} // Valor seleccionado para frecuencia
              onChange={handleFrecuenciaChange} // Manejar cambios en el valor de la frecuencia
            >
              <MenuItem value="Única">Única</MenuItem>
              <MenuItem value="Semanal">Semanal</MenuItem>
              <MenuItem value="Mensual">Mensual</MenuItem>
            </TextField>
            <TextField
        autoFocus
        margin="dense"
        id="costo"
        label="Costo por clase"
        type="text"
        value={costo}
        fullWidth
        variant="outlined"
        onChange={handleCostoChange}
      />
       <TextField
              margin="dense"
              id="duracion"
              label="Duracion"
              placeholder='Duracion en minutos'
              rows={4} 
              fullWidth
              variant="outlined" // Puedes usar outlined para un borde visible o standard para un borde más delgado
              value={duracion}
              onChange={handleDuracionChange}
            />
      <TextField
              margin="dense"
              id="descripcion"
              label="Descripción"
              //multiline // Esto habilita el modo multilinea
              rows={4} // Puedes ajustar la cantidad de filas que deseas mostrar
              fullWidth
              variant="outlined" // Puedes usar outlined para un borde visible o standard para un borde más delgado
              value={descripcion}
              onChange={handleDescripcionChange}
            />
            
    </DialogContent>
          
          <DialogActions>
            <Button variant="outlined" onClick={handleClose}>Cancelar</Button>
            {/* <Button type="submit" variant="contained" onClick={handleAccept}>Aceptar</Button> */}
            <Button type="submit" variant="contained" onClick={handleClose}>Aceptar</Button>
          </DialogActions>
          </form>
        </Dialog>
      </div>
    );
  }
  


const PostSite = () => {
    
      const [pub_commited, setPublicaciones] = useState([
        { 
          categoria: 'Buceo', 
          precio: '50', 
          calificacion: 4 ,
          cclases: 'Individuales', 
          despcripcion: 'Vamos hacer esto y lo otro', 
          id: 1, 
          freq: 'Semanal', 
          estado:'Activa', 
          comentarios: [
            { id: 1, texto: 'Usuario 20: Comentario 1 para Piano' },
            { id: 2, texto: 'Usuario 10: Comentario 2 para Piano' },
            { id: 3, texto: 'Usuario 18: Comentario 3 para Piano' },
            { id: 4, texto: 'Usuario 12: Comentario 4 para Piano' },
            { id: 5, texto: 'Usuario 26: Comentario 5 para Piano' },
            { id: 6, texto: 'Usuario 24: Comentario 6 para Piano' },
            { id: 7, texto: 'Usuario 23: Comentario 7 para Piano' },
            { id: 8, texto: 'Usuario 17: Comentario 8 para Piano' },
            { id: 9, texto: 'Usuario 27: Comentario 9 para Piano' },
            { id: 10, texto: 'Usuario 14: Comentario 10 para Piano' },
          ]
        },
            
        { 
          categoria: 'Guitarra', 
          precio: '50', 
          calificacion: 5 ,
          cclases: 'Individual', 
          despcripcion: 'Vamos hacer esto y lo otro', 
          id: 2, 
          freq: 'Unica', 
          estado:'Deshabilitada',
          comentarios: 
          [
            { id: 1, texto:  'Usuario 8: Comentario 1 para Guitarra' },
            { id: 2, texto: 'Usuario 3: Comentario 2 para Guitarra' },
          ]
        },
        { 
          categoria: 'Cocina', 
          precio: '50', 
          calificacion: 1 ,
          cclases: 'Grupales', 
          despcripcion: 'Vamos hacer esto y lo otro', 
          id: 3,
          freq: 'Mensual',
          estado:'Deshabilitada',
          comentarios: 
          [
            { id: 1, texto: 'Usuario 22:  Comentario 1 para Cocina' },
            { id: 2, texto: 'Usuario 12: Comentario 2 para Cocina' },
          ]
        },
        { 
          categoria: 'Manejo', 
          precio: '50', 
          calificacion: 3 ,
          cclases: 'Individual', 
          despcripcion: 'Vamos hacer esto y lo otro', 
          id: 4,
          freq: 'Unica' ,
          estado:'Activa' ,
          comentarios: 
          [
            { id: 1, texto: 'Usuario 50: Comentario 1 para Manejo' },
            { id: 2, texto: 'Usuario 40: Comentario 2 para Manejo' },
          ] 
        },
      ]);


    // Función para aceptar un comentario en una publicación específica
    const acceptComment = (postId, commentId) => {
      setPublicaciones((prevState) =>
        prevState.map((post) => {
          if (post.id === postId) {
            return {
              ...post,
              comentarios: post.comentarios.map((comment) => {
                if (comment.id === commentId) {
                  return { ...comment, aceptado: true };
                }
                return comment;
              }),
            };
          }
          return post;
        })
      );
    };

    // Función para eliminar un comentario en una publicación específica
    const deleteComment = (postId, commentId) => {
      setPublicaciones((prevState) =>
        prevState.map((post) => {
          if (post.id === postId) {
            return {
              ...post,
              comentarios: post.comentarios.filter(
                (comment) => comment.id !== commentId
              ),
            };
          }
          return post;
        })
      );
    };
    
    return ( 

      <div className="posteos-hechos">
      <div className="agregar-publi">
        <FormDialog />
      </div>
      <div className="posteos-container">
      {pub_commited.map((dcPost) => (
        <div className="perfil-preview" key={dcPost.id}>
          <ProfileTest
            publicacion={dcPost}
            onAcceptComment={acceptComment}
            onDeleteComment={deleteComment}
          />
        </div>
      ))}
    </div>
    </div>
     );
}
 
export default PostSite;