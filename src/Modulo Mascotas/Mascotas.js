import React from 'react';
import Tabla_Mascotas from './Tabla_Mascotas';
import FormMascotas from './Formulario_Mascotas';
import EditarMascotas from './EditarMascota';
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
                    <Tab label="Listado de Mascotas" icon={<ListAlt/>} {...a11yProps(0)} />
                    <Tab label="Registrar Mascotas" icon= {<AddCircleOutline/>} {...a11yProps(1)} />
                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>

                <Switch>
                    <Route exact path='/Mascotas/Editar/:id' component={EditarMascotas} />
                    <Route path='/' component={Tabla_Mascotas}/>
                </Switch>
                
            </TabPanel>
            <TabPanel value={value} index={1}>
                <FormMascotas/>
            </TabPanel>
            
        </Grid>
    </Router>
  );
}