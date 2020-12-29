import React from 'react';
import PropTypes from 'prop-types';
import FormClientes from "./Modulo Clientes/Formulario_Clientes";
import {
    AppBar,
    Tabs,
    Tab,
    Typography,
    Box,
    Grid
}from '@material-ui/core'

function TabPanel(props) {
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
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function SimpleTabs() {
  
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Grid lg={12}>
      <AppBar position="static">
        <Tabs 
            value={value} 
            onChange={handleChange} 
            aria-label="simple tabs example"
            centered>
          <Tab label="Listado de Clientes" {...a11yProps(0)} />
          <Tab label="Nuevo Cliente" {...a11yProps(1)} />
          
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
      <h1>Hola React</h1>
      </TabPanel>
      <TabPanel value={value} index={1}>
        
        <FormClientes/>
      </TabPanel>
      
    </Grid>
  );
}