import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Historial from './coursesDictated'
import PostCreados from './PostComponents'
import CoursesTaken from './coursesTaken'
import '../profile-style.css';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function generarComentariosAleatorios() {
  const loremIpsum =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';
  const comentariosAleatorios = [];

  for (let i = 1; i <= 7; i++) {
    comentariosAleatorios.push({
      id: i,
      text: loremIpsum,
      pendiente: true, // Inicialmente, todos los comentarios están pendientes de revisión
    });
  }

  return comentariosAleatorios;
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const comentariosAleatorios = generarComentariosAleatorios();

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example"  variant="scrollable" scrollButtons="auto">
          <Tab label="Publicaciones" {...a11yProps(0)} style={{ fontSize: '16px' }}/>
          <Tab label="Solicitudes" {...a11yProps(1)} style={{ fontSize: '16px' }}/>
          {/* <Tab label="Solicitudes" {...a11yProps(2)} style={{ fontSize: '16px' }}/> */}
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <PostCreados/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
      <Historial/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
      
      </CustomTabPanel>
    </Box>
  );
}