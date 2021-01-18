import React from 'react';
import FormProveedores from './Formulario_Proveedores';
import Tabla_Proveedores from './Table_Proveedores';
import {
    AppBar,
    Tabs,
    Tab,
    Grid
}from '@material-ui/core'
import{
    Add,
    BusinessCenter
} from '@material-ui/icons';
import {
	BrowserRouter as Router,
	Switch,
    Route,
    Redirect,
    useHistory
    } from 'react-router-dom'; 
import EditarProveedores from './EditarProveedores';
import TabPanel from '../Componentes_Genericos/TabPanel';
import a11yProps from '../Componentes_Genericos/a11yProps';

export default function SimpleTabs() {
    
    let history = useHistory();
    const Token = localStorage.getItem('ACCESS_TOKEN');
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  if(!Token){
    history.push("/Login");
    window.location.reload();
    return(
        <Redirect push to={{
            pathname: "/Login",
            state: { from: history.location }
        }}/>
    );

  }else
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
                    <Route exact path='/Proveedores/Editar/:id' component = {EditarProveedores} />
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