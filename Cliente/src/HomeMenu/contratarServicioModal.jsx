// import React, { useState } from 'react';
// import Button from '@mui/material/Button';
// import TextField from '@mui/material/TextField';
// import Dialog from '@mui/material/Dialog';
// import DialogActions from '@mui/material/DialogActions';
// import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
// import DialogTitle from '@mui/material/DialogTitle';
// import MenuItem from '@mui/material/MenuItem';
// import Select from '@mui/material/Select';

// export default function FormDialog({precio, onClose, servicioId}) {
//   const [open, setOpen] = React.useState(false);


//   const handleClickOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };


//   const [tipo, setTipo] = useState(''); // Estado para rastrear el valor del tipo
//   const [frecuencia, setFrecuencia] = useState(''); // Estado para rastrear el valor de la frecuencia
//   const [descripcion, setDescripcion] = useState('');


//   const handleTipoChange = (event) => {
//     setTipo(event.target.value); // Actualiza el valor del tipo cuando cambia
//   };

//   const handleFrecuenciaChange = (event) => {
//     setFrecuencia(event.target.value); // Actualiza el valor de la frecuencia cuando cambia
//   };

//   // const handleDescripcionChange = (event) => {
//   //   setDescripcion(event.target.value);
//   // };

// // const numericOptions = Array.from({ length: 10 }, (_, index) => index + 1);


// const [clienteNombre, setClienteNombre] = useState('');
// const [clienteApellido, setClienteApellido] = useState('');
// const [clienteEmail, setClienteEmail] = useState('');
// const [clienteTelefono, setClienteTelefono] = useState('');

// const handleConfirm = async () => {
//   const contratacionData = {
//       nombre: clienteNombre,
//       apellido: clienteApellido,
//       email: clienteEmail,
//       telefono: clienteTelefono,
//       cantclases: cantClases
//   };

//   try {
//       const response = await fetch(`http://localhost:4000/api/contratar/${servicioId}`, {
//           method: 'POST',
//           headers: {
//               'Content-Type': 'application/json',
//           },
//           body: JSON.stringify(contratacionData)
//       });

//       if (!response.ok) {
//           throw new Error('Error al realizar la contratación');
//       }

//       const result = await response.json();
//       console.log('Contratación realizada con éxito:', result);
//       // Manejar acciones posteriores como cerrar el modal, mostrar mensaje, etc.
//   } catch (error) {
//       console.error('Error en la contratación:', error);
//   }
// };




//   return (
//     <div>
//       <Button fullWidth disableRipple  onClick={handleClickOpen} sx={{
//         fontSize: "large",
//         backgroundColor: "#005B96",
//         borderRadius: "10px",
//         color: "white",
//         maxWidth: "1300px"
        
//     }}>
//         <h1>${precio}</h1>
//       </Button>
//       <Dialog open={open} onClose={handleClose}>
//         <DialogTitle>Contratar curso</DialogTitle>
//         <DialogContent>
//           <DialogContentText>
//             Por favor complete sus verdaderos datos para contratar un servicio. El auxiliar recibirá una notificación con su pedido, y luego evaluará si dedide
//             tomar o no al alumno.
        
//           </DialogContentText>
//           <TextField
//             autoFocus
//             margin="dense"
//             id="nombre"
//             label="Nombre"
//             type="text"
//             fullWidth
//             variant="outlined"
//             autoComplete="off"
//           />
//           <TextField
//             autoFocus
//             margin="dense"
//             id="apellido"
//             label="Apellido"
//             type="text"
//             fullWidth
//             variant="outlined"
//             autoComplete="off"
//           />
//           <TextField
//             autoFocus
//             margin="dense"
//             id="email"
//             label="Email"
//             type="text"
//             fullWidth
//             variant="outlined"
//             autoComplete="off"
//           />

//           <TextField
//             autoFocus
//             margin="dense"
//             id="telefono"
//             label="Telefono"
//             type="text"
//             fullWidth
//             variant="outlined"
//             autoComplete="off"
//           />

//           <TextField
//             autoFocus
//             margin="dense"
//             id="cantClases"
//             label="Cantidad de clases"
//             type="text"
//             fullWidth
//             variant="outlined"
//             autoComplete="off"
//           />

//         </DialogContent>
//         <DialogActions style={{ justifyContent: 'center' }}>
//           <Button variant="contained" onClick={handleClose}>Confirmar</Button>
//         </DialogActions>
//       </Dialog>
//     </div>

// <Dialog open={open} onClose={handleClose}>
//         <DialogTitle>Contratar curso</DialogTitle>
//         <DialogContent>
//           <DialogContentText>
//             Por favor complete sus verdaderos datos para contratar un servicio.
//           </DialogContentText>
//           {/* Campos de entrada para datos de contratación */}
//           <TextField autoFocus margin="dense" label="Nombre" type="text" fullWidth variant="outlined"
//             value={nombre} onChange={(e) => setNombre(e.target.value)} autoComplete="off" />
//           <TextField margin="dense" label="Apellido" type="text" fullWidth variant="outlined"
//             value={apellido} onChange={(e) => setApellido(e.target.value)} autoComplete="off" />
//           <TextField margin="dense" label="Email" type="email" fullWidth variant="outlined"
//             value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="off" />
//           <TextField margin="dense" label="Telefono" type="tel" fullWidth variant="outlined"
//             value={telefono} onChange={(e) => setTelefono(e.target.value)} autoComplete="off" />
//           <TextField margin="dense" label="Cantidad de clases" type="number" fullWidth variant="outlined"
//             value={cantClases} onChange={(e) => setCantClases(e.target.value)} autoComplete="off" />
//         </DialogContent>
//         <DialogActions style={{ justifyContent: 'center' }}>
//           <Button variant="contained" onClick={handleSubmit}>Confirmar</Button>
//         </DialogActions>
//       </Dialog>
//     </div>









//   );
// }

import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

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
    onClose && onClose(); // Llamar a onClose si existe
  };

  const handleSubmit = async () => {
    const contratacionData = {
      nombre: clienteNombre,
      apellido: clienteApellido,
      email: clienteEmail,
      telefono: clienteTelefono,
      cantclases: cantClases
    };

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

      const result = await response.json();
      console.log('Contratación realizada con éxito:', result);
      handleClose(); // Cierra el modal después de la contratación exitosa
    } catch (error) {
      console.error('Error en la contratación:', error);
    }
  };

  return (
    <div>
      <Button fullWidth disableRipple onClick={handleClickOpen} sx={{
        fontSize: "large",
        backgroundColor: "#005B96",
        borderRadius: "10px",
        color: "white",
        maxWidth: "1300px"
      }}>
        <h1>${precio}</h1>
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
          <TextField margin="dense" label="Telefono" type="tel" fullWidth variant="outlined"
            value={clienteTelefono} onChange={(e) => setClienteTelefono(e.target.value)} autoComplete="off" />
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