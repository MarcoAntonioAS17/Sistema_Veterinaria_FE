import React from 'react';
import TabPanel from '../Componentes_Genericos/TabPanel';
import {
    AppBar,
    Tabs,
    Tab,
    Grid
}from '@material-ui/core'
import{
  ListAlt,
  AddShoppingCart
} from '@material-ui/icons';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
    useHistory
    } from 'react-router-dom'; 
import a11yProps from '../Componentes_Genericos/a11yProps';
import FormVentas from './Formulario_Ventas';
import TablaVentas from './Tabla_Ventas';
import TablaDVentas from './Tabla_DetalleVentas';

export default function SimpleTabs() {
  
  let history = useHistory();
  const Token = sessionStorage.getItem('ACCESS_TOKEN');

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
                    <Tab label="Nueva venta" icon={<AddShoppingCart/>} {...a11yProps(0)} />
                    <Tab label="Historial de ventas" icon= {<ListAlt/>} {...a11yProps(1)} />
                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
                <FormVentas/>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <Switch>
                    <Route exact path='/Ventas/:id' component = {TablaDVentas} />
                    <Route path='/'  component = {TablaVentas}/>
                </Switch>
                
            </TabPanel>
            
        </Grid>
    </Router>
  );
}