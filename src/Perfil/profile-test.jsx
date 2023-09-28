import React, { useState } from 'react';
import './profile-style.css';
import avatarImage from '../Img/avatar.png';
import CommentBox from'./Comment_Box/master-comments';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Rating from '@mui/material/Rating';
import { Box } from '@mui/material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  }));
  

 
  export default function RecipeReviewCard({publicacion}) {
    const [expanded, setExpanded] = React.useState(false);
  
    const handleExpandClick = () => {
      setExpanded(!expanded);
  

    }

    const [anchorEl, setAnchorEl] = useState(null);
    const handleMenuOpen = (event) => {
      setAnchorEl(event.currentTarget);
    };
    
    const handleMenuClose = () => {
      setAnchorEl(null);
    };

    return (
        <div>
          
            <Card sx={{ maxWidth: 700 }}>
              <CardHeader
               
                action={
                  <React.Fragment>
                    <IconButton aria-label="settings" onClick={handleMenuOpen}>
                      <MoreVertIcon />
                    </IconButton>
                    <Menu
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl)}
                      onClose={handleMenuClose}
                    >
                      <MenuItem onClick={handleMenuClose}>Modificar</MenuItem>
                      <MenuItem onClick={handleMenuClose}>Desactivar</MenuItem>
                      <MenuItem onClick={handleMenuClose}>Eliminar</MenuItem>
                    </Menu>
                  </React.Fragment>
                }
                title={publicacion.categoria}
                
                subheader={publicacion.estado}
                
              />         
    
              <CardContent id="card-body">
                
                    <p>Clases: {publicacion.cclases}</p>    
                    <p>Calificación: <Rating name="read-only" value={publicacion.calificacion} readOnly /></p>
                    <p>Descripcion: {publicacion.despcripcion}</p>
   
              </CardContent>
    
              <CardActions disableSpacing>
                <IconButton aria-label="add to favorites"></IconButton>
                <IconButton aria-label="share"></IconButton>
                <ExpandMore
                  expand={expanded}
                  onClick={handleExpandClick}
                  aria-expanded={expanded}
                  aria-label="show more"
                >
                  <ExpandMoreIcon />
                </ExpandMore>
              </CardActions>
    
              <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent id='box-comentarios'>
                <Typography>Comentarios:</Typography>
                <br></br>
        {publicacion.comentarios.map((comentario) => (
            <Box  key={comentario.id} sx={{ border: '1px solid gray', m: 1, p: 1 }}>
            
            <Typography>{comentario.texto}</Typography>
             </Box>                   
      ))}
                </CardContent>
              </Collapse>
            </Card>
          
        </div>
      );
    }