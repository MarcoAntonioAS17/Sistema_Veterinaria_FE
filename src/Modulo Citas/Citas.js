import React from 'react';
import FormCitas from "./Formulario_Citas";
import Editar_Citas from "./Editar_Citas";
import Tabla_Citas from './Tabla_Citas';
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
    Route,
    Redirect,
    useHistory
    } from 'react-router-dom'; 
import a11yProps from '../Componentes_Genericos/a11yProps';

    
export default function SimpleTabs() {
  
  const [value, setValue] = React.useState(0);
  let history = useHistory();
  const Token = sessionStorage.getItem('ACCESS_TOKEN');
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

  }
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