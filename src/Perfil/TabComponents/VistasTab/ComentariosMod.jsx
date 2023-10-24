import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Rating from '@mui/material/Rating';
import comentariosData from '../../../json/comentarios.json'

export default function GridOfCards() {


  const [comentarios, setComentarios] = useState(comentariosData);

  const handleCancelar = (index) => {
    const newComentarios = [...comentarios];
    newComentarios.splice(index, 1);
    setComentarios(newComentarios);
  };

  return (
    <Grid container spacing={3}>
      {comentarios.map((comentario, index) => (
        <Grid item xs={4} key={index}>
          <Box sx={{ minWidth: 275 }}>
            <Card variant="outlined">
              <CardContent>
                <Typography sx={{ fontSize: 14, borderBottom: '1px solid gray' }} color="black" gutterBottom>
                 Comentario pendiente

                </Typography>
                
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                <Rating name="disabled" value={comentario.rating} readOnly />
                </Typography>
                <Typography variant="body2">
                  {comentario.comentario}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">Aceptar</Button>
                <Button size="small" onClick={() => handleCancelar(index)}>Rechazar</Button>
              </CardActions>
            </Card>
          </Box>
        </Grid>
      ))}
    </Grid>
  );
}