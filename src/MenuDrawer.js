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
    Contacts
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
                    <ListItem button key="Ventas">
                        <Link to={"/Ventas"} className = {classes.enlace} >
                            <ListItemIcon> <AttachMoney/></ListItemIcon>
                            <ListItemText primary="Ventas"/>
                        </Link>
                    </ListItem>
                    <ListItem button key="Citas">
                        <Link to={"/Citas"} className = {classes.enlace} >
                        
                            <ListItemIcon> <Event/></ListItemIcon>
                            <ListItemText primary="Citas"/>
                        </Link>
                    </ListItem>
                    <ListItem button key="Clientes">
                        <Link to={"/Clientes"} className = {classes.enlace} >
                            <ListItemIcon> <Contacts/></ListItemIcon>
                            <ListItemText primary="Clientes"/>
                        </Link>
                    </ListItem>
                    <ListItem button key="Mascotas">
                        <Link to={"/Mascotas"} className = {classes.enlace} >
                            <ListItemIcon> <Pets/></ListItemIcon>
                            <ListItemText primary="Mascotas"/>
                        </Link>
                    </ListItem>
                </List>
                <Divider />
                <List>
                    <ListItem button key="Compras">
                        <Link to={"/Compras"} className = {classes.enlace} >
                            <ListItemIcon> <Store/></ListItemIcon>
                            <ListItemText primary="Compras"/>
                        </Link>
                    </ListItem>
                    <ListItem button key="Inventario">
                        <Link to={"/Inventario"} className = {classes.enlace} >
                            <ListItemIcon> <Storefront/></ListItemIcon>
                            <ListItemText primary="Inventario"/>
                        </Link>
                    </ListItem>
                </List>
                <Divider />
                <List>
                    <ListItem button key="Configuración">
                        <Link to={"/Configuracion"} className = {classes.enlace} >
                            <ListItemIcon> <Settings/></ListItemIcon>
                            <ListItemText primary="Configuración"/>
                        </Link>
                    </ListItem>
                    <ListItem button key="Salir">
                        <Link to={"/Login"} className = {classes.enlace} >
                            <ListItemIcon> <ExitToApp/></ListItemIcon>
                            <ListItemText primary="Salir"/>
                        </Link>
                    </ListItem>
                </List>
            </Drawer>
        </React.Fragment>
    );
    
}