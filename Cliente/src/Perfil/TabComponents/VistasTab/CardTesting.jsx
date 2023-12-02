import React, { useState, useEffect } from 'react';

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';

import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { blue } from '@mui/material/colors';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import Button from '@mui/material/Button';
import '../estiloTabs/cards.css'

import HireService from '../../../HomeMenu/verComentariosModal'




const CourseCard = ({ course, avatarUrl, servicioId }) => {
    const [commentModalShow, setCommentModalShow] = useState(false);
  

  const handleCommentClick = () => {
    setCommentModalShow(true);
    
  };

  // Función para manejar el cierre del modal de comentarios
  const handleCommentModalClose = () => {
    setCommentModalShow(false);
  };

  



  return (
    <Card sx={{ maxWidth: 500, m: 3, 
    border: '1px solid #000', 
    borderRadius: '10px'
    
    }}>
        <div className="avatar-backgroud">
      <CardHeader
        avatar={
          <Avatar 
          src={avatarUrl}
          sx={{ 

            width: 100,  // Aumenta el ancho del avatar
            height: 100,
            bgcolor: blue[500] 
            
            
            }} aria-label="instructor">

            {course.instructorName.charAt(0)}
          </Avatar>
        }
        title={course.instructorName}
        titleTypographyProps={{ 
            variant: 'h6', // Utiliza una variante de título predefinida que controla el tamaño
            fontFamily: 'Arial', // Cambia la familia de fuentes
            fontSize: '1.80rem' // O especifica un tamaño de fuente personalizado
          }}
        subheader={course.title}
        subheaderTypographyProps={{ 
            variant: 'subtitle1', // Utiliza una variante de subtítulo predefinida que controla el tamaño
            fontFamily: 'Arial', // Cambia la familia de fuentes
            fontSize: '1.5rem' // O especifica un tamaño de fuente personalizado
          }}
      />
      </div>
      <div className="card-content">
      <CardContent>
        <Typography sx={{ fontSize: '18px' }} variant="body2" color="text.secondary">
          {course.description}
        </Typography>
        <Typography sx={{ fontSize: '18px' }} variant="body2">
          Experiencia: {course.experience}
        </Typography>
        <Typography sx={{ fontSize: '18px' }} variant="body2">
          Titulo: {course.titulo}
        </Typography>
        <Typography sx={{ fontSize: '18px' }} variant="body2">
          Frecuencia: {course.frequency}
        </Typography>
        <Typography sx={{ fontSize: '18px' }} variant="body2">
          Tipo de clase: {course.tipoClase}
        </Typography>
      </CardContent>
      </div>
      <div className="card-bottom">
      <CardActions disableSpacing sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
        <div className="comentario">
        <IconButton aria-label="comments" onClick={handleCommentClick}>
          <QuestionAnswerIcon 
          color="primary"
          sx={{  fontSize: '2rem' }}
          />
        </IconButton>
        </div>
        <div className="contratar-boton">
        <Button variant="contained"
            color="primary"
            sx={{ padding: '10px 20px', fontSize: '2rem' }}>
          ${course.price}
        </Button>
        </div>
      </CardActions>
      </div>
      <HireService
        show={commentModalShow}
        onHide={handleCommentModalClose}
        servicioId={servicioId} // Asegúrate de tener el id del servicio
      />
    </Card>
  );
};



export default CourseCard;