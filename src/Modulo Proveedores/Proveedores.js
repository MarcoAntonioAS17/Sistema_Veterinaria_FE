import React from 'react';
import PropTypes from 'prop-types';
import FormProveedores from './Formulario_Proveedores';
import Tabla_Proveedores from './Table_Proveedores';
import {
    AppBar,
    Tabs,
    Tab,
    Box,
    Grid
}from '@material-ui/core'
import{
    Add,
    BusinessCenter
} from '@material-ui/icons';
import {
	BrowserRouter as Router,
	Switch,
	Route
    } from 'react-router-dom'; 

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
          {children}
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
    <Router>
        <Grid item={true} lg={12}>
            <AppBar position="static">
                <Tabs 
                    value={value} 
                    onChange={handleChange} 
                    aria-label="simple tabs example"
                    centered>
                    
                    <Tab label="Proveedores" icon= {<BusinessCenter/>} {...a11yProps(0)} />
                    <Tab label="Nuevo Proveedor" icon= {<Add/>} {...a11yProps(1)} />
                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>

                <Switch>
                    <Route exact path='/Proveedores/Editar/:id'  />
                    <Route path='/'  component = {Tabla_Proveedores}/>
                </Switch>
            
            </TabPanel>
            <TabPanel value={value} index={1}>

                <FormProveedores/>

            </TabPanel>
        </Grid>
    </Router>
  );
}