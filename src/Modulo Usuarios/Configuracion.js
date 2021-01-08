import React from 'react';
import {
    AppBar,
    Tabs,
    Tab,
    Grid
}from '@material-ui/core'
import{
    People,
    PersonAdd,
    Settings
} from '@material-ui/icons';
import {
	BrowserRouter as Router,
	Switch,
	Route
    } from 'react-router-dom';
import TabPanel from '../Componentes_Genericos/TabPanel';
import a11yProps from '../Componentes_Genericos/a11yProps';
import FormularioUsuario from './Formulario_Usuario';
import TablaUsuarios from './Tabla_Usuarios';
import EditarUsuarios from './Editar_Usuario';


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
                    
                    <Tab label="Configuración" icon= {<Settings/>} {...a11yProps(0)} />
                    <Tab label="Usuarios" icon= {<People/>} {...a11yProps(1)} />
                    <Tab label="Nuevo Usuario" icon= {<PersonAdd/>} {...a11yProps(2)} />
                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>

            
            </TabPanel>
            <TabPanel value={value} index={1}>
                <Switch>
                    <Route exact path='/Usuarios/Editar/:id'  component={EditarUsuarios}/>
                    <Route path='/' component={TablaUsuarios} />
                </Switch>
            </TabPanel>
            <TabPanel value={value} index={2}>
                <FormularioUsuario/>

            </TabPanel>
        </Grid>
    </Router>
  );
}