import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';

export default function FormDialog({ precio, onClose, servicioId }) {
  const [open, setOpen] = useState(false);
  const [clienteNombre, setClienteNombre] = useState('');
  const [clienteApellido, setClienteApellido] = useState('');
  const [clienteEmail, setClienteEmail] = useState('');
  const [clienteTelefono, setClienteTelefono] = useState('');
  const [cantClases, setCantClases] = useState('');

  const handleClickOpen = () => {
    setOpen(true);
    console.log('servicioId:', servicioId);
  };

  const handleClose = () => {
    setOpen(false);
    onClose && onClose();
  };

  const validarEmail = (email) => {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return re.test(String(email).toLowerCase());
  };

  const validarCamposCompletos = () => {
    return clienteNombre && clienteApellido && clienteEmail && clienteTelefono && cantClases;
  };
  

  const handleSubmit = async () => {
    const contratacionData = {
      nombre: clienteNombre,
      apellido: clienteApellido,
      email: clienteEmail,
      telefono: clienteTelefono,
      cantclases: cantClases
    };

    if (!validarCamposCompletos()) {
      alert('Por favor complete todos los campos.');
      return;
    }

    if (!validarEmail(clienteEmail)) {
      alert('Por favor ingrese un email válido.');
      return;
    }

    try {
      const response = await fetch(`http://localhost:4000/api/contratar/contratar/${servicioId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contratacionData)
      });

      if (!response.ok) {
        throw new Error('Error al realizar la contratación');
      }

      //const result = await response.json();
      alert('Contratación realizada con éxito');

      handleClose(); 
    } catch (error) {
      console.error('Error en la contratación:', error);
    }
  };

  return (
    <div>
      <Button variant='primary' onClick={handleClickOpen} sx={{
        backgroundColor: "#005B96",
        borderRadius: "10px",
        color: "white",
       height:'50px',
       width:'100px',
       ml: '15px',
       mb: '3px', 
      }}><EmojiPeopleIcon/>
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Contratar curso</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Por favor complete sus verdaderos datos para contratar un servicio.
          </DialogContentText>
          <TextField autoFocus margin="dense" label="Nombre" type="text" fullWidth variant="outlined"
            value={clienteNombre} onChange={(e) => setClienteNombre(e.target.value)} autoComplete="off" />
          <TextField margin="dense" label="Apellido" type="text" fullWidth variant="outlined"
            value={clienteApellido} onChange={(e) => setClienteApellido(e.target.value)} autoComplete="off" />
          <TextField margin="dense" label="Email" type="email" fullWidth variant="outlined"
            value={clienteEmail} onChange={(e) => setClienteEmail(e.target.value)} autoComplete="off" />
          <TextField margin="dense" label="Telefono" type="number" fullWidth variant="outlined"
            value={clienteTelefono}  onChange={(e) => setClienteTelefono(e.target.value)} autoComplete="off" />
          <TextField margin="dense" label="Cantidad de clases" type="number" fullWidth variant="outlined"
            value={cantClases} onChange={(e) => setCantClases(e.target.value)} autoComplete="off" />
        </DialogContent>
        <DialogActions style={{ justifyContent: 'center' }}>
          <Button variant="contained" onClick={handleSubmit}>Confirmar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}