import React, { useState } from 'react';
import '../profile-style.css';

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import MenuItem from '@mui/material/MenuItem';
import ProfileTest from '../profile-test';




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
  
    return (
      <div>
        <Button variant="contained" onClick={handleClickOpen} sx={{fontSize: "large",}} >
          Crear curso
        </Button>
        <Dialog open={open} onClose={handleClose}>
          
          <DialogContent>
            <DialogContentText>
              
            </DialogContentText>
            <TextField
        autoFocus
        margin="dense"
        id="category"
        label="Categoría"
        type="text"
        fullWidth
        variant="outlined"
      />
      <TextField
        margin="dense"
        id="type"
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
        fullWidth
        variant="outlined"
      />
      <TextField
              margin="dense"
              id="descripcion"
              label="Descripción"
              multiline // Esto habilita el modo multilinea
              rows={4} // Puedes ajustar la cantidad de filas que deseas mostrar
              fullWidth
              variant="outlined" // Puedes usar outlined para un borde visible o standard para un borde más delgado
              value={descripcion}
              onChange={handleDescripcionChange}
            />
    </DialogContent>
          
          <DialogActions>
  
            <Button variant="outlined" onClick={handleClose}>Cancelar</Button>
            <Button variant="contained" onClick={handleClose}>Aceptar</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }


const PostSite = () => {


    
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
    

    return ( 

        <div className="posteos-hechos">
        <div className="agregar-publi">

            
        <FormDialog></FormDialog>

        </div>
        {pub_commited.map((dcPost) => (
            <div className="perfil-preview" key={dcPost.id}>
                <ProfileTest publicacion={dcPost}></ProfileTest>
                
            </div>
        ))}

        </div>
     );
}
 
export default PostSite;






