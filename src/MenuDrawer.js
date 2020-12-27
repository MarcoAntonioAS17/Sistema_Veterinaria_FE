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
    ExitToApp
} from '@material-ui/icons';

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
                        <ListItemIcon> <AttachMoney/></ListItemIcon>
                        <ListItemText primary="Ventas"/>
                    </ListItem>
                    <ListItem button key="Citas">
                        <ListItemIcon> <Event/></ListItemIcon>
                        <ListItemText primary="Citas"/>
                    </ListItem>
                    <ListItem button key="Clientes">
                        <ListItemIcon> <Pets/></ListItemIcon>
                        <ListItemText primary="Clientes"/>
                    </ListItem>
                </List>
                <Divider />
                <List>
                    <ListItem button key="Compras">
                        <ListItemIcon> <Store/></ListItemIcon>
                        <ListItemText primary="Compras"/>
                    </ListItem>
                    <ListItem button key="Inventario">
                        <ListItemIcon> <Storefront/></ListItemIcon>
                        <ListItemText primary="Inventario"/>
                    </ListItem>
                </List>
                <Divider />
                <List>
                    <ListItem button key="Configuración">
                        <ListItemIcon> <Settings/></ListItemIcon>
                        <ListItemText primary="Configuración"/>
                    </ListItem>
                    <ListItem button key="Salir">
                        <ListItemIcon> <ExitToApp/></ListItemIcon>
                        <ListItemText primary="Salir"/>
                    </ListItem>
                </List>
            </Drawer>
        </React.Fragment>
    );
    
}