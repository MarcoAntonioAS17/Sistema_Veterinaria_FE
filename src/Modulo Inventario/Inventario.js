import React from 'react';
import PropTypes from 'prop-types';
import FormCategorias from '../Modulo Categorias/Formulario_Categorias';
import Tabla_Categorias from '../Modulo Categorias/Tabla_Categorias';
import {
    AppBar,
    Tabs,
    Tab,
    Box,
    Grid
}from '@material-ui/core'
import{
  ListAlt,
  AddCircleOutline,
  PostAdd,
  Category
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
                    <Tab label="Inventario" icon={<ListAlt/>} {...a11yProps(0)} />
                    <Tab label="Nuevo Producto" icon= {<AddCircleOutline/>} {...a11yProps(1)} />
                    <Tab label="Categorías" icon= {<Category/>} {...a11yProps(2)} />
                    <Tab label="Nueva Categoria" icon= {<PostAdd/>} {...a11yProps(3)} />
                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>

                <Switch>
                    <Route exact path='/Inventario/Editar/:id'  />
                    <Route path='/'  />
                </Switch>
                
            </TabPanel>
            <TabPanel value={value} index={1}>
                
            </TabPanel>

            <TabPanel value={value} index={2}>

                <Switch>
                    <Route exact path='/Inventario/EditarCategoria/:id'  />
                    <Route path='/'  component={Tabla_Categorias}/>
                </Switch>
            
            </TabPanel>
            <TabPanel value={value} index={3}>
            
                <FormCategorias/>

            </TabPanel>
        </Grid>
    </Router>
  );
}