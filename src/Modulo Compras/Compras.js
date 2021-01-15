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
	Route
    } from 'react-router-dom'; 
import a11yProps from '../Componentes_Genericos/a11yProps';
import FormCompras from './Form_Compras';
import TablaCompras from './Tabla_Compras';
import TablaDCompras from './Tabla_DCompras';

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
                    <Tab label="Nueva compra" icon={<AddShoppingCart/>} {...a11yProps(0)} />
                    <Tab label="Historial de compras" icon= {<ListAlt/>} {...a11yProps(1)} />
                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
                <FormCompras/>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <Switch>
                    <Route exact path='/Compras/:id' component={TablaDCompras} />
                    <Route path='/' component={TablaCompras} />
                </Switch>
                
            </TabPanel>
            
        </Grid>
    </Router>
  );
}