import React from 'react';
import FormClientes from "./Formulario_Clientes";
import DataTable from "./Tabla_Cliente";
import EditarClientes from './EditarClientes'
import TabPanel from '../Componentes_Genericos/TabPanel';
import {
    AppBar,
    Tabs,
    Tab,
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
import a11yProps from '../Componentes_Genericos/a11yProps';

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
                    <Tab label="Listado de Clientes" icon={<ListAlt/>} {...a11yProps(0)} />
                    <Tab label="Nuevo Cliente" icon= {<AddCircleOutline/>} {...a11yProps(1)} />
                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>

                <Switch>
                    <Route exact path='/Clientes/Editar/:id'  component={EditarClientes}/>
                    <Route path='/' component={DataTable} />
                </Switch>
                
            </TabPanel>
            <TabPanel value={value} index={1}>
            
            <FormClientes/>
            </TabPanel>
            
        </Grid>
    </Router>
  );
}