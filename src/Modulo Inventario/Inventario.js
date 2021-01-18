import React from 'react';
import FormCategorias from '../Modulo Categorias/Formulario_Categorias';
import TablaCategorias from '../Modulo Categorias/Tabla_Categorias';
import FormProductos from './Formulario_Productos';
import TablaInventario from './Tabla_Inventario';
import EditarInventario from './Editar_Inventario';
import TabPanel from '../Componentes_Genericos/TabPanel';

import {
    AppBar,
    Tabs,
    Tab,
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
    Route,
    Redirect,
    useHistory
    } from 'react-router-dom'; 
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
                    <Tab label="Inventario" icon={<ListAlt/>} {...a11yProps(0)} />
                    <Tab label="Nuevo Producto" icon= {<AddCircleOutline/>} {...a11yProps(1)} />
                    <Tab label="Categorías" icon= {<Category/>} {...a11yProps(2)} />
                    <Tab label="Nueva Categoria" icon= {<PostAdd/>} {...a11yProps(3)} />
                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>

                <Switch>
                    <Route exact path='/Inventario/Editar/:id' component = {EditarInventario}/>
                    <Route path='/'  component={TablaInventario} />
                </Switch>
                
            </TabPanel>
            <TabPanel value={value} index={1}>
                <FormProductos/>
            </TabPanel>

            <TabPanel value={value} index={2}>

                <TablaCategorias/>
            
            </TabPanel>
            <TabPanel value={value} index={3}>
            
                <FormCategorias/>

            </TabPanel>
        </Grid>
    </Router>
  );
}