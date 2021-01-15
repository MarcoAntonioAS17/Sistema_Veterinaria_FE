import React from "react";
import clsx from 'clsx';

import { makeStyles } from '@material-ui/core/styles';
import { 
    AppBar, 
    IconButton, 
    Toolbar
} from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import {Link} from 'react-router-dom'; 
import Logo from './Imgs/Logo-Extend-Extend.png';

const myStyles = makeStyles((theme) => ({
    appBar: {
        backgroundColor: 'primary',
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    link: {
        textDecoration: "none",
    }
}));

export default function NavBar(props){

    const classes = myStyles();

    return(
        <React.Fragment>
            <AppBar
                position="fixed"
                className={clsx(classes.appBar)}>
                
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={() => props.handleDrawer()}
                        edge="start"
                        className = {clsx(classes.menuButton)}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Link to="/" className={classes.link}>
                        <img src={Logo} alt="Logo" height="50px"/> 
                    </Link>
                </Toolbar>

            </AppBar>
        </React.Fragment>
    );
}