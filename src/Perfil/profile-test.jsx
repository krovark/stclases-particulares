import React, { useState } from 'react';
import './profile-style.css';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Box } from '@mui/material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';

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

export default function ProfileTest({ publicacion }) {
  const [expanded, setExpanded] = React.useState(false);
  const [editMode, setEditMode] = useState(false); // Estado para controlar el modo de edición
  const [editedData, setEditedData] = useState({}); // Estado para rastrear los valores editados
  const [anchorEl, setAnchorEl] = useState(null); // Definir anchorEl

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleSaveClick = () => {
    // Aquí puedes guardar los datos editados, por ejemplo, enviar una solicitud al servidor si es necesario
    // Luego, puedes salir del modo de edición
    setEditMode(false);
  };

  const handleCancelClick = () => {
    // Aquí puedes cancelar la edición y restaurar los valores originales
    setEditedData({});
    setEditMode(false);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedData({ ...editedData, [name]: value });
  };

  return (
    <div>
      <Card sx={{ maxWidth: 700 }}>
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
                <MenuItem onClick={handleMenuClose}>Desactivar</MenuItem>
                <MenuItem onClick={handleMenuClose}>Eliminar</MenuItem>
              </Menu>
            </React.Fragment>
          }
          title={editMode ? (
            <TextField
              name="categoria"
              value={editedData.categoria || publicacion.categoria}
              onChange={handleInputChange}
            />
          ) : (
            publicacion.categoria
          )}
          subheader={publicacion.estado}
        />

        <CardContent id="card-body">
          {editMode ? (
            <TextField
              name="cclases"
              value={editedData.cclases || publicacion.cclases}
              onChange={handleInputChange}
            />
          ) : (
            <h5>Clases: {publicacion.cclases}</h5>
          )}
          {editMode ? (
            <TextField
              name="freq"
              value={editedData.freq || publicacion.freq}
              onChange={handleInputChange}
            />
          ) : (
            <h5>Frecuencia: {publicacion.freq}</h5>
          )}
          {editMode ? (
            <TextField
              name="precio"
              value={editedData.precio || publicacion.precio}
              onChange={handleInputChange}
            />
          ) : (
            <h5>Precio hora: {publicacion.precio}</h5>
          )}
          <br></br>
          {editMode ? (
            <TextField
              name="despcripcion"
              value={editedData.despcripcion || publicacion.despcripcion}
              onChange={handleInputChange}
            />
          ) : (
            <h6>Descripcion: {publicacion.despcripcion}</h6>
          )}
        </CardContent>

        <CardActions disableSpacing>
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
          <CardContent id="box-comentarios">
            <Typography>Comentarios:</Typography>
            <br></br>
            {publicacion.comentarios.map((comentario) => (
              <Box
                key={comentario.id}
                sx={{ border: '1px solid gray', m: 1, p: 1 }}
              >
                <Typography>{comentario.texto}</Typography>
              </Box>
            ))}
          </CardContent>
        </Collapse>
      </Card>
    </div>
  );
}