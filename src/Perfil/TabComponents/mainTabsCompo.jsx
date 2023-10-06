import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Historial from '../../Historial/historial'
import PostCreados from './PostComponents'
import '../profile-style.css';
import CoursesTaken from './coursesTaken'

// import Button from '@mui/material/Button';
// import TextField from '@mui/material/TextField';
// import Dialog from '@mui/material/Dialog';
// import DialogActions from '@mui/material/DialogActions';
// import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';





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

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example"  variant="scrollable" scrollButtons="auto">
          <Tab label="Publicaciones" {...a11yProps(0)} style={{ fontSize: '16px' }}/>
          <Tab label="Comentarios" {...a11yProps(1)} style={{  fontSize: '16px'  }} />
          <Tab label="Cursos tomados" {...a11yProps(2)} style={{  fontSize: '16px'  }} />
          <Tab label="Cursos dictados" {...a11yProps(3)}  style={{  fontSize: '16px'  }}/>
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <PostCreados/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
      Comentarios
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
      <CoursesTaken/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
      <Historial></Historial>
      </CustomTabPanel>
    </Box>
  );
}

