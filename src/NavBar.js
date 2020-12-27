import React from "react";
import clsx from 'clsx';

import { makeStyles } from '@material-ui/core/styles';
import { 
    AppBar, 
    IconButton, 
    Toolbar, 
    Typography
} from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';

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
                    <Typography variant="h6" noWrap>
                        Sistema Integral Veterinario
                    </Typography>
                </Toolbar>

            </AppBar>
        </React.Fragment>
    );
}