import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

export default function FormDialog({precio, onClose}) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const [tipo, setTipo] = useState(''); // Estado para rastrear el valor del tipo
  const [frecuencia, setFrecuencia] = useState(''); // Estado para rastrear el valor de la frecuencia
  const [descripcion, setDescripcion] = useState('');


  const handleTipoChange = (event) => {
    setTipo(event.target.value); // Actualiza el valor del tipo cuando cambia
  };

  const handleFrecuenciaChange = (event) => {
    setFrecuencia(event.target.value); // Actualiza el valor de la frecuencia cuando cambia
  };

  const handleDescripcionChange = (event) => {
    setDescripcion(event.target.value);
  };

const numericOptions = Array.from({ length: 10 }, (_, index) => index + 1);

  return (
    <div>
      <Button fullWidth disableRipple  onClick={handleClickOpen} sx={{
        fontSize: "large",
        backgroundColor: "#005B96",
        borderRadius: "10px",
        color: "white",
        maxWidth: "1300px"
        
    }}>
        <h1>${precio}</h1>
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Contratar clases</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Por favor complete sus verdaderos datos para contratar un servicio. El auxiliar recibirá una notificación con su pedido, y luego evaluará si dedide
            tomar o no al alumno.
        
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Nombre"
            type="text"
            fullWidth
            variant="outlined"
          />
          <TextField
            autoFocus
            margin="dense"
            id="surname"
            label="Apellido"
            type="text"
            fullWidth
            variant="outlined"
          />
          <TextField
            autoFocus
            margin="dense"
            id="email"
            label="Email"
            type="text"
            fullWidth
            variant="outlined"
          />
          <TextField
            autoFocus
            margin="dense"
            id="cclases"
            label="Cantidad de clases"
            type="text"
            fullWidth
            variant="outlined"
          />
           {/* <TextField
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
    </TextField> */}

        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleClose}>Confirmar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}