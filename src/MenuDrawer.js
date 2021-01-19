import React from 'react';
import clsx from 'clsx';

import {
    Divider,
    List,
    ListItem,
    ListItemIcon,
    ListItemText
    } from  "@material-ui/core"
import { 
    Drawer, 
    makeStyles 
    } from "@material-ui/core";
import { 
    AttachMoney, 
    Event, 
    Pets, 
    Store, 
    Storefront, 
    Settings, 
    ExitToApp,
    Contacts,
    Shop
    } from '@material-ui/icons';
import {
	Link,
    } from 'react-router-dom'; 

const drawerWidth = 240;

const myStyles = makeStyles((theme) => ({
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
        width: theme.spacing(8),
        },
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    },
    enlace: {
        textDecoration: 'none',
        color: "#000",
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        
    }
}));

export default function MenuDrawer(props) {
    
    const classes = myStyles();

    const handleSalirClik= () => {
        
        sessionStorage.clear();
        window.location.reload();
    };

    return(
        <React.Fragment>
            <Drawer
                variant="permanent"
                className={clsx(classes.drawer, {
                    [classes.drawerOpen]: props.open,
                    [classes.drawerClose]: !props.open,
                })}
                classes={{
                    paper: clsx({
                    [classes.drawerOpen]: props.open,
                    [classes.drawerClose]: !props.open,
                    }),
                }}
            >
                <div className={classes.toolbar}/>
                <Divider />
                <List>
                    <Link to={"/Ventas"} className = {classes.enlace} >
                        <ListItem button key="Ventas">                        
                            <ListItemIcon> <AttachMoney/></ListItemIcon>
                            <ListItemText primary="Ventas"/>
                        </ListItem>
                    </Link>
                    <Link to={"/Citas"} className = {classes.enlace} >
                        <ListItem button key="Citas">
                            <ListItemIcon> <Event/></ListItemIcon>
                            <ListItemText primary="Citas"/>
                        </ListItem>
                    </Link>
                    <Link to={"/Clientes"} className = {classes.enlace} >
                        <ListItem button key="Clientes">
                            <ListItemIcon> <Contacts/></ListItemIcon>
                            <ListItemText primary="Clientes"/>
                        </ListItem>
                    </Link>
                    <Link to={"/Mascotas"} className = {classes.enlace} >
                        <ListItem button key="Mascotas">
                            <ListItemIcon> <Pets/></ListItemIcon>
                            <ListItemText primary="Mascotas"/>
                        </ListItem>
                    </Link>
                </List>
                <Divider />
                <List>
                    <Link to={"/Proveedores"} className = {classes.enlace} >
                        <ListItem button key="Proveedores">
                            <ListItemIcon> <Store/></ListItemIcon>
                            <ListItemText primary="Proveedores"/>
                        </ListItem>
                    </Link>
                    <Link to={"/Compras"} className = {classes.enlace} >
                        <ListItem button key="Compras">
                            <ListItemIcon> <Shop/></ListItemIcon>
                            <ListItemText primary="Compras"/>
                        </ListItem>
                    </Link>
                    <Link to={"/Inventario"} className = {classes.enlace} >
                        <ListItem button key="Inventario">
                            <ListItemIcon> <Storefront/></ListItemIcon>
                            <ListItemText primary="Inventario"/>
                        </ListItem>
                    </Link>
                </List>
                <Divider />
                <List>
                    <Link to={"/Configuracion"} className = {classes.enlace} >
                        <ListItem button key="Configuración">
                            <ListItemIcon> <Settings/></ListItemIcon>
                            <ListItemText primary="Configuración"/>
                        </ListItem>
                    </Link>
                    <Link to={"/Login"}  onClick={handleSalirClik} className = {classes.enlace} >
                        <ListItem button key="Salir">
                            <ListItemIcon> <ExitToApp/></ListItemIcon>
                            <ListItemText primary="Salir"/>
                        </ListItem>
                    </Link>
                </List>
            </Drawer>
        </React.Fragment>
    );
    
}