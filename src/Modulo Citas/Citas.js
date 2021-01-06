import React from 'react';
import PropTypes from 'prop-types';
import FormCitas from "./Formulario_Citas";
import Editar_Citas from "./Editar_Citas";
import Tabla_Citas from './Tabla_Citas';

import {
    AppBar,
    Tabs,
    Tab,
    Box,
    Grid
}from '@material-ui/core'
import{
  ListAlt,
  AddCircleOutline
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
                    <Tab label="Listado de Citas" icon={<ListAlt/>} {...a11yProps(0)} />
                    <Tab label="Nueva Cita" icon= {<AddCircleOutline/>} {...a11yProps(1)} />
                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>

                <Switch>
                    <Route exact path='/Citas/Editar/:id' component={Editar_Citas} />
                    <Route path='/'  component={Tabla_Citas}/>
                </Switch>
                
            </TabPanel>
            <TabPanel value={value} index={1}>
            
                <FormCitas/>
            </TabPanel>
            
        </Grid>
    </Router>
  );
}