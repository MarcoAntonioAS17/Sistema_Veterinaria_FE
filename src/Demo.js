import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Cliente from './Modulo Clientes/Clientes';
import Mascotas from './Modulo Mascotas/Mascotas';
import Inventario from './Modulo Inventario/Inventario';
import Proveedores from './Modulo Proveedores/Proveedores'
import Citas from "./Modulo Citas/Citas";

import NavBar from './NavBar';
import MenuDrawer from './MenuDrawer';
import {ThemeProvider} from '@material-ui/core/styles'
import theme from './Tema'
import { Box } from '@material-ui/core';
import {
	BrowserRouter as Router,
	Switch,
	Route
    } from 'react-router-dom'; 

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    },
    content: {
        WebkitBoxShadow: "0px 2px 4px rgba(0,0,0,.5)",
        width: '80%',
        backgroundColor: "#fff",
        marginBottom: "1rem",
    },
}));

export default function MiniDrawer() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleDrawer = () => {
    setOpen(!open);
  };


  return (
    <Router>
        <div className={classes.root}>
            <ThemeProvider theme={theme}>
            <NavBar handleDrawer = {handleDrawer}/>
            <MenuDrawer
                open={open}/>
            <main style={{ width: '100%' }} >
                <div className={classes.toolbar} />
                <Box 
                    className={classes.content}
                    mx="auto" 
                    mt="1rem"
                >
                    <Switch>
                        <Route path = '/Citas'  component={Citas}/>
                        <Route path = '/Clientes'  component={Cliente}/>
                        <Route path = '/Mascotas'  component={Mascotas}/>
                        <Route path = '/Inventario'  component={Inventario}/>
                        <Route path = '/Proveedores'  component={Proveedores}/>
                        <Route path = '/Compras' />
                    </Switch>
                </Box>
            </main>
            </ThemeProvider>
        </div>
    </Router>
  );
}
