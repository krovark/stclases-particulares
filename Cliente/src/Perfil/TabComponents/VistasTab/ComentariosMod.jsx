import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Rating from '@mui/material/Rating';

export default function GridOfCards() {
  const [comentarios, setComentarios] = useState([]);

  useEffect(() => {
    fetchComentarios();
  }, []);

  const fetchComentarios = async () => {
    try {
      const response = await fetch(`http://localhost:4000/api/comentarios/proveedor`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include' 
      });
      if (!response.ok) {
        throw new Error('Error al cargar comentarios');
      }
      const data = await response.json();
      console.log(data);
      setComentarios(data.comentarios);
    } catch (error) {
      console.error('Error:', error);
    }
  };


  const handleCancelar = async (index) => {
    const comentario = comentarios[index];
    if (!comentario || !comentario._id) {
      console.error('Comentario no encontrado en el índice:', index);
      return;
    }
  
    try {
      const response = await fetch(`http://localhost:4000/api/comentarios/cambiarestadocomentario/${comentario._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ estado: 'rechazado' }),
        credentials: 'include' 
      });
    
      if (!response.ok) {
        throw new Error('Error al actualizar el comentario');
      }

      const newComentarios = [...comentarios];
      newComentarios.splice(index, 1);
      setComentarios(newComentarios);
  
    } catch (error) {
      alert('Hubo un error al rechazar el comentario');
    }
  };


  const handleAceptar = async (index) => {
    const comentario = comentarios[index];
    if (!comentario || !comentario._id) {
      console.error('Comentario no encontrado en el índice:', index);
      return;
    }
  
    try {
      const response = await fetch(`http://localhost:4000/api/comentarios/cambiarestadocomentario/${comentario._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ estado: 'aprobado' }),
        credentials: 'include' 
      });
    
      if (!response.ok) {
        throw new Error('Error al actualizar el comentario');
      }

      const newComentarios = [...comentarios];
      newComentarios.splice(index, 1);
      setComentarios(newComentarios);
  
    } catch (error) {
      alert('Hubo un error al aceptar el comentario');
    }
  };


  return (
    <div>
      {comentarios.length === 0 ? (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <Typography variant="h6">Aún no tienes comentarios pendientes de moderación.</Typography>
        </div>
      ) : (
    <Grid container spacing={3}>
      {comentarios.map((comentario, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <Box sx={{ minWidth: 300 }}>
            <Card  
            sx={{ 
            
              borderRadius: '10px' 
            }}
            variant="outlined">
              <CardContent>
                <Typography sx={{ fontSize: 14, borderBottom: '1px solid gray'}} color="black" gutterBottom>
                 Comentario pendiente de {comentario.comentarioCliente}
                </Typography>

                <Typography
                 sx={{ 
                  mb: 1.5, 
                  mt: 3, 
                  fontWeight: 'bold', 
                  fontSize: '1rem'
                
                }} 
                
                variant="body2">
                {comentario.servicioId.nombre}
                </Typography>

                <Typography sx={{ mb: 1.5, mt: 3 }} variant="body2">
                  {comentario.comentario}
                </Typography>

                <Typography sx={{ mb: 1.5, mt: 4 }} color="text.secondary">
                  <Rating name="disabled" value={comentario.calificacion} readOnly />
                </Typography>
                
              </CardContent>
              <CardActions>
                <Button size="small" onClick={() => handleAceptar(index)}>Aceptar</Button>
                <Button size="small" onClick={() => handleCancelar(index)}>Rechazar</Button>
              </CardActions>
            </Card>
          </Box>
        </Grid>
      ))}
    </Grid>
 )}
 </div>
);
}